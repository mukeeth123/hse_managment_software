export type RoleCategory = 
  | 'Workforce' 
  | 'Supervision' 
  | 'HSE' 
  | 'Leadership' 
  | 'Specialist' 
  | 'Administration';

export type UserRole =
  // Workforce
  | 'Worker'
  | 'Contractor Worker'
  | 'Subcontractor Worker'
  | 'Equipment Operator'
  | 'Technician'
  | 'Maintenance Personnel'
  | 'Visitor / Temporary Personnel'
  // Supervision
  | 'Team Leader'
  | 'Site Supervisor'
  | 'Contractor Supervisor'
  | 'Area Supervisor'
  | 'Construction Manager'
  | 'Site Manager'
  // HSE
  | 'HSE Officer'
  | 'Senior HSE Officer'
  | 'HSE Supervisor'
  | 'HSE Inspector'
  | 'HSE Investigator'
  | 'HSE Coordinator'
  | 'Environmental Officer'
  | 'Occupational Health and Safety Officer'
  | 'Emergency Response Coordinator'
  | 'HSE Manager'
  | 'Senior HSE Manager'
  // Leadership
  | 'Project Manager'
  | 'Project Director'
  | 'Operations Manager'
  | 'Client Representative'
  // Specialist roles
  | 'Corrective Action Owner'
  | 'CAPA Verifier'
  | 'Permit Applicant'
  | 'Permit Issuer'
  | 'Permit Approver'
  | 'Training Coordinator'
  | 'Document Controller'
  | 'Emergency Response Team Member'
  | 'Internal Auditor'
  // Administration
  | 'System Administrator'
  | 'User Administrator'
  | 'Project Administrator'
  | 'Read-only Auditor';

export interface UserPermissions {
  canViewDashboards: boolean;
  canReportHazards: boolean;
  canManageIncidents: boolean;
  canConductInvestigations: boolean;
  canManageCAPA: boolean;
  canManageRiskRegister: boolean;
  canConductInspections: boolean;
  canIssuePermits: boolean;
  canVerifyLegalCompliance: boolean;
  canControlDocuments: boolean;
  canExportReports: boolean;
  canAdministerUsers: boolean;
  canAccessSystemSettings: boolean;
}

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  roleCategory: RoleCategory;
  secondaryRoles?: UserRole[];
  department: string;
  project: string;
  supervisorName: string;
  contractorCompany?: string;
  active: boolean;
  avatarUrl?: string;
  trainingComplianceStatus: 'Compliant' | 'Pending Refresh' | 'Expired';
  permissions?: UserPermissions;
}

export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type HazardCategory =
  | 'Work at height'
  | 'Slips, trips and falls'
  | 'Electrical hazards'
  | 'Fire hazards'
  | 'Chemical exposure'
  | 'Manual handling'
  | 'Unsafe machinery'
  | 'Lifting operations'
  | 'Excavation'
  | 'Confined space'
  | 'Poor housekeeping'
  | 'Missing barricades'
  | 'Unsafe access'
  | 'PPE non-compliance'
  | 'Heat stress'
  | 'Environmental hazards'
  | 'Workplace hazards';

export type NearMissCategory =
  | 'Dropped object'
  | 'Unsafe movement'
  | 'Equipment malfunction'
  | 'Vehicle near miss'
  | 'Electrical near miss'
  | 'Fire or smoke observation'
  | 'Falling material'
  | 'Unsafe work practice'
  | 'Environmental & Fire Safety'
  | 'Work-at-height incident';

export type IncidentCategory =
  | 'Injury'
  | 'Occupational illness'
  | 'Property damage'
  | 'Equipment damage'
  | 'Fire'
  | 'Fire alarm case'
  | 'Environmental incident'
  | 'Chemical spill'
  | 'Electrical incident'
  | 'Vehicle incident'
  | 'Work-at-height incident'
  | 'Lost-time incident'
  | 'First-aid case'
  | 'Medical treatment case'
  | 'Restricted work case'
  | 'Other';

export type HazardStatus = 'Submitted' | 'Under Review' | 'Investigation' | 'Action Pending' | 'Closed';
export type IncidentStatus = 'Reported' | 'Under Investigation' | 'CAPA Assigned' | 'Pending Verification' | 'Closed' | 'Reopened';
export type CAPAStatus = 'Open' | 'Assigned' | 'In Progress' | 'Submitted for Verification' | 'Verified' | 'Closed';
export type PermitStatus = 'Draft' | 'Submitted' | 'Reviewed' | 'Approved' | 'Active' | 'Suspended' | 'Expired' | 'Closed';

export interface HSEDossierActionItem {
  id: number;
  action: string;
  actionBy: string;
  date: string;
  status: 'OPEN' | 'CLOSED' | 'UNDER PROCESS';
  closeoutNotes?: string;
}

