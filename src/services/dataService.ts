import {
  User,
  UserPermissions,
  RoleCategory,
  UserRole,
  HazardRecord,
  IncidentRecord,
  NearMissRecord,
  InvestigationRecord,
  CAPARecord,
  RiskAssessmentRecord,
  InspectionRecord,
  PermitRecord,
  TrainingCourse,
  TrainingRecord,
  EmergencyPlan,
  EmergencyDrill,
  ControlledDocument,
  NotificationItem,
  AuditEventItem,
  QatarLegalRegisterItem,
} from '../types';
import {
  initialProjects,
  initialLocations,
  initialUsers,
  initialHazards,
  initialIncidents,
  initialNearMisses,
  initialInvestigations,
  initialCAPAs,
  initialRiskAssessments,
  initialInspections,
  initialPermits,
  initialTrainingCourses,
  initialTrainingRecords,
  initialEmergencyPlans,
  initialEmergencyDrills,
  initialControlledDocuments,
  initialNotifications,
  initialAuditTrail,
} from '../data/mockData';
import { initialQatarLegalRegister } from '../data/legalRegisterData';

const STORAGE_KEYS = {
  USERS: 'qhse_users_v1',
  HAZARDS: 'qhse_hazards_v1',
  INCIDENTS: 'qhse_incidents_v1',
  NEAR_MISSES: 'qhse_near_misses_v1',
  INVESTIGATIONS: 'qhse_investigations_v1',
  CAPAS: 'qhse_capas_v1',
  RISK_ASSESSMENTS: 'qhse_risks_v1',
  INSPECTIONS: 'qhse_inspections_v1',
  PERMITS: 'qhse_permits_v1',
  TRAINING_COURSES: 'qhse_tr_courses_v1',
  TRAINING_RECORDS: 'qhse_tr_records_v1',
  EMERGENCY_PLANS: 'qhse_emg_plans_v1',
  EMERGENCY_DRILLS: 'qhse_emg_drills_v1',
  DOCUMENTS: 'qhse_docs_v1',
  NOTIFICATIONS: 'qhse_notifs_v1',
  AUDIT_TRAIL: 'qhse_audit_v1',
  LEGAL_REGISTER: 'qhse_legal_v1',
  ACTIVE_USER_ID: 'qhse_active_user_id_v1',
  IS_LOGGED_IN: 'qhse_is_logged_in_v1',
  PROJECTS: 'qhse_projects_v1',
  LOCATIONS: 'qhse_locations_v1',
};

export function getDefaultPermissionsForRole(roleCategory: RoleCategory, role: UserRole): UserPermissions {
  if (roleCategory === 'Administration' || role === 'System Administrator') {
    return {
      canViewDashboards: true,
      canReportHazards: true,
      canManageIncidents: true,
      canConductInvestigations: true,
      canManageCAPA: true,
      canManageRiskRegister: true,
      canConductInspections: true,
      canIssuePermits: true,
      canVerifyLegalCompliance: true,
      canControlDocuments: true,
      canExportReports: true,
      canAdministerUsers: true,
      canAccessSystemSettings: true,
    };
  }

  if (roleCategory === 'HSE' || role === 'Senior HSE Manager' || role === 'HSE Manager') {
    return {
      canViewDashboards: true,
      canReportHazards: true,
      canManageIncidents: true,
      canConductInvestigations: true,
      canManageCAPA: true,
      canManageRiskRegister: true,
      canConductInspections: true,
      canIssuePermits: true,
      canVerifyLegalCompliance: true,
      canControlDocuments: true,
      canExportReports: true,
      canAdministerUsers: false,
      canAccessSystemSettings: false,
    };
  }

  if (roleCategory === 'Supervision' || role === 'Site Supervisor' || role === 'Area Supervisor') {
    return {
      canViewDashboards: true,
      canReportHazards: true,
      canManageIncidents: true,
      canConductInvestigations: false,
      canManageCAPA: true,
      canManageRiskRegister: true,
      canConductInspections: true,
      canIssuePermits: true,
      canVerifyLegalCompliance: false,
      canControlDocuments: false,
      canExportReports: true,
      canAdministerUsers: false,
      canAccessSystemSettings: false,
    };
  }

  if (roleCategory === 'Specialist' || role === 'HSE Inspector' || role === 'Internal Auditor') {
    return {
      canViewDashboards: true,
      canReportHazards: true,
      canManageIncidents: true,
      canConductInvestigations: true,
      canManageCAPA: true,
      canManageRiskRegister: true,
      canConductInspections: true,
      canIssuePermits: false,
      canVerifyLegalCompliance: true,
      canControlDocuments: true,
      canExportReports: true,
      canAdministerUsers: false,
      canAccessSystemSettings: false,
    };
  }

  if (roleCategory === 'Leadership' || role === 'Project Director' || role === 'Project Manager') {
    return {
      canViewDashboards: true,
      canReportHazards: true,
      canManageIncidents: true,
      canConductInvestigations: false,
      canManageCAPA: true,
      canManageRiskRegister: true,
      canConductInspections: false,
      canIssuePermits: false,
      canVerifyLegalCompliance: true,
      canControlDocuments: true,
      canExportReports: true,
      canAdministerUsers: false,
      canAccessSystemSettings: false,
    };
  }

  // Default workforce (Worker, Contractor Worker, Technician)
  return {
    canViewDashboards: false,
    canReportHazards: true,
    canManageIncidents: false,
    canConductInvestigations: false,
    canManageCAPA: false,
    canManageRiskRegister: false,
    canConductInspections: false,
    canIssuePermits: false,
    canVerifyLegalCompliance: false,
    canControlDocuments: false,
    canExportReports: false,
    canAdministerUsers: false,
    canAccessSystemSettings: false,
  };
}

