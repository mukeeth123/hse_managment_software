import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  UserRole,
  UserPermissions,
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
import { DataService, dataEvents } from '../services/dataService';

export type WorkspaceViewMode = 'both' | 'desktop-only' | 'mobile-only';
export type PortalView = 'homepage' | 'services' | 'platform';

export type DesktopModule =
  | 'Executive Dashboard'
  | 'Incident Management'
  | 'Near Miss Management'
  | 'Hazard Reporting'
  | 'Investigation Management'
  | 'Corrective and Preventive Actions'
  | 'Risk Register'
  | 'Inspections and Audits'
  | 'Permit to Work'
  | 'Training and Competency'
  | 'Emergency Preparedness'
  | 'Environmental Management'
  | 'Qatar Legal Compliance'
  | 'Document Control'
  | 'Analytics and Reports'
  | 'AI-Assisted HSE Search'
  | 'Notifications and Alerts'
  | 'Users and Roles'
  | 'Audit Trail'
  | 'Settings';

export type MobileScreen =
  | 'home'
  | 'report-hazard'
  | 'report-incident'
  | 'report-nearmiss'
  | 'reports'
  | 'tasks'
  | 'inspections'
  | 'notifications'
  | 'safety'
  | 'profile';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface HSEContextType {
  // Website Portal / Page View
  portalView: PortalView;
  setPortalView: (view: PortalView) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;

  // View mode
  viewMode: WorkspaceViewMode;
  setViewMode: (mode: WorkspaceViewMode) => void;

  // Active User & RBAC
  currentUser: User;
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  users: User[];
  isAuthenticated: boolean;
  login: (userId?: string) => void;
  logout: () => void;
  createUserAndLogin: (userData: Omit<User, 'id'>) => User;
  hasPermission: (perm: keyof UserPermissions) => boolean;
  isCreateProfileModalOpen: boolean;
  setIsCreateProfileModalOpen: (open: boolean) => void;

  // Navigation
  activeDesktopModule: DesktopModule;
  setActiveDesktopModule: (mod: DesktopModule) => void;
  selectedRecordRef?: string;
  setSelectedRecordRef: (ref?: string) => void;
  selectedProjectFilter: string;
  setSelectedProjectFilter: (project: string) => void;

  // Mobile Navigation
  mobileScreen: MobileScreen;
  setMobileScreen: (screen: MobileScreen) => void;
  mobileSelectedTab: string;
  setMobileSelectedTab: (tab: string) => void;

  // Data Collections
  hazards: HazardRecord[];
  incidents: IncidentRecord[];
  nearMisses: NearMissRecord[];
  investigations: InvestigationRecord[];
  capas: CAPARecord[];
  riskAssessments: RiskAssessmentRecord[];
  inspections: InspectionRecord[];
  permits: PermitRecord[];
  trainingCourses: TrainingCourse[];
  trainingRecords: TrainingRecord[];
  emergencyPlans: EmergencyPlan[];
  emergencyDrills: EmergencyDrill[];
  documents: ControlledDocument[];
  notifications: NotificationItem[];
  auditTrail: AuditEventItem[];
  legalRegister: QatarLegalRegisterItem[];
  projects: string[];
  locations: string[];

  // Mutators
  createHazard: (data: Omit<HazardRecord, 'id' | 'reference' | 'reportedAt'>) => HazardRecord;
  updateHazard: (hazard: HazardRecord) => void;
  createIncident: (data: Omit<IncidentRecord, 'id' | 'reference' | 'incidentDate' | 'incidentTime' | 'correctiveActionsCount'>) => IncidentRecord;
  updateIncident: (incident: IncidentRecord) => void;
  createNearMiss: (data: Omit<NearMissRecord, 'id' | 'reference' | 'reportedAt'>) => NearMissRecord;
  updateNearMiss: (nm: NearMissRecord) => void;
  saveInvestigation: (inv: InvestigationRecord) => void;
  createCAPA: (data: Omit<CAPARecord, 'id' | 'reference' | 'comments'>) => CAPARecord;
  updateCAPA: (capa: CAPARecord) => void;
  saveRiskAssessment: (ra: RiskAssessmentRecord) => void;
  updateInspection: (ins: InspectionRecord) => void;
  createPermit: (data: Omit<PermitRecord, 'id' | 'reference'>) => PermitRecord;
  updatePermit: (permit: PermitRecord) => void;
  updateLegalItem: (item: QatarLegalRegisterItem) => void;
  addDocument: (doc: ControlledDocument) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetAllData: () => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // End-to-End Scenario Stepper (Ahmed Hassan HAZ-2026-0042)
  scenarioStep: number;
  runScenarioStep: (targetStep: number) => void;
  isScenarioModalOpen: boolean;
  setIsScenarioModalOpen: (open: boolean) => void;

  // Splash Screen
  showSplashScreen: boolean;
  setShowSplashScreen: (show: boolean) => void;

  // Mobile App Dedicated Splash Screen
  showMobileSplash: boolean;
  setShowMobileSplash: (show: boolean) => void;
  showMobileWelcome: boolean;
  setShowMobileWelcome: (show: boolean) => void;
}