export interface HazardRecord {
  id: string;
  reference: string;
  title: string;
  category: HazardCategory;
  project: string;
  location: string;
  reportedBy: string;
  reporterEmployeeId: string;
  reportedAt: string;
  severity: SeverityLevel;
  potentialConsequence: string;
  immediateAction: string;
  status: HazardStatus;
  description: string;
  imageUrl?: string;
  imageCaption?: string;
  assignedInvestigator?: string;
  assignedSupervisor?: string;
  investigationId?: string;
  capaId?: string;
  closureNotes?: string;
  closedAt?: string;
  closedBy?: string;

  // In-depth Form Fields
  zone?: string;
  buildingCode?: string;
  roomNo?: string;
  department?: string;
  reporterTitle?: string;
  reporterPhone?: string;
  reporterEmail?: string;
  contractorName?: string;
  incidentRate?: 'Insignificant' | 'Minor' | 'Moderate' | 'Major' | 'Extreme';
  investigationRequirement?: string;
  sequenceOfEvents?: Array<{
    time: string;
    event: string;
  }>;
  witnessList?: Array<{
    name: string;
    title: string;
    idNumber: string;
    phone: string;
  }>;
  likelihoodScore?: number;
  consequenceScore?: number;
  finalRiskScore?: number;
  immediateCauses?: string[];
  rootCauseTaxonomy?: string[];
  actionItems?: HSEDossierActionItem[];
  reviewedBy?: {
    name: string;
    title: string;
    signatureDate: string;
    signatureSigned: boolean;
  };
  approvedBy?: {
    name: string;
    title: string;
    signatureDate: string;
    signatureSigned: boolean;
  };
}

export interface IncidentRecord {
  id: string;
  reference: string;
  title: string;
  incidentType: IncidentCategory;
  project: string;
  location: string;
  department: string;
  incidentDate: string;
  incidentTime: string;
  reportedBy: string;
  reporterEmployeeId: string;
  personsInvolved: string[];
  severity: SeverityLevel;
  potentialSeverity: SeverityLevel;
  description: string;
  immediateActions: string;
  injuryDetails?: string;
  equipmentInvolved?: string;
  witnesses?: string[];
  requiresInvestigation: boolean;
  investigationId?: string;
  status: IncidentStatus;
  rootCauseSummary?: string;
  correctiveActionsCount: number;
  closedAt?: string;
  closedBy?: string;
  reopenReason?: string;

  // Real-world Enterprise Incident Form Fields (Qatar HSE Standard)
  timeAmPm?: 'AM' | 'PM';
  zone?: string;
  buildingCode?: string;
  roomNo?: string;
  reporterTitle?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  contractorName?: string;
  classificationCategory?: 'Incident' | 'Near Miss';
  incidentTypeChecklist?: string[];
  sequenceOfEvents?: Array<{
    time: string;
    event: string;
  }>;
  witnessList?: Array<{
    name: string;
    title: string;
    idNumber: string;
    phone: string;
  }>;
  photos?: Array<{
    id: string;
    caption: string;
    url?: string;
  }>;
  likelihoodScore?: number;
  consequenceScore?: number;
  finalRiskScore?: number;
  incidentRate?: 'Insignificant' | 'Minor' | 'Moderate' | 'Major' | 'Extreme';
  investigationRequirement?: string;
  injuredDetails?:
    | string
    | {
        category?: 'Staff' | 'Student' | 'Contractor' | 'Visitor';
        name?: string;
        qid?: string;
        phone?: string;
        injuryDetails?: string;
        firstAidGiven?: boolean;
        hospitalized?: boolean;
        treatmentSummary?: string;
      };
  assetDamageDetails?:
    | string
    | {
        propertyType?: string;
        spillType?: string;
        vehiclePlateNo?: string;
        passengerLiftCode?: string;
        estimatedCostQar?: number;
      };
  immediateCauses?: string | string[];
  rootCauseTaxonomy?: string[];
  actionItems?: HSEDossierActionItem[];
  reviewedBy?: {
    name: string;
    title: string;
    signatureDate: string;
    signatureSigned: boolean;
  };
  approvedBy?: {
    name: string;
    title: string;
    signatureDate: string;
    signatureSigned: boolean;
  };
}

export interface NearMissRecord {
  id: string;
  reference: string;
  title: string;
  category: NearMissCategory;
  project: string;
  location: string;
  reportedBy: string;
  reporterEmployeeId: string;
  reportedAt: string;
  severity: SeverityLevel;
  description: string;
  potentialOutcome: string;
  immediateActionTaken: string;
  status: 'Reported' | 'Reviewed' | 'Closed';
  assignedReviewer: string;
  reviewNotes?: string;