// Event emitter listener type for instant cross-workspace reactivity
type Listener = () => void;
const listeners = new Set<Listener>();

export const dataEvents = {
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  notify() {
    listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('Error in listener', err);
      }
    });
  },
};

function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    dataEvents.notify();
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

export const DataService = {
  // Initialization & Reset
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.resetToDefaults();
    }
  },

  resetToDefaults() {
    setStorage(STORAGE_KEYS.PROJECTS, initialProjects);
    setStorage(STORAGE_KEYS.LOCATIONS, initialLocations);
    setStorage(STORAGE_KEYS.USERS, initialUsers);
    setStorage(STORAGE_KEYS.HAZARDS, initialHazards);
    setStorage(STORAGE_KEYS.INCIDENTS, initialIncidents);
    setStorage(STORAGE_KEYS.NEAR_MISSES, initialNearMisses);
    setStorage(STORAGE_KEYS.INVESTIGATIONS, initialInvestigations);
    setStorage(STORAGE_KEYS.CAPAS, initialCAPAs);
    setStorage(STORAGE_KEYS.RISK_ASSESSMENTS, initialRiskAssessments);
    setStorage(STORAGE_KEYS.INSPECTIONS, initialInspections);
    setStorage(STORAGE_KEYS.PERMITS, initialPermits);
    setStorage(STORAGE_KEYS.TRAINING_COURSES, initialTrainingCourses);
    setStorage(STORAGE_KEYS.TRAINING_RECORDS, initialTrainingRecords);
    setStorage(STORAGE_KEYS.EMERGENCY_PLANS, initialEmergencyPlans);
    setStorage(STORAGE_KEYS.EMERGENCY_DRILLS, initialEmergencyDrills);
    setStorage(STORAGE_KEYS.DOCUMENTS, initialControlledDocuments);
    setStorage(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    setStorage(STORAGE_KEYS.AUDIT_TRAIL, initialAuditTrail);
    setStorage(STORAGE_KEYS.LEGAL_REGISTER, initialQatarLegalRegister);
    setStorage(STORAGE_KEYS.ACTIVE_USER_ID, 'USR-019'); // Default to Senior HSE Manager
    dataEvents.notify();
  },

  // Authentication State
  getIsLoggedIn(): boolean {
    return getStorage<boolean>(STORAGE_KEYS.IS_LOGGED_IN, false);
  },
  setIsLoggedIn(val: boolean) {
    setStorage(STORAGE_KEYS.IS_LOGGED_IN, val);
  },

  // Active User
  getActiveUser(): User {
    const users = this.getUsers();
    const activeId = getStorage<string>(STORAGE_KEYS.ACTIVE_USER_ID, 'USR-019');
    const user = users.find((u) => u.id === activeId) || users[0];
    if (!user.permissions) {
      user.permissions = getDefaultPermissionsForRole(user.roleCategory, user.role);
    }
    return user;
  },

  setActiveUser(userId: string) {
    setStorage(STORAGE_KEYS.ACTIVE_USER_ID, userId);
  },

  // Projects & Locations
  getProjects(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  },
  getLocations(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.LOCATIONS, initialLocations);
  },

  // Users
  getUsers(): User[] {
    const list = getStorage<User[]>(STORAGE_KEYS.USERS, initialUsers);
    return list.map((u) => ({
      ...u,
      permissions: u.permissions || getDefaultPermissionsForRole(u.roleCategory, u.role),
    }));
  },
  createUser(userData: Omit<User, 'id'>): User {
    const list = this.getUsers();
    const newId = `USR-${String(list.length + 1).padStart(3, '0')}`;
    const newUser: User = {
      ...userData,
      id: newId,
      permissions: userData.permissions || getDefaultPermissionsForRole(userData.roleCategory, userData.role),
    };
    setStorage(STORAGE_KEYS.USERS, [...list, newUser]);
    this.logAudit({
      actorName: 'Administrator',
      actorRole: 'System Administrator',
      actionType: 'CREATE',
      entityType: 'User',
      entityRef: newUser.employeeId,
      details: `Created new user profile: ${newUser.name} (${newUser.role}) assigned to ${newUser.project} with custom permissions`,
      ipAddress: '10.20.44.12',
    });
    return newUser;
  },
  updateUser(user: User) {
    const list = this.getUsers();
    const idx = list.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      list[idx] = user;
      setStorage(STORAGE_KEYS.USERS, list);
    }
  },

  // Audit Log
  getAuditTrail(): AuditEventItem[] {
    return getStorage<AuditEventItem[]>(STORAGE_KEYS.AUDIT_TRAIL, initialAuditTrail);
  },
  logAudit(event: Omit<AuditEventItem, 'id' | 'timestamp'>) {
    const list = this.getAuditTrail();
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const newEvent: AuditEventItem = {
      ...event,
      id: `AUD-${Date.now()}`,
      timestamp,
    };
    setStorage(STORAGE_KEYS.AUDIT_TRAIL, [newEvent, ...list]);
  },

  // Notifications
  getNotifications(): NotificationItem[] {
    return getStorage<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
  },
  addNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) {
    const list = this.getNotifications();
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 16);
    const item: NotificationItem = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      timestamp,
      read: false,
    };
    setStorage(STORAGE_KEYS.NOTIFICATIONS, [item, ...list]);
  },
  markNotificationRead(id: string) {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },
  markAllNotificationsRead() {
    const list = this.getNotifications();
    const updated = list.map((n) => ({ ...n, read: true }));
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  // Hazards
  getHazards(): HazardRecord[] {
    return getStorage<HazardRecord[]>(STORAGE_KEYS.HAZARDS, initialHazards);
  },
  getHazardById(id: string): HazardRecord | undefined {
    return this.getHazards().find((h) => h.id === id || h.reference === id);
  },
  createHazard(data: Omit<HazardRecord, 'id' | 'reference' | 'reportedAt'>): HazardRecord {
    const list = this.getHazards();
    const nextNum = list.length + 43;
    const ref = `HAZ-2026-${String(nextNum).padStart(4, '0')}`;
    const now = new Date();
    const reportedAt = now.toISOString().replace('T', ' ').substring(0, 16);
    const record: HazardRecord = {
      ...data,
      id: `HAZ-${Date.now()}`,
      reference: ref,
      reportedAt,
    };
    setStorage(STORAGE_KEYS.HAZARDS, [record, ...list]);

    this.logAudit({
      actorName: record.reportedBy,
      actorRole: 'Reporter',
      actionType: 'CREATE',
      entityType: 'Hazard',
      entityRef: ref,
      details: `Created hazard report: ${record.title} (${record.location})`,
    });

    this.addNotification({
      title: 'New Hazard Reported',
      message: `${record.reportedBy} reported "${record.title}" in ${record.location} (${record.reference})`,
      category: 'Hazard',
      priority: record.severity,
      linkModule: 'Hazard Reporting',
      linkRef: record.reference,
    });

    return record;
  },
  updateHazard(hazard: HazardRecord) {
    const list = this.getHazards();
    const idx = list.findIndex((h) => h.id === hazard.id);
    if (idx !== -1) {
      list[idx] = hazard;
      setStorage(STORAGE_KEYS.HAZARDS, list);
    }
  },

  // Incidents
  getIncidents(): IncidentRecord[] {
    return getStorage<IncidentRecord[]>(STORAGE_KEYS.INCIDENTS, initialIncidents);
  },
  getIncidentById(id: string): IncidentRecord | undefined {
    return this.getIncidents().find((i) => i.id === id || i.reference === id);
  },
  createIncident(data: Omit<IncidentRecord, 'id' | 'reference' | 'incidentDate' | 'incidentTime' | 'correctiveActionsCount'>): IncidentRecord {
    const list = this.getIncidents();
    const nextNum = list.length + 16;
    const ref = `INC-2026-${String(nextNum).padStart(4, '0')}`;
    const now = new Date();
    const incidentDate = now.toISOString().substring(0, 10);
    const incidentTime = now.toTimeString().substring(0, 5);
    const record: IncidentRecord = {
      ...data,
      id: `INC-${Date.now()}`,
      reference: ref,
      incidentDate,
      incidentTime,
      correctiveActionsCount: 0,
    };
    setStorage(STORAGE_KEYS.INCIDENTS, [record, ...list]);

    this.logAudit({
      actorName: record.reportedBy,
      actorRole: 'Reporter',
      actionType: 'CREATE',
      entityType: 'Incident',
      entityRef: ref,
      details: `Reported ${record.incidentType}: ${record.title}`,
    });

    this.addNotification({
      title: `Incident: ${record.incidentType}`,
      message: `${record.reportedBy} filed incident ${record.reference}: ${record.title}`,
      category: 'Incident',
      priority: record.severity,
      linkModule: 'Incident Management',
      linkRef: record.reference,
    });

    return record;
  },
  updateIncident(incident: IncidentRecord) {
    const list = this.getIncidents();
    const idx = list.findIndex((i) => i.id === incident.id);
    if (idx !== -1) {
      list[idx] = incident;
      setStorage(STORAGE_KEYS.INCIDENTS, list);
    }
  },

  // Near Misses
  getNearMisses(): NearMissRecord[] {
    return getStorage<NearMissRecord[]>(STORAGE_KEYS.NEAR_MISSES, initialNearMisses);
  },
  createNearMiss(data: Omit<NearMissRecord, 'id' | 'reference' | 'reportedAt'>): NearMissRecord {
    const list = this.getNearMisses();
    const nextNum = list.length + 21;
    const ref = `NM-2026-${String(nextNum).padStart(4, '0')}`;
    const now = new Date();
    const reportedAt = now.toISOString().replace('T', ' ').substring(0, 16);
    const record: NearMissRecord = {
      ...data,
      id: `NM-${Date.now()}`,
      reference: ref,
      reportedAt,
    };
    setStorage(STORAGE_KEYS.NEAR_MISSES, [record, ...list]);

    this.logAudit({
      actorName: record.reportedBy,
      actorRole: 'Reporter',
      actionType: 'CREATE',
      entityType: 'Hazard',
      entityRef: ref,
      details: `Reported near miss: ${record.title}`,
    });

    this.addNotification({
      title: 'Near Miss Recorded',
      message: `${record.reportedBy} logged near miss ${ref}: ${record.title}`,
      category: 'Hazard',
      priority: record.severity,
      linkModule: 'Near Miss Management',
      linkRef: ref,
    });

    return record;
  },
  updateNearMiss(record: NearMissRecord) {
    const list = this.getNearMisses();
    const idx = list.findIndex((n) => n.id === record.id);
    if (idx !== -1) {
      list[idx] = record;
      setStorage(STORAGE_KEYS.NEAR_MISSES, list);
    }
  },

  // Investigations
  getInvestigations(): InvestigationRecord[] {
    return getStorage<InvestigationRecord[]>(STORAGE_KEYS.INVESTIGATIONS, initialInvestigations);
  },
  getInvestigationByRef(ref: string): InvestigationRecord | undefined {
    return this.getInvestigations().find((i) => i.reference === ref || i.linkedRecordRef === ref);
  },
  saveInvestigation(inv: InvestigationRecord) {
    const list = this.getInvestigations();
    const idx = list.findIndex((i) => i.id === inv.id);
    if (idx !== -1) {
      list[idx] = inv;
      setStorage(STORAGE_KEYS.INVESTIGATIONS, list);
    } else {
      setStorage(STORAGE_KEYS.INVESTIGATIONS, [inv, ...list]);
    }
    this.logAudit({
      actorName: inv.leadInvestigator,
      actorRole: 'HSE Investigator',
      actionType: 'UPDATE',
      entityType: 'Investigation',
      entityRef: inv.reference,
      details: `Saved investigation record for ${inv.linkedRecordRef} (Status: ${inv.status})`,
    });
  },

  // CAPAs
  getCAPAs(): CAPARecord[] {
    return getStorage<CAPARecord[]>(STORAGE_KEYS.CAPAS, initialCAPAs);
  },
  createCAPA(data: Omit<CAPARecord, 'id' | 'reference' | 'comments'>): CAPARecord {
    const list = this.getCAPAs();
    const nextNum = list.length + 97;
    const ref = `CAPA-2026-${String(nextNum).padStart(4, '0')}`;
    const record: CAPARecord = {
      ...data,
      id: `CAPA-${Date.now()}`,
      reference: ref,
      comments: [],
    };
    setStorage(STORAGE_KEYS.CAPAS, [record, ...list]);

    this.logAudit({
      actorName: 'Supervisor',
      actorRole: 'Site Supervisor',
      actionType: 'CREATE',
      entityType: 'CAPA',
      entityRef: ref,
      details: `Assigned CAPA to ${record.actionOwner}: ${record.actionDescription}`,
    });

    this.addNotification({
      title: 'New CAPA Assigned',
      message: `CAPA ${ref} assigned to ${record.actionOwner} (Due: ${record.dueDate})`,
      category: 'CAPA',
      priority: record.priority,
      targetUser: record.actionOwnerId,
      linkModule: 'Corrective and Preventive Actions',
      linkRef: ref,
    });

    return record;
  },
  updateCAPA(capa: CAPARecord) {
    const list = this.getCAPAs();
    const idx = list.findIndex((c) => c.id === capa.id);
    if (idx !== -1) {
      list[idx] = capa;
      setStorage(STORAGE_KEYS.CAPAS, list);
    }
  },

  // Risk Assessments
  getRiskAssessments(): RiskAssessmentRecord[] {
    return getStorage<RiskAssessmentRecord[]>(STORAGE_KEYS.RISK_ASSESSMENTS, initialRiskAssessments);
  },
  saveRiskAssessment(ra: RiskAssessmentRecord) {
    const list = this.getRiskAssessments();
    const idx = list.findIndex((r) => r.id === ra.id);
    if (idx !== -1) {
      list[idx] = ra;
      setStorage(STORAGE_KEYS.RISK_ASSESSMENTS, list);
    } else {
      setStorage(STORAGE_KEYS.RISK_ASSESSMENTS, [ra, ...list]);
    }
  },

  // Inspections
  getInspections(): InspectionRecord[] {
    return getStorage<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, initialInspections);
  },
  updateInspection(ins: InspectionRecord) {
    const list = this.getInspections();
    const idx = list.findIndex((i) => i.id === ins.id);
    if (idx !== -1) {
      list[idx] = ins;
      setStorage(STORAGE_KEYS.INSPECTIONS, list);
    }
  },

  // Permits
  getPermits(): PermitRecord[] {
    return getStorage<PermitRecord[]>(STORAGE_KEYS.PERMITS, initialPermits);
  },
  updatePermit(permit: PermitRecord) {
    const list = this.getPermits();
    const idx = list.findIndex((p) => p.id === permit.id);
    if (idx !== -1) {
      list[idx] = permit;
      setStorage(STORAGE_KEYS.PERMITS, list);
    }
  },
  createPermit(data: Omit<PermitRecord, 'id' | 'reference'>): PermitRecord {
    const list = this.getPermits();
    const nextNum = list.length + 5;
    const ref = `PTW-2026-${String(nextNum).padStart(4, '0')}`;
    const record: PermitRecord = {
      ...data,
      id: `PTW-${Date.now()}`,
      reference: ref,
    };
    setStorage(STORAGE_KEYS.PERMITS, [record, ...list]);
    return record;
  },

  // Training
  getTrainingCourses(): TrainingCourse[] {
    return getStorage<TrainingCourse[]>(STORAGE_KEYS.TRAINING_COURSES, initialTrainingCourses);
  },
  getTrainingRecords(): TrainingRecord[] {
    return getStorage<TrainingRecord[]>(STORAGE_KEYS.TRAINING_RECORDS, initialTrainingRecords);
  },

  // Emergency Plans & Drills
  getEmergencyPlans(): EmergencyPlan[] {
    return getStorage<EmergencyPlan[]>(STORAGE_KEYS.EMERGENCY_PLANS, initialEmergencyPlans);
  },
  getEmergencyDrills(): EmergencyDrill[] {
    return getStorage<EmergencyDrill[]>(STORAGE_KEYS.EMERGENCY_DRILLS, initialEmergencyDrills);
  },

  // Documents
  getControlledDocuments(): ControlledDocument[] {
    return getStorage<ControlledDocument[]>(STORAGE_KEYS.DOCUMENTS, initialControlledDocuments);
  },
  addControlledDocument(doc: ControlledDocument) {
    const list = this.getControlledDocuments();
    setStorage(STORAGE_KEYS.DOCUMENTS, [doc, ...list]);
  },

  // Qatar Legal Register
  getLegalRegister(): QatarLegalRegisterItem[] {
    return getStorage<QatarLegalRegisterItem[]>(STORAGE_KEYS.LEGAL_REGISTER, initialQatarLegalRegister);
  },
  updateLegalItem(item: QatarLegalRegisterItem) {
    const list = this.getLegalRegister();
    const idx = list.findIndex((l) => l.id === item.id);
    if (idx !== -1) {
      list[idx] = item;
      setStorage(STORAGE_KEYS.LEGAL_REGISTER, list);
      this.logAudit({
        actorName: item.responsiblePerson,
        actorRole: 'Compliance Reviewer',
        actionType: 'REVIEW',
        entityType: 'Legal',
        entityRef: item.reference,
        details: `Updated legal review status to ${item.complianceStatus} (${item.legislationNumberYear})`,
      });
    }
  },

  // Scenario Automation Helper for Seamless Verification of HAZ-2026-0042
  executeScenarioStep(step: number, userActor: User): { message: string } {
    const activeHazard = this.getHazardById('HAZ-2026-0042');
    if (!activeHazard) return { message: 'Hazard HAZ-2026-0042 not found' };

    switch (step) {
      case 1: {
        // Step 1: Supervisor Reviews Hazard
        activeHazard.status = 'Under Review';
        activeHazard.assignedSupervisor = userActor.name;
        this.updateHazard(activeHazard);
        this.logAudit({
          actorName: userActor.name,
          actorRole: userActor.role,
          actionType: 'REVIEW',
          entityType: 'Hazard',
          entityRef: activeHazard.reference,
          details: 'Supervisor reviewed hazard HAZ-2026-0042, confirmed high risk and requested formal classification.',
        });
        return { message: 'Step 1 complete: Supervisor reviewed hazard. Status changed to "Under Review".' };
      }
      case 2: {
        // Step 2: HSE Officer Classifies & Assigns Investigator
        activeHazard.status = 'Investigation';
        activeHazard.assignedInvestigator = 'Omar Al-Sulaiti';
        this.updateHazard(activeHazard);
        this.logAudit({
          actorName: userActor.name,
          actorRole: userActor.role,
          actionType: 'UPDATE',
          entityType: 'Hazard',
          entityRef: activeHazard.reference,
          details: 'HSE Officer classified hazard severity as High and assigned Omar Al-Sulaiti to lead investigation.',
        });
        return { message: 'Step 2 complete: HSE Officer classified hazard and assigned investigator.' };
      }
      case 3: {
        // Step 3: Investigator Records Findings & 5 Whys
        const inv = this.getInvestigationByRef('INV-2026-0042');
        if (inv) {
          inv.status = 'Approved';
          inv.approvalDate = new Date().toISOString().substring(0, 10);
          inv.approvedBy = userActor.name;
          this.saveInvestigation(inv);
        }
        activeHazard.status = 'Action Pending';
        this.updateHazard(activeHazard);
        this.logAudit({
          actorName: 'Omar Al-Sulaiti',
          actorRole: 'HSE Investigator',
          actionType: 'REVIEW',
          entityType: 'Investigation',
          entityRef: 'INV-2026-0042',
          details: 'Investigator completed root causes, 5 Whys and submitted CAPA recommendations.',
        });
        return { message: 'Step 3 complete: Investigation findings and root causes recorded.' };
      }
      case 4: {
        // Step 4: Action Owner Updates Progress & Evidence
        const capa = this.getCAPAs().find((c) => c.reference === 'CAPA-2026-0095');
        if (capa) {
          capa.status = 'Submitted for Verification';
          capa.progressPercentage = 100;
          capa.evidenceNotes = 'Welded structural steel safety mesh fabricated and anchored with Hilti anchor bolts over Level 2 opening. Load tested to 300kg.';
          capa.evidenceAttachment = 'DOC-MESH-TEST-CERT-01';
          this.updateCAPA(capa);
          this.logAudit({
            actorName: capa.actionOwner,
            actorRole: 'Corrective Action Owner',
            actionType: 'UPDATE',
            entityType: 'CAPA',
            entityRef: capa.reference,
            details: 'Action Owner submitted evidence for verification: Welded steel mesh installed.',
          });
        }
        return { message: 'Step 4 complete: Action Owner uploaded completion evidence and submitted for verification.' };
      }
      case 5: {
        // Step 5: CAPA Verifier Approves
        const capa = this.getCAPAs().find((c) => c.reference === 'CAPA-2026-0095');
        if (capa) {
          capa.status = 'Verified';
          capa.verificationResult = 'Approved';
          this.updateCAPA(capa);
          this.logAudit({
            actorName: userActor.name,
            actorRole: userActor.role,
            actionType: 'VERIFY',
            entityType: 'CAPA',
            entityRef: capa.reference,
            details: 'CAPA Verifier inspected physical installation, verified compliance and approved closure.',
          });
        }
        return { message: 'Step 5 complete: CAPA Verifier physically inspected and approved the protective grate.' };
      }
      case 6: {
        // Step 6: HSE Manager Closes the Case
        const capa = this.getCAPAs().find((c) => c.reference === 'CAPA-2026-0095');
        if (capa) {
          capa.status = 'Closed';
          capa.closureDate = new Date().toISOString().substring(0, 10);
          capa.closedBy = userActor.name;
          this.updateCAPA(capa);
        }
        activeHazard.status = 'Closed';
        activeHazard.closedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
        activeHazard.closedBy = userActor.name;
        activeHazard.closureNotes = 'Permanent engineered barrier verified in place. All associated CAPAs verified and closed.';
        this.updateHazard(activeHazard);
        this.logAudit({
          actorName: userActor.name,
          actorRole: userActor.role,
          actionType: 'CLOSE',
          entityType: 'Hazard',
          entityRef: activeHazard.reference,
          details: 'Senior HSE Manager formally closed hazard HAZ-2026-0042.',
        });
        this.addNotification({
          title: 'Case Closed: HAZ-2026-0042',
          message: `Hazard HAZ-2026-0042 (Uncovered Floor Opening) was successfully mitigated and closed by ${userActor.name}.`,
          category: 'Hazard',
          priority: 'Low',
          linkModule: 'Hazard Reporting',
          linkRef: activeHazard.reference,
        });
        return { message: 'Step 6 complete: Senior HSE Manager formally closed the hazard case!' };
      }
      default:
        return { message: 'Invalid scenario step.' };
    }
  },
};

// Auto initialize on first module load
DataService.init();