const HSEContext = createContext<HSEContextType | undefined>(undefined);

export const HSEProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Website Portal View: 'homepage' | 'services' | 'platform' (Persisted in localStorage)
  const [portalView, setPortalViewState] = useState<PortalView>(() => {
    const saved = localStorage.getItem('qhse_portal_view') as PortalView;
    if (saved === 'homepage' || saved === 'services' || saved === 'platform') return saved;
    return 'platform';
  });
  const setPortalView = (view: PortalView) => {
    setPortalViewState(view);
    localStorage.setItem('qhse_portal_view', view);
  };

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  // View mode: 'both' | 'desktop-only' | 'mobile-only' (Persisted in localStorage)
  const [viewMode, setViewModeState] = useState<WorkspaceViewMode>(() => {
    const saved = localStorage.getItem('qhse_view_mode') as WorkspaceViewMode;
    if (saved === 'both' || saved === 'desktop-only' || saved === 'mobile-only') return saved;
    return 'both';
  });
  const setViewMode = (mode: WorkspaceViewMode) => {
    setViewModeState(mode);
    localStorage.setItem('qhse_view_mode', mode);
  };

  // Navigation states (Persisted in localStorage)
  const [activeDesktopModule, setActiveDesktopModuleState] = useState<DesktopModule>(() => {
    const saved = localStorage.getItem('qhse_active_desktop_module') as DesktopModule;
    return saved || 'Executive Dashboard';
  });
  const setActiveDesktopModule = (mod: DesktopModule) => {
    setActiveDesktopModuleState(mod);
    localStorage.setItem('qhse_active_desktop_module', mod);
  };

  const [selectedRecordRef, setSelectedRecordRefState] = useState<string | undefined>(() => {
    return localStorage.getItem('qhse_selected_record_ref') || undefined;
  });
  const setSelectedRecordRef = (ref?: string) => {
    setSelectedRecordRefState(ref);
    if (ref) localStorage.setItem('qhse_selected_record_ref', ref);
    else localStorage.removeItem('qhse_selected_record_ref');
  };

  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('All Projects');

  const [mobileScreen, setMobileScreenState] = useState<MobileScreen>(() => {
    const saved = localStorage.getItem('qhse_mobile_screen') as MobileScreen;
    return saved || 'home';
  });
  const setMobileScreen = (screen: MobileScreen) => {
    setMobileScreenState(screen);
    localStorage.setItem('qhse_mobile_screen', screen);
  };

  const [mobileSelectedTab, setMobileSelectedTab] = useState<string>('home');

  // Active user & Authentication
  const [currentUser, setCurrentUser] = useState<User>(DataService.getActiveUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(DataService.getIsLoggedIn());
  const [isCreateProfileModalOpen, setIsCreateProfileModalOpen] = useState<boolean>(false);

  // Data cache
  const [users, setUsers] = useState<User[]>(DataService.getUsers());
  const [hazards, setHazards] = useState<HazardRecord[]>(DataService.getHazards());
  const [incidents, setIncidents] = useState<IncidentRecord[]>(DataService.getIncidents());
  const [nearMisses, setNearMisses] = useState<NearMissRecord[]>(DataService.getNearMisses());
  const [investigations, setInvestigations] = useState<InvestigationRecord[]>(DataService.getInvestigations());
  const [capas, setCapas] = useState<CAPARecord[]>(DataService.getCAPAs());
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessmentRecord[]>(DataService.getRiskAssessments());
  const [inspections, setInspections] = useState<InspectionRecord[]>(DataService.getInspections());
  const [permits, setPermits] = useState<PermitRecord[]>(DataService.getPermits());
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>(DataService.getTrainingCourses());
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>(DataService.getTrainingRecords());
  const [emergencyPlans, setEmergencyPlans] = useState<EmergencyPlan[]>(DataService.getEmergencyPlans());
  const [emergencyDrills, setEmergencyDrills] = useState<EmergencyDrill[]>(DataService.getEmergencyDrills());
  const [documents, setDocuments] = useState<ControlledDocument[]>(DataService.getControlledDocuments());
  const [notifications, setNotifications] = useState<NotificationItem[]>(DataService.getNotifications());
  const [auditTrail, setAuditTrail] = useState<AuditEventItem[]>(DataService.getAuditTrail());
  const [legalRegister, setLegalRegister] = useState<QatarLegalRegisterItem[]>(DataService.getLegalRegister());
  const [projects] = useState<string[]>(DataService.getProjects());
  const [locations] = useState<string[]>(DataService.getLocations());

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Scenario Modal state
  const [scenarioStep, setScenarioStep] = useState<number>(0);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);

  // Splash Screen (Only on initial session load, not on every page reload)
  const [showSplashScreen, setShowSplashScreenState] = useState<boolean>(() => {
    return !sessionStorage.getItem('qhse_splash_seen');
  });
  const setShowSplashScreen = (show: boolean) => {
    setShowSplashScreenState(show);
    if (!show) {
      sessionStorage.setItem('qhse_splash_seen', 'true');
    }
  };

  // Dedicated Mobile App Splash Screen & Welcome Slides
  const [showMobileSplash, setShowMobileSplash] = useState<boolean>(true);
  const [showMobileWelcome, setShowMobileWelcome] = useState<boolean>(false);

  // Sync function from localStorage
  const refreshAllData = () => {
    setCurrentUser(DataService.getActiveUser());
    setUsers(DataService.getUsers());
    setHazards(DataService.getHazards());
    setIncidents(DataService.getIncidents());
    setNearMisses(DataService.getNearMisses());
    setInvestigations(DataService.getInvestigations());
    setCapas(DataService.getCAPAs());
    setRiskAssessments(DataService.getRiskAssessments());
    setInspections(DataService.getInspections());
    setPermits(DataService.getPermits());
    setTrainingCourses(DataService.getTrainingCourses());
    setTrainingRecords(DataService.getTrainingRecords());
    setEmergencyPlans(DataService.getEmergencyPlans());
    setEmergencyDrills(DataService.getEmergencyDrills());
    setDocuments(DataService.getControlledDocuments());
    setNotifications(DataService.getNotifications());
    setAuditTrail(DataService.getAuditTrail());
    setLegalRegister(DataService.getLegalRegister());
  };

  useEffect(() => {
    const unsubscribe = dataEvents.subscribe(() => {
      refreshAllData();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchUser = (userId: string) => {
    DataService.setActiveUser(userId);
    const u = DataService.getActiveUser();
    setCurrentUser(u);
    addToast('info', 'Active User Switched', `Switched to ${u.name} (${u.role})`);
  };

  const login = (userId?: string) => {
    if (userId) {
      DataService.setActiveUser(userId);
      const u = DataService.getActiveUser();
      setCurrentUser(u);
    }
    DataService.setIsLoggedIn(true);
    setIsAuthenticated(true);
    const active = DataService.getActiveUser();
    addToast('success', 'Authenticated Successfully', `Welcome to QHSE Control Centre, ${active.name} (${active.role})`);
  };

  const logout = () => {
    DataService.setIsLoggedIn(false);
    setIsAuthenticated(false);
    addToast('info', 'Session Ended', 'Returned to Enterprise Access & RBAC Gateway');
  };

  const createUserAndLogin = (userData: Omit<User, 'id'>): User => {
    const newUser = DataService.createUser(userData);
    DataService.setActiveUser(newUser.id);
    DataService.setIsLoggedIn(true);
    setCurrentUser(newUser);
    setUsers(DataService.getUsers());
    setIsAuthenticated(true);
    setIsCreateProfileModalOpen(false);
    addToast('success', 'Profile Created & Session Started', `Welcome, ${newUser.name} (${newUser.role})`);
    return newUser;
  };

  const hasPermission = (perm: keyof UserPermissions): boolean => {
    if (!currentUser.permissions) return true;
    return !!currentUser.permissions[perm];
  };

  const switchRole = (role: UserRole) => {
    const updated = { ...currentUser, role };
    DataService.updateUser(updated);
    setCurrentUser(updated);
    addToast('info', 'Role Switch (RBAC Demo)', `Role updated to ${role}`);
  };

  const resetAllData = () => {
    DataService.resetToDefaults();
    setScenarioStep(0);
    addToast('success', 'Demonstration Data Reset', 'All demonstration datasets reloaded to fresh initial seed.');
  };

  // Mutators
  const createHazard = (data: Omit<HazardRecord, 'id' | 'reference' | 'reportedAt'>) => {
    const res = DataService.createHazard(data);
    addToast('success', 'Hazard Created', `${res.reference} logged successfully`);
    return res;
  };

  const updateHazard = (hazard: HazardRecord) => {
    DataService.updateHazard(hazard);
    addToast('success', 'Hazard Updated', `${hazard.reference} status: ${hazard.status}`);
  };

  const createIncident = (data: Omit<IncidentRecord, 'id' | 'reference' | 'incidentDate' | 'incidentTime' | 'correctiveActionsCount'>) => {
    const res = DataService.createIncident(data);
    addToast('success', 'Incident Logged', `${res.reference} registered`);
    return res;
  };

  const updateIncident = (incident: IncidentRecord) => {
    DataService.updateIncident(incident);
    addToast('success', 'Incident Updated', `${incident.reference} status: ${incident.status}`);
  };

  const createNearMiss = (data: Omit<NearMissRecord, 'id' | 'reference' | 'reportedAt'>) => {
    const res = DataService.createNearMiss(data);
    addToast('success', 'Near Miss Recorded', `${res.reference} created`);
    return res;
  };

  const updateNearMiss = (nm: NearMissRecord) => {
    DataService.updateNearMiss(nm);
    addToast('success', 'Near Miss Updated', `${nm.reference} status: ${nm.status}`);
  };

  const saveInvestigation = (inv: InvestigationRecord) => {
    DataService.saveInvestigation(inv);
    addToast('success', 'Investigation Saved', `${inv.reference} updated`);
  };

  const createCAPA = (data: Omit<CAPARecord, 'id' | 'reference' | 'comments'>) => {
    const res = DataService.createCAPA(data);
    addToast('success', 'CAPA Created', `${res.reference} assigned to ${res.actionOwner}`);
    return res;
  };

  const updateCAPA = (capa: CAPARecord) => {
    DataService.updateCAPA(capa);
    addToast('success', 'CAPA Updated', `${capa.reference} status: ${capa.status}`);
  };

  const saveRiskAssessment = (ra: RiskAssessmentRecord) => {
    DataService.saveRiskAssessment(ra);
    addToast('success', 'Risk Assessment Saved', `${ra.reference} score: ${ra.residualScore}`);
  };

  const updateInspection = (ins: InspectionRecord) => {
    DataService.updateInspection(ins);
    addToast('success', 'Inspection Updated', `${ins.reference} score: ${ins.scorePercentage}%`);
  };

  const createPermit = (data: Omit<PermitRecord, 'id' | 'reference'>) => {
    const res = DataService.createPermit(data);
    addToast('success', 'Permit Issued', `${res.reference} created`);
    return res;
  };

  const updatePermit = (permit: PermitRecord) => {
    DataService.updatePermit(permit);
    addToast('success', 'Permit Updated', `${permit.reference} status: ${permit.status}`);
  };

  const updateLegalItem = (item: QatarLegalRegisterItem) => {
    DataService.updateLegalItem(item);
    addToast('success', 'Legal Compliance Updated', `${item.reference} (${item.complianceStatus})`);
  };

  const addDocument = (doc: ControlledDocument) => {
    DataService.addControlledDocument(doc);
    addToast('success', 'Document Uploaded', `${doc.documentNumber} registered`);
  };

  const markNotificationRead = (id: string) => {
    DataService.markNotificationRead(id);
  };

  const markAllNotificationsRead = () => {
    DataService.markAllNotificationsRead();
    addToast('info', 'Notifications', 'All notifications marked as read');
  };

  // Scenario execution
  const runScenarioStep = (targetStep: number) => {
    setScenarioStep(targetStep);
    const res = DataService.executeScenarioStep(targetStep, currentUser);
    addToast('success', `Scenario Step ${targetStep}`, res.message);
  };

  return (
    <HSEContext.Provider
      value={{
        portalView,
        setPortalView,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        viewMode,
        setViewMode,
        currentUser,
        switchUser,
        switchRole,
        users,
        isAuthenticated,
        login,
        logout,
        createUserAndLogin,
        hasPermission,
        isCreateProfileModalOpen,
        setIsCreateProfileModalOpen,
        activeDesktopModule,
        setActiveDesktopModule,
        selectedRecordRef,
        setSelectedRecordRef,
        selectedProjectFilter,
        setSelectedProjectFilter,
        mobileScreen,
        setMobileScreen,
        mobileSelectedTab,
        setMobileSelectedTab,
        hazards,
        incidents,
        nearMisses,
        investigations,
        capas,
        riskAssessments,
        inspections,
        permits,
        trainingCourses,
        trainingRecords,
        emergencyPlans,
        emergencyDrills,
        documents,
        notifications,
        auditTrail,
        legalRegister,
        projects,
        locations,
        createHazard,
        updateHazard,
        createIncident,
        updateIncident,
        createNearMiss,
        updateNearMiss,
        saveInvestigation,
        createCAPA,
        updateCAPA,
        saveRiskAssessment,
        updateInspection,
        createPermit,
        updatePermit,
        updateLegalItem,
        addDocument,
        markNotificationRead,
        markAllNotificationsRead,
        resetAllData,
        toasts,
        addToast,
        removeToast,
        scenarioStep,
        runScenarioStep,
        isScenarioModalOpen,
        setIsScenarioModalOpen,
        showSplashScreen,
        setShowSplashScreen,
        showMobileSplash,
        setShowMobileSplash,
        showMobileWelcome,
        setShowMobileWelcome,
      }}
    >
      {children}
    </HSEContext.Provider>
  );
};

export const useHSE = () => {
  const context = useContext(HSEContext);
  if (!context) {
    throw new Error('useHSE must be used within an HSEProvider');
  }
  return context;
};