  // In-depth Form Fields
  zone?: string;
  buildingCode?: string;
  roomNo?: string;
  reporterTitle?: string;
  reporterPhone?: string;
  reporterEmail?: string;
  department?: string;
  incidentRate?: 'Insignificant' | 'Minor' | 'Moderate' | 'Major' | 'Extreme';
  investigationRequirement?: string;
  contractorName?: string;
  sequenceOfEvents?: Array<{
    time: string;
    event: string;
  }>;
  witnessList?: Array<{
    name: string;
    title: string;
    idNumber: string;
    phone: string;
  }>;
  likelihoodScore?: number;
  consequenceScore?: number;
  finalRiskScore?: number;
  immediateCauses?: string[];
  rootCauseTaxonomy?: string[];
  actionItems?: HSEDossierActionItem[];
  reviewedBy?: {
    name: string;
    title: string;
    signatureDate: string;
    signatureSigned: boolean;
  };
  approvedBy?: {
    name: string;
    title: string;
    signatureDate: string;
    signatureSigned: boolean;
  };
}

export interface InvestigationRecord {
  id: string;
  reference: string;
  linkedRecordType: 'Hazard' | 'Incident';
  linkedRecordRef: string;
  project: string;
  location: string;
  leadInvestigator: string;
  investigationTeam: string[];
  incidentSummary: string;
  timeline: { time: string; event: string }[];
  witnessStatements: { witness: string; statement: string; date: string }[];
  immediateCauses: string[];
  underlyingCauses: string[];
  fiveWhys: string[];
  fishbone: {
    people: string[];
    equipment: string[];
    methods: string[];
    environment: string[];
    materials: string[];
    management: string[];
  };
  rootCauses: string[];
  findings: string[];
  recommendations: string[];
  status: 'In Progress' | 'Under Review' | 'Approved' | 'Completed';
  approvalDate?: string;
  approvedBy?: string;
}

export interface CAPARecord {
  id: string;
  reference: string;
  linkedRef: string; // e.g. HAZ-2026-0042 or INC-2026-0012
  actionDescription: string;
  rootCauseAddressed: string;
  actionOwner: string;
  actionOwnerId: string;
  priority: SeverityLevel;
  dueDate: string;
  status: CAPAStatus;
  progressPercentage: number;
  evidenceNotes?: string;
  evidenceAttachment?: string;
  verifier: string;
  verificationResult?: 'Approved' | 'Rejected';
  rejectionReason?: string;
  closureDate?: string;
  closedBy?: string;
  comments: { user: string; text: string; date: string }[];
}

export interface RiskAssessmentRecord {
  id: string;
  reference: string;
  activity: string;
  hazard: string;
  category: string;
  project: string;
  location: string;
  peopleExposed: string;
  potentialConsequence: string;
  existingControls: string;
  initialLikelihood: number; // 1 to 5
  initialSeverity: number;   // 1 to 5
  initialScore: number;      // likelihood * severity
  additionalControls: string;
  residualLikelihood: number;// 1 to 5
  residualSeverity: number;  // 1 to 5
  residualScore: number;     // residualLikelihood * residualSeverity
  riskOwner: string;
  reviewDate: string;
  status: 'Active' | 'Review Due' | 'Archived';
}

export interface InspectionChecklistItem {
  id: string;
  category: string;
  question: string;
  status: 'Pass' | 'Fail' | 'N/A' | 'Pending';
  comment?: string;
  findingSeverity?: SeverityLevel;
  photoUrl?: string;
}

export interface InspectionRecord {
  id: string;
  reference: string;
  title: string;
  type: 
    | 'General site inspection'
    | 'Workplace inspection'
    | 'PPE inspection'
    | 'Fire safety inspection'
    | 'Electrical inspection'
    | 'Equipment inspection'
    | 'Scaffolding inspection'
    | 'Work-at-height inspection'
    | 'Housekeeping inspection'
    | 'Environmental inspection'
    | 'Contractor safety audit'
    | 'Heat stress inspection';
  project: string;
  location: string;
  inspector: string;
  inspectionDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Requires CAPA';
  scorePercentage: number;
  items: InspectionChecklistItem[];
  summary: string;
  signOffBy?: string;
}

export interface PermitRecord {
  id: string;
  reference: string;
  permitType: 
    | 'Hot work'
    | 'Confined space entry'
    | 'Work at height'
    | 'Electrical isolation'
    | 'Excavation'
    | 'Lifting operations'
    | 'General maintenance'
    | 'High-risk maintenance';
  project: string;
  location: string;
  workDescription: string;
  applicant: string;
  performingTeam: string[];
  startTime: string;
  endTime: string;
  hazardAssessment: string;
  requiredPrecautions: string[];
  isolationDetails?: string;
  requiredPPE: string[];
  emergencyArrangements: string;
  issuer: string;
  approver: string;
  status: PermitStatus;
  gasTestingRequired: boolean;
  gasTestingResults?: { o2: string; lelL: string; h2s: string; co: string; testedAt: string };
}

export interface TrainingCourse {
  id: string;
  code: string;
  title: string;
  category: string;
  validityMonths: number;
  mandatoryFor: string[];
  description: string;
}

export interface TrainingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  courseCode: string;
  courseTitle: string;
  completionDate: string;
  expiryDate: string;
  provider: string;
  certificateRef: string;
  status: 'Valid' | 'Expiring Soon' | 'Expired';
}

export interface EmergencyPlan {
  id: string;
  code: string;
  title: string;
  type: 
    | 'Fire evacuation'
    | 'Medical emergency'
    | 'Chemical spill'
    | 'Severe weather'
    | 'Heat-related emergency'
    | 'Equipment accident'
    | 'Environmental emergency';
  project: string;
  leadCoordinator: string;
  assemblyPoints: string[];
  evacuationRoutes: string;
  equipmentRequired: string[];
  lastDrillDate: string;
  nextDrillDate: string;
  version: string;
}

export interface EmergencyDrill {
  id: string;
  reference: string;
  planRef: string;
  title: string;
  project: string;
  location: string;
  conductedDate: string;
  evaluator: string;
  participantCount: number;
  evacuationTimeMinutes: number;
  targetTimeMinutes: number;
  evaluationScore: number; // 0-100
  keyObservations: string;
  lessonsLearned: string;
  capaRequired: boolean;
}

export interface ControlledDocument {
  id: string;
  documentNumber: string;
  title: string;
  category: 
    | 'HSE policies'
    | 'Procedures'
    | 'Risk assessments'
    | 'Method statements'
    | 'Emergency plans'
    | 'Inspection checklists'
    | 'Training certificates'
    | 'Permits'
    | 'Incident reports'
    | 'Investigation reports'
    | 'Legal documents'
    | 'Environmental records';
  version: string;
  owner: string;
  approvalStatus: 'Approved' | 'Under Review' | 'Draft' | 'Superseded';
  effectiveDate: string;
  reviewDate: string;
  fileFormat: string;
  fileSizeKb: number;
  fileUrl?: string;
}

export type QatarLegalStatusClassification = 
  | 'VERIFIED LEGAL REQUIREMENT'
  | 'OFFICIAL GUIDANCE'
  | 'INDUSTRY STANDARD'
  | 'ORGANISATIONAL CONTROL'
  | 'REQUIRES LEGAL REVIEW';

export type QatarComplianceStatus = 'Compliant' | 'Partial' | 'Non-compliant' | 'Not Assessed';
export type QatarLegalApplicability = 'Applicable' | 'Conditional' | 'Not Applicable' | 'Review Required';

export interface QatarLegalRegisterItem {
  id: string;
  reference: string;
  legislationTitle: string;
  legislationNumberYear: string;
  category: 
    | 'Labour & Occupational Safety'
    | 'Heat Stress & Outdoor Work'
    | 'Environmental Protection'
    | 'Fire Safety & Civil Defence'
    | 'Construction & Worksite Safety'
    | 'Occupational Health'
    | 'Chemical & Hazardous Substances';
  issuingAuthority: string;
  relevantArticle: string;
  classification: QatarLegalStatusClassification;
  isUnofficialEnglishTranslation: boolean;
  publicationDate: string;
  officialSourceUrl: string;
  lastVerificationDate: string;
  practicalWorkplaceImplications: string;
  requiredOrganisationalControls: string;
  evidenceNeeded: string;
  applicability: QatarLegalApplicability;
  complianceStatus: QatarComplianceStatus;
  linkedOperationalModule: string;
  linkedEvidenceRef?: string;
  responsiblePerson: string;
  nextReviewDate: string;
  legalReviewStatus: 'Up-to-date' | 'Pending Periodic Review' | 'Clarification Required';
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'Incident' | 'Hazard' | 'CAPA' | 'Permit' | 'Compliance' | 'Inspection' | 'System';
  priority: SeverityLevel;
  timestamp: string;
  read: boolean;
  targetRole?: UserRole | 'All';
  targetUser?: string;
  linkModule?: string;
  linkRef?: string;
}

export interface AuditEventItem {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  actionType: 'CREATE' | 'UPDATE' | 'REVIEW' | 'VERIFY' | 'CLOSE' | 'REOPEN' | 'EXPORT' | 'RESET';
  entityType: 'Hazard' | 'Incident' | 'CAPA' | 'Permit' | 'Investigation' | 'Legal' | 'Inspection' | 'Risk' | 'User' | 'System';
  entityRef: string;
  details: string;
  ipAddress?: string;
}
