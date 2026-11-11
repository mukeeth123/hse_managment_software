import React, { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Camera,
  ShieldAlert,
  Wrench,
  Scale,
  Download,
  ExternalLink,
  Layers,
  ChevronRight,
  CheckSquare,
  X,
  Activity,
  Flame,
  Ambulance,
  Car,
  AlertOctagon,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { Badge } from './Badge';
import { IncidentRecord, HazardRecord, NearMissRecord, SeverityLevel, IncidentStatus } from '../../types';
import {
  PHOTO_1_1,
  PHOTO_1_2,
  PHOTO_1_3,
  PHOTO_1_4,
  PHOTO_1_5,
  PHOTO_1_6,
  PHOTO_1_7,
  PHOTO_1_8,
} from '../../data/imageAssets';

interface EnterpriseHSEDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordType: 'Incident' | 'Hazard' | 'Near Miss';
  record: IncidentRecord | HazardRecord | NearMissRecord;
  onStatusChange?: (status: any) => void;
  onLaunchInvestigation?: () => void;
  onAssignCAPA?: () => void;
  onExportPDF?: () => void;
}

export const EnterpriseHSEDossierModal: React.FC<EnterpriseHSEDossierModalProps> = ({
  isOpen,
  onClose,
  recordType,
  record,
  onStatusChange,
  onLaunchInvestigation,
  onAssignCAPA,
  onExportPDF,
}) => {
  const [activeTab, setActiveTab] = useState<'originator' | 'harm' | 'causes' | 'capa' | 'signoff'>('originator');
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string; caption: string; label: string } | null>(null);

  if (!isOpen || !record) return null;

  // Normalized helper data
  const isIncident = recordType === 'Incident';
  const isHazard = recordType === 'Hazard';
  const isNearMiss = recordType === 'Near Miss';

  const inc = record as IncidentRecord;
  const haz = record as HazardRecord;
  const nm = record as NearMissRecord;

  // Dynamically extract unified data across Incident, Hazard, and Near Miss
  const currentZone = inc.zone || haz.zone || nm.zone || 'Zone F';
  const currentBldCode = inc.buildingCode || haz.buildingCode || nm.buildingCode || 'F05';
  const currentRoomNo = inc.roomNo || haz.roomNo || nm.roomNo || 'Area - C Corridor';
  const currentReportedBy = record.reportedBy || 'Hamad Al-Marri';
  const currentReporterTitle = inc.reporterTitle || haz.reporterTitle || nm.reporterTitle || (isHazard ? 'Housekeeping Lead' : isNearMiss ? 'Firefighter (B. CRO)' : 'Field Safety Officer');
  const currentReporterPhone = inc.reporterPhone || haz.reporterPhone || nm.reporterPhone || '+974 4403-2147';
  const currentReporterEmail = inc.reporterEmail || haz.reporterEmail || nm.reporterEmail || `${currentReportedBy.toLowerCase().replace(/\s+/g, '.')}@qu.edu.qa`;
  const currentContractor = inc.contractorName || haz.contractorName || nm.contractorName || (haz.department || inc.department || nm.department || 'Integrated Enterprise Operations & Safety Department');
  const currentDate = inc.incidentDate || (haz.reportedAt ? haz.reportedAt.substring(0, 10) : '') || (nm.reportedAt ? nm.reportedAt.substring(0, 10) : '') || '2025-09-02';
  const currentTime = inc.incidentTime || (haz.reportedAt ? haz.reportedAt.substring(11, 16) : '') || (nm.reportedAt ? nm.reportedAt.substring(11, 16) : '') || '09:40';
  const currentTimeAmPm = inc.timeAmPm || (parseInt(currentTime.split(':')[0] || '9', 10) < 12 ? 'AM' : 'PM');

  const currentLikelihood = inc.likelihoodScore || haz.likelihoodScore || nm.likelihoodScore || 3;
  const currentConsequence = inc.consequenceScore || haz.consequenceScore || nm.consequenceScore || 2;
  const currentFinalRiskScore = inc.finalRiskScore || haz.finalRiskScore || nm.finalRiskScore || (currentLikelihood * currentConsequence);
  const currentIncidentRate = inc.incidentRate || haz.incidentRate || nm.incidentRate || 'Moderate';

  const currentImmediateCausesRaw = inc.immediateCauses || haz.immediateCauses || nm.immediateCauses;
  const currentImmediateCauses = Array.isArray(currentImmediateCausesRaw)
    ? currentImmediateCausesRaw
    : typeof currentImmediateCausesRaw === 'string'
    ? currentImmediateCausesRaw.split('\n').map((s) => s.replace(/^[-*•]\s*/, '').trim()).filter(Boolean)
    : [haz.immediateAction || inc.immediateActions || nm.immediateActionTaken || 'Routine conditions under inspection.'];

  const currentRootCauses =
    inc.rootCauseTaxonomy ||
    haz.rootCauseTaxonomy ||
    nm.rootCauseTaxonomy ||
    (inc.rootCauseSummary ? [inc.rootCauseSummary] : ['Lack of Preventive Maintenance/Regular Inspection', 'Lack of Proper/Effective Communication']);

  const currentReviewedBy = inc.reviewedBy || haz.reviewedBy || nm.reviewedBy || {
    name: 'Dr. Hassan Al-Mahmoud',
    title: 'Fire Safety Specialist',
    signatureDate: currentDate,
    signatureSigned: true,
  };

  const currentApprovedBy = inc.approvedBy || haz.approvedBy || nm.approvedBy || {
    name: 'Eng. Nasser Al-Khelaifi',
    title: 'Act. Head of Health and Safety',
    signatureDate: currentDate,
    signatureSigned: true,
  };

  // User-provided Evidence Photos (photo_1 (1).png through photo_1 (8).png) covering all 4 photo sections
  const allEvidencePhotos = [
    {
      id: 'p1-a',
      slot: 'Photo-01',
      label: 'Photo-01 (A)',
      title: 'Ceiling Smoke Detector & HVAC Grid',
      caption: `Field evidence Photo-01 (Part A) for ${record.reference} (${record.location}) - Smoke detector sensor inspection`,
      url: PHOTO_1_5,
    },
    {
      id: 'p1-b',
      slot: 'Photo-01',
      label: 'Photo-01 (B)',
      title: 'HSE Incident & Activity Register',
      caption: 'Field evidence Photo-01 (Part B) showing official HSE incident log and status entries',
      url: PHOTO_1_2,
    },
    {
      id: 'p2-a',
      slot: 'Photo-02',
      label: 'Photo-02 (A)',
      title: 'Fire Alarm System Mimic Display',
      caption: 'Field evidence Photo-02 (Part A) showing active loop status and alarm indicators',
      url: PHOTO_1_4,
    },
    {
      id: 'p2-b',
      slot: 'Photo-02',
      label: 'Photo-02 (B)',
      title: 'Ceiling Plenum & Diffuser Detail',
      caption: 'Field evidence Photo-02 (Part B) showing structural boundary and false ceiling installation',
      url: PHOTO_1_5,
    },
    {
      id: 'p3-a',
      slot: 'Photo-03',
      label: 'Photo-03 (A)',
      title: 'Restricted Access & Stairway Warning',
      caption: 'Field evidence Photo-03 (Part A) showing warning signage and isolation boundary',
      url: PHOTO_1_6,
    },
    {
      id: 'p3-b',
      slot: 'Photo-03',
      label: 'Photo-03 (B)',
      title: 'Electrical Distribution Board Inspection',
      caption: 'Field evidence Photo-03 (Part B) showing electrical safety check and danger tag',
      url: PHOTO_1_8,
    },
    {
      id: 'p4-a',
      slot: 'Photo-04',
      label: 'Photo-04 (A) — SSSS ID Badges',
      title: 'Personnel ID Badges (Site Safety Services)',
      caption: 'Photo-04 (Part A): Official Site Safety Services (SSSS) Security & Safety Personnel ID Badge',
      url: PHOTO_1_1,
      isHighlight: true,
    },
    {
      id: 'p4-b',
      slot: 'Photo-04',
      label: 'Photo-04 (B) — SSSS Technician',
      title: 'Technician Identification (SSSS)',
      caption: 'Photo-04 (Part B): Verified Site Safety Services Specialist ID Card and barcode badge',
      url: PHOTO_1_3,
    },
    {
      id: 'p4-c',
      slot: 'Photo-04',
      label: 'Photo-04 (C)',
      title: 'Spill Containment & Drum Inspection',
      caption: 'Photo-04 (Part C): On-site chemical and liquid storage verification',
      url: PHOTO_1_7,
    },
  ];

  // Standard root causes list from Qatar University HSE Form
  const standardRootCauses = [
    'Weather/Temperature Factors',
    'Poor Housekeeping',
    'Lack of Preventive Maintenance/Regular Inspection',
    'Un-availability of Policies & Procedures',
    'Lack of Policies & Procedures Enforcement',
    'Lack of Follow up and Proper Supervision',
    'Lack of adequate Training & Orientation',
    'Lack of Proper/Effective Communication',
    'Un-availability of Proper Labels/Warning Signs',
    'Poor Site Environment factors (Light, Noise, IAQ)',
    'Ignorance of Safe working Procedures',
    'Improper Use of work tools/Short Cuts',
    'Insufficient Planning for Tasks',
    'Un-availability of proper PPEs',
    'Equipment Failure/Design',
    'Others',
  ];

  // Incident types checklist from Qatar HSE standard form
  const incidentTypesList = [
    { label: 'Fatality Case', key: 'Fatality Case' },
    { label: 'Medical Treatment Case', key: 'Medical Treatment Case' },
    { label: 'First Aid Case', key: 'First Aid Case' },
    { label: 'Fire Case', key: 'Fire Case' },
    { label: 'Fire Alarm Case', key: 'Fire Alarm Case' },
    { label: 'Vehicle Accident Case', key: 'Vehicle Accident Case' },
    { label: 'Rescue Case', key: 'Rescue Case' },
    { label: 'Assets/Structure Damage Case', key: 'Assets/Structure Damage Case' },
    { label: 'Chemicals/Biological Spill Case', key: 'Chemicals/Biological Spill Case' },
    { label: 'Gas Release Case', key: 'Gas Release Case' },
    { label: 'Explosion Case', key: 'Explosion Case' },
  ];

  const currentTypeChecklist =
    inc.incidentTypeChecklist ||
    (isIncident ? [inc.incidentType] : isNearMiss ? ['Near Miss', 'Fire Alarm Case'] : ['Hazard Observation', 'Assets/Structure Damage Case']);

  // Sequence of events
  const rawSeq = inc.sequenceOfEvents || haz.sequenceOfEvents || nm.sequenceOfEvents;
  const sequenceOfEvents =
    rawSeq && rawSeq.length > 0
      ? rawSeq
      : isHazard
      ? [
          { time: '09:40 AM', event: 'Noticed during housekeeping round' },
          { time: '09:50 AM', event: 'Area cordoned off with warning signs' },
          { time: '10:00 AM', event: 'HSE Office and MEP informed by phone' },
          { time: '10:35 AM', event: 'MEP checked above the false ceiling' },
          { time: '11:00 AM', event: 'Moisture traced to AC duct insulation' },
        ]
      : isNearMiss
      ? [
          { time: '08:05 AM', event: 'Technician climbed ladder to clean detector' },
          { time: '08:07 AM', event: 'Ladder base slipped on the carpet' },
          { time: '08:10 AM', event: 'Work stopped and ladder checked' },
          { time: '08:20 AM', event: 'Supervisor and HSE Office informed' },
          { time: '09:00 AM', event: 'Work resumed, ladder held by 2nd person' },
        ]
      : [
          { time: '03:15 AM', event: 'Alarm received on FACP and by radio' },
          { time: '03:18 AM', event: 'Fire team reached the building' },
          { time: '03:19 AM', event: 'Alarm silenced' },
          { time: '03:22 AM', event: 'Area checked, no smoke or fire' },
          { time: '03:40 AM', event: 'FAS technical team arrived' },
          { time: '03:55 AM', event: 'FACP reset' },
        ];

  // Witnesses
  const rawWitnesses = inc.witnessList || haz.witnessList || nm.witnessList;
  const witnessList =
    rawWitnesses && rawWitnesses.length > 0
      ? rawWitnesses
      : [
          { name: 'Farhan Siddiqui', title: 'FAS Technician', idNumber: '44373', phone: '+974 4403-6900' },
          { name: 'Naveed Akhtar', title: 'Security Guard', idNumber: '66190', phone: '+974 4403-2215' },
        ];

  // Actions list
  const rawActions = inc.actionItems || haz.actionItems || nm.actionItems;
  const actionItems =
    rawActions && rawActions.length > 0
      ? rawActions
      : [
          {
            id: 1,
            action: 'Area inspected immediately and initial mitigation controls secured on site.',
            actionBy: 'Corporate-Fire / Safety Team',
            date: currentDate,
            status: 'CLOSED' as const,
            closeoutNotes: 'Initial safety perimeter established.',
          },
          {
            id: 2,
            action: 'Technical inspection conducted above false ceiling / equipment base.',
            actionBy: 'MEP / SYSTEM',
            date: currentDate,
            status: 'CLOSED' as const,
            closeoutNotes: 'System verified and isolated.',
          },
          {
            id: 3,
            action: 'Preventive repair, seal joint, and restore affected components to normal condition.',
            actionBy: 'CIVIL / MEP',
            date: currentDate,
            status: 'UNDER PROCESS' as const,
            closeoutNotes: 'Materials in procurement.',
          },
          {
            id: 4,
            action: 'Add verification check into monthly preventive maintenance and supervisor audit routine.',
            actionBy: 'HSS Compliance',
            date: currentDate,
            status: 'OPEN' as const,
            closeoutNotes: 'Documented in QU HSMS protocol.',
          },
        ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-xs text-gray-800">
        {/* Top Executive Header */}
        <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#0A4D3C] text-white px-5 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm border-b border-[#087F5B]/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-inner">
              {isIncident ? (
                <AlertOctagon className="w-5 h-5 text-amber-300" />
              ) : isHazard ? (
                <AlertTriangle className="w-5 h-5 text-amber-300" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-blue-300" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-emerald-200 bg-black/25 px-2 py-0.5 rounded border border-white/10">
                  {record.reference}
                </span>
                <Badge
                  variant={
                    record.severity === 'Critical'
                      ? 'critical'
                      : record.severity === 'High'
                      ? 'high'
                      : record.severity === 'Medium'
                      ? 'medium'
                      : 'low'
                  }
                  size="sm"
                >
                  {record.severity} Severity
                </Badge>
                <Badge variant={record.status === 'Closed' ? 'closed' : 'underReview'} size="sm">
                  {record.status}
                </Badge>
              </div>
              <h3 className="font-bold text-sm text-white truncate mt-0.5">{record.title}</h3>
              <p className="text-[10px] text-emerald-100/80 truncate">
                {record.project} • {record.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/demosss.xlsx"
              download="Enterprise_HSE_Incident_Hazard_Report_Form.xlsx"
              className="px-3 py-1.5 bg-emerald-600/40 hover:bg-emerald-600/60 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 border border-emerald-400/40 shadow-xs"
              title="Download Source Excel Form (demosss.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">Download Form Template (.xlsx)</span>
            </a>

            {onExportPDF && (
              <button
                onClick={onExportPDF}
                className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 border border-white/20 shadow-xs"
                title="Export Official 2-Page Incident Dossier (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-200" />
                <span className="hidden sm:inline">Export Dossier (PDF)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5 In-Depth Enterprise Tabs */}
        <div className="bg-[#F4F7F5] border-b border-gray-200 px-4 flex items-center gap-1 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            onClick={() => setActiveTab('originator')}
            className={`py-2.5 px-3 font-bold text-xs flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'originator'
                ? 'border-[#073B2F] text-[#073B2F] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>1. Originator & Sequence</span>
            <span className="text-[9px] bg-emerald-100 text-[#073B2F] px-1.5 py-0.2 rounded-full font-mono">Form</span>
          </button>

          <button
            onClick={() => setActiveTab('harm')}
            className={`py-2.5 px-3 font-bold text-xs flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'harm'
                ? 'border-[#073B2F] text-[#073B2F] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>2. Health, Injury & Asset Harm</span>
            <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-mono">Impact</span>
          </button>

          <button
            onClick={() => setActiveTab('causes')}
            className={`py-2.5 px-3 font-bold text-xs flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'causes'
                ? 'border-[#073B2F] text-[#073B2F] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>3. Root Cause Analysis</span>
            <span className="text-[9px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded-full font-mono">Taxonomy</span>
          </button>

          <button
            onClick={() => setActiveTab('capa')}
            className={`py-2.5 px-3 font-bold text-xs flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'capa'
                ? 'border-[#073B2F] text-[#073B2F] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>4. Corrective Actions (CAPA)</span>
            <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full font-mono font-bold">
              {actionItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('signoff')}
            className={`py-2.5 px-3 font-bold text-xs flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'signoff'
                ? 'border-[#073B2F] text-[#073B2F] bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>5. Sign-Off & Approvals</span>
            <span className="text-[9px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded-full font-mono">Digital</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: ORIGINATOR & SEQUENCE OF EVENTS */}
          {activeTab === 'originator' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              {/* Event Metadata Banner */}
              <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                <div>
                  <span className="text-gray-500 block text-[10px]">Date & Time</span>
                  <strong className="text-gray-900 font-mono">
                    {currentDate} at {currentTime} {currentTimeAmPm}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Reference Number</span>
                  <strong className="text-[#073B2F] font-mono font-bold">{record.reference}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Zone & Building Code</span>
                  <strong className="text-gray-900">
                    {currentZone} / BLD {currentBldCode}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Specific Location / Room</span>
                  <strong className="text-gray-900 truncate block">
                    {currentRoomNo}
                  </strong>
                </div>
              </div>

              {/* Originator / Observer Details Card */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h4 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#087F5B]" />
                    <span>Section 1: Originator / Observer Event Submission</span>
                  </h4>
                  <span className="text-[10px] text-gray-500 font-mono">Person who encountered or witnessed the event</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] pt-1">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Reported By</span>
                    <strong className="text-gray-900">{currentReportedBy}</strong>
                    <span className="text-[10px] text-gray-500 block">
                      Title: {currentReporterTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Contact Phone & Email</span>
                    <strong className="text-gray-900 font-mono">{currentReporterPhone}</strong>
                    <span className="text-[10px] text-gray-500 block font-mono">
                      {currentReporterEmail}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Department / Contractor</span>
                    <strong className="text-gray-900">
                      {currentContractor}
                    </strong>
                    <span className="text-[10px] text-gray-500 block">
                      Project: {record.project}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Description & Sequence of Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Event Description */}
                <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#087F5B]" />
                      <span>Description of Event</span>
                    </h5>
                    <span className="text-[10px] text-gray-400 font-mono">Field Narrative</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 text-[11px] text-gray-800 leading-relaxed min-h-[140px] space-y-1.5">
                    {record.description.split('\n').map((para, pIdx) => (
                      <p key={pIdx} className="leading-snug">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Sequence of Events Chronological Timeline */}
                <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#087F5B]" />
                      <span>Sequence of Events (Timeline)</span>
                    </h5>
                    <span className="text-[10px] text-[#087F5B] font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {sequenceOfEvents.length} chronological steps
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-200 text-[11px] space-y-2.5 min-h-[140px]">
                    {sequenceOfEvents.map((seq, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[11px]">
                        <span className="font-mono font-bold text-[#073B2F] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex-shrink-0 text-[10px] shadow-xs">
                          {seq.time}
                        </span>
                        <span className="text-gray-800 leading-snug pt-0.5 font-medium">{seq.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Classification & Incident Type Checkboxes */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                  <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>Official HSE Classification & Type of Event</span>
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-semibold">Classification:</span>
                    <span className="font-bold text-xs text-[#073B2F] bg-[#DDF5EA] px-2.5 py-0.5 rounded border border-emerald-300">
                      {isHazard ? 'Hazard' : isNearMiss ? 'Near Miss' : 'Incident'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 text-[11px]">
                  {incidentTypesList.map((item) => {
                    const isChecked = currentTypeChecklist.some(
                      (t) => t.toLowerCase() === item.key.toLowerCase() || t.toLowerCase() === item.label.toLowerCase()
                    );
                    return (
                      <div
                        key={item.key}
                        className={`p-2 rounded-lg border flex items-center gap-2 transition-colors ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-gray-50/60 border-gray-200 text-gray-400 opacity-70'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded border flex items-center justify-center font-mono text-[9px] bg-white font-bold text-emerald-700">
                          {isChecked ? '✓' : ''}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Photo Attachments Grid: All Photos including Photo-04 ID Badges */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#087F5B]" />
                      <span>Official Field Evidence Photos (Official Form Attachment)</span>
                    </h5>
                    <span className="text-[10px] bg-emerald-100 text-[#073B2F] font-bold px-2 py-0.5 rounded-full font-mono">
                      All Photos (Photo-01 to Photo-04)
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    Click any photo to zoom full size with field captions
                  </span>
                </div>

                {/* 4 Official Photo Boxes matching Excel Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {['Photo-01', 'Photo-02', 'Photo-03', 'Photo-04'].map((slotName) => {
                    const slotPhotos = allEvidencePhotos.filter((p) => p.slot === slotName);
                    const isPhoto4 = slotName === 'Photo-04';
                    
                    return (
                      <div
                        key={slotName}
                        className={`rounded-xl border overflow-hidden flex flex-col ${
                          isPhoto4
                            ? 'border-emerald-400 bg-emerald-50/30 shadow-xs'
                            : 'border-gray-200 bg-[#F8FAF9]'
                        }`}
                      >
                        {/* Box Header matching Excel Form blue title */}
                        <div
                          className={`px-3 py-1.5 flex items-center justify-between text-xs font-bold ${
                            isPhoto4
                              ? 'bg-gradient-to-r from-emerald-700 to-[#073B2F] text-white'
                              : 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
                          }`}
                        >
                          <span className="font-mono">{slotName}</span>
                          <span className="text-[9px] font-normal opacity-90">
                            {slotPhotos.length} {slotPhotos.length === 1 ? 'photo' : 'photos'}
                          </span>
                        </div>

                        {/* Box Photos Body */}
                        <div className="p-2 space-y-2 flex-1 flex flex-col justify-between">
                          {slotPhotos.map((photo) => (
                            <div
                              key={photo.id}
                              onClick={() => setSelectedPhoto(photo)}
                              className="group relative rounded-lg overflow-hidden border border-gray-200 hover:border-emerald-500 cursor-pointer bg-white transition-all shadow-2xs hover:shadow-sm"
                            >
                              <div
                                className={`w-full overflow-hidden bg-gray-900 flex items-center justify-center ${
                                  photo.isHighlight ? 'h-36' : 'h-24'
                                }`}
                              >
                                <img
                                  src={photo.url}
                                  alt={photo.title}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                                />
                              </div>
                              <div className="p-1.5 bg-white flex items-center justify-between border-t border-gray-100 text-[10px]">
                                <div className="min-w-0 pr-1">
                                  <span className="font-bold text-gray-900 truncate block text-[10px]">
                                    {photo.label}
                                  </span>
                                  <span className="text-[9px] text-gray-500 truncate block">
                                    {photo.title}
                                  </span>
                                </div>
                                <span className="p-1 rounded bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0">
                                  <Camera className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Witness Details */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>Witness Details (if available)</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {witnessList.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#F8FAF9] rounded-lg border border-gray-200 flex items-center justify-between text-[11px]"
                    >
                      <div>
                        <strong className="text-gray-900 block">{w.name}</strong>
                        <span className="text-gray-500 text-[10px]">
                          {w.title} • ID: {w.idNumber}
                        </span>
                      </div>
                      <span className="font-mono text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200 text-[10px]">
                        📞 {w.phone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HEALTH, INJURY & ASSET HARM ASSESSMENT */}
          {activeTab === 'harm' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              {/* Section 2 Header */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">
                    Section 2: Health, Injury & Asset Harm Assessment
                  </h4>
                  <p className="text-[10px] text-gray-500">To be completed by Health & Safety Specialist</p>
                </div>
                <Badge variant={record.severity === 'Critical' ? 'critical' : 'medium'}>
                  Risk Rating: {record.severity}
                </Badge>
              </div>

              {/* 5x5 Risk Matrix & Investigation Tier */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-[#F8FAF9] border border-gray-200 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">5x5 Risk Score</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-gray-900 font-mono">
                      {inc.finalRiskScore || (record.severity === 'High' ? 16 : record.severity === 'Medium' ? 9 : 2)}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      (Likelihood: {inc.likelihoodScore || 1} × Consequence: {inc.consequenceScore || 2})
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Calculated HSE Matrix Rating
                  </span>
                </div>

                <div className="p-3 bg-[#F8FAF9] border border-gray-200 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">Incident Rate</span>
                  <div className="text-sm font-bold text-gray-900">
                    {inc.incidentRate || (record.severity === 'Low' ? 'Insignificant' : record.severity === 'Medium' ? 'Minor' : 'Moderate')}
                  </div>
                  <span className="text-[10px] text-gray-500 block">Statutory classification</span>
                </div>

                <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
                  <span className="text-[10px] text-blue-900 font-semibold block uppercase">Investigation Tier</span>
                  <div className="text-xs font-bold text-blue-950 leading-tight">
                    {inc.investigationRequirement || 'Section 3 Standard Investigation Required'}
                  </div>
                  <span className="text-[10px] text-blue-700 block">Governed by HSMS protocols</span>
                </div>
              </div>

              {/* Details of the Injured (if applicable) */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                  <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <Ambulance className="w-3.5 h-3.5 text-red-600" />
                    <span>Details of the Injured (if applicable)</span>
                  </h5>
                  <div className="flex items-center gap-2 text-[10px] font-semibold">
                    <span>Affiliation:</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">Contractor / Staff</span>
                  </div>
                </div>

                <div className="p-3 bg-red-50/40 rounded-xl border border-red-200/80 space-y-2 text-[11px]">
                  {(() => {
                    const injuredObj = typeof inc.injuredDetails === 'object' && inc.injuredDetails !== null ? inc.injuredDetails : null;
                    const injuredText = typeof inc.injuredDetails === 'string' ? inc.injuredDetails : null;
                    const personName = injuredObj?.name || (inc.personsInvolved && inc.personsInvolved[0]) || (injuredText ? 'None reported' : 'None (No casualties)');
                    const personQid = injuredObj?.qid || 'N/A';
                    const clinicalText = inc.injuryDetails || injuredObj?.injuryDetails || injuredText || 'No physical human injury reported. Smoke sensor triggered due to ambient thermal humidity.';
                    const firstAidStatus = injuredObj?.firstAidGiven ? '✓ Administered on-site clinic' : 'None required / Zero harm';

                    return (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <span className="text-[10px] text-gray-500 block">Injured Person Name</span>
                            <strong className="text-gray-900">{personName}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block">QID / Employee ID</span>
                            <strong className="text-gray-900 font-mono">{personQid}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block">First Aid Status</span>
                            <span className="font-bold text-emerald-700">{firstAidStatus}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-red-200/60">
                          <span className="text-[10px] text-gray-600 font-bold block mb-0.5">Clinical Injury Details:</span>
                          <p className="text-gray-800 leading-relaxed font-medium">{clinicalText}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Details of Asset, Structure, Vehicle or Spill Damage */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span>Details of Asset / Structure / Vehicle Cases (if applicable)</span>
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 block">Property / Equipment</span>
                    <strong className="text-gray-900">
                      {inc.equipmentInvolved || 'FACP Smoke Detector (L31/011/3F)'}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 block">Spill / Gas Release</span>
                    <strong className="text-gray-900 font-mono">None (0.00 Litres)</strong>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 block">Vehicle Plate No</span>
                    <strong className="text-gray-900 font-mono">N/A</strong>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 block">Estimated Cost (QAR)</span>
                    <strong className="text-emerald-800 font-mono font-bold">0.00 QAR</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ROOT CAUSE ANALYSIS */}
          {activeTab === 'causes' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">
                    Section 3: Cause Analysis (Immediate & Root Causes)
                  </h4>
                  <p className="text-[10px] text-gray-500">Filled by Lead Safety Investigator</p>
                </div>
                <span className="text-[10px] font-mono bg-purple-50 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200 font-bold">
                  Standard 16-Pillar Taxonomy
                </span>
              </div>

              {/* Immediate Cause */}
              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5">
                <span className="font-bold text-amber-900 block text-xs">Immediate Causes:</span>
                <p className="text-amber-950 font-medium leading-relaxed">
                  {inc.immediateActions || 'Due to Humidity (Smoke Detector activation) / Unsafe environmental condition.'}
                </p>
              </div>

              {/* Root Cause Taxonomy Checklist Grid */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <span className="font-bold text-xs text-gray-900 block">
                  Official Root Cause Taxonomy Selection:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1 text-[11px]">
                  {standardRootCauses.map((rc) => {
                    const isSelected =
                      (inc.rootCauseSummary && inc.rootCauseSummary.toLowerCase().includes(rc.toLowerCase())) ||
                      (inc.rootCauseTaxonomy && inc.rootCauseTaxonomy.includes(rc)) ||
                      (rc === 'Weather/Temperature Factors' &&
                        (record.title.toLowerCase().includes('humidity') || record.title.toLowerCase().includes('heat')));

                    return (
                      <div
                        key={rc}
                        className={`p-2 rounded-lg border flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold shadow-xs'
                            : 'bg-gray-50/50 border-gray-200 text-gray-400'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center font-mono text-[9px] ${
                            isSelected ? 'bg-purple-600 text-white border-purple-600' : 'bg-white'
                          }`}
                        >
                          {isSelected ? '✓' : ''}
                        </span>
                        <span className="truncate">{rc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Investigation Narrative */}
              <div className="p-3.5 bg-[#F8FAF9] rounded-xl border border-gray-200 space-y-1.5">
                <span className="font-bold text-xs text-gray-900 block">
                  Investigator's Technical Summary:
                </span>
                <p className="text-gray-700 leading-relaxed text-[11px]">
                  {inc.rootCauseSummary || currentImmediateCauses.join(' ') || record.description}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CORRECTIVE ACTIONS (CAPA) */}
          {activeTab === 'capa' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">
                    Section 4: Corrective / Preventative Actions (CAPA Action Ledger)
                  </h4>
                  <p className="text-[10px] text-gray-500">Official Qatar HSE Closeout Register</p>
                </div>
                <span className="text-[10px] font-bold bg-[#DDF5EA] text-[#073B2F] px-2.5 py-0.5 rounded-full border border-[#20A887]/30">
                  {actionItems.length} Actions Tracked
                </span>
              </div>

              {/* CAPA Table Matching Excel Layout */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAF9] text-gray-600 text-[10px] uppercase font-bold border-b border-gray-200">
                    <tr>
                      <th className="py-2.5 px-3 w-10 text-center">#</th>
                      <th className="py-2.5 px-3">Recommended / Taken Action</th>
                      <th className="py-2.5 px-3 w-32">Action By</th>
                      <th className="py-2.5 px-3 w-28">Target Date</th>
                      <th className="py-2.5 px-3 w-28 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-[11px]">
                    {actionItems.map((act) => (
                      <tr key={act.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-3 text-center font-bold text-gray-400">{act.id}</td>
                        <td className="py-3 px-3 text-gray-900 font-medium leading-snug">
                          {act.action}
                          {act.closeoutNotes && (
                            <span className="block text-[10px] text-gray-400 mt-0.5 font-normal italic">
                              Note: {act.closeoutNotes}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-[10px] font-bold">
                            {act.actionBy}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-gray-600 text-[10px]">{act.date}</td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              act.status === 'CLOSED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : act.status === 'UNDER PROCESS'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {act.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Toolbar */}
              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-200 flex items-center justify-between">
                <span className="text-[11px] text-gray-600">
                  Need to add an extra corrective action for this case?
                </span>
                <button
                  onClick={onAssignCAPA}
                  className="px-3 py-1.5 bg-[#073B2F] hover:bg-[#087F5B] text-white font-bold text-xs rounded-lg transition-all shadow-xs flex items-center gap-1 active:scale-95"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Assign Extra CAPA Item</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEW, APPROVALS & SIGN-OFF */}
          {activeTab === 'signoff' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">
                    Section 5: Reviewer & Approver Sign-Off
                  </h4>
                  <p className="text-[10px] text-gray-500">Official QHSE Governance & Verification Signatures</p>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Compliant with HSMS Section 4
                </span>
              </div>

              {/* Two Official Sign-off Cards matching Excel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reviewer Card */}
                <div className="p-4 bg-[#F8FAF9] rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="font-bold text-xs text-gray-900">Reviewed By</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <strong className="text-gray-900">
                        {currentReviewedBy.name || 'Dr. Hassan Al-Mahmoud'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Job Title:</span>
                      <span className="text-gray-800">
                        {currentReviewedBy.title || 'Fire Safety Specialist'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-mono text-gray-800">
                        {currentReviewedBy.signatureDate || currentDate}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-gray-500">Official Signature:</span>
                        <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Verified on Form
                        </span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-gray-200 flex items-center justify-center">
                        <img
                          src="/evidence/image5.jpeg"
                          alt="Reviewer Signature"
                          className="h-10 object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono mt-1">
                        <span>Digital Seal:</span>
                        <span>SHA256: 7f8a9...b401</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Approver Card */}
                <div className="p-4 bg-[#F8FAF9] rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="font-bold text-xs text-gray-900">Approved By</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      ✓ Executive Sign-off
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <strong className="text-gray-900">
                        {currentApprovedBy.name || 'Eng. Nasser Al-Khelaifi'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Job Title:</span>
                      <span className="text-gray-800">
                        {currentApprovedBy.title || 'Act. Head of Health and Safety'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-mono text-gray-800">
                        {currentApprovedBy.signatureDate || currentDate}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-gray-500">Official Signature:</span>
                        <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Verified on Form
                        </span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-gray-200 flex items-center justify-center">
                        <img
                          src="/evidence/image2.jpeg"
                          alt="Approver Signature"
                          className="h-10 object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono mt-1">
                        <span>Digital Seal:</span>
                        <span>SHA256: 3c19e...88ad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifecycle State Transitions */}
              <div className="p-3.5 bg-white border border-gray-200 rounded-xl space-y-2">
                <span className="font-bold text-xs text-gray-900 block">
                  Workflow Lifecycle & Case Actions:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {onLaunchInvestigation && (
                    <button
                      onClick={onLaunchInvestigation}
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg text-xs shadow-xs flex items-center gap-1 active:scale-95"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Launch Investigation (5-Whys)</span>
                    </button>
                  )}

                  {onAssignCAPA && (
                    <button
                      onClick={onAssignCAPA}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs shadow-xs flex items-center gap-1 active:scale-95"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Assign CAPA Control</span>
                    </button>
                  )}

                  {onStatusChange && (
                    <>
                      <button
                        onClick={() => onStatusChange('Closed')}
                        className="px-3 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-semibold rounded-lg text-xs shadow-xs flex items-center gap-1 active:scale-95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Close Case</span>
                      </button>

                      <button
                        onClick={() => onStatusChange('Reopened')}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs shadow-xs flex items-center gap-1 active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reopen Case</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>


      {/* Full-Screen Evidence Photo Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-70 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-800 text-gray-900 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#073B2F] to-[#087F5B] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-300" />
                <span className="font-bold text-xs">{selectedPhoto.title}</span>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded font-mono text-emerald-200 border border-white/10">
                  {selectedPhoto.label}
                </span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[65vh]">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg border border-slate-800"
              />
            </div>
            <div className="p-3.5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <p className="text-gray-700 font-medium text-[11px] leading-relaxed">
                {selectedPhoto.caption}
              </p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={selectedPhoto.url}
                  download={selectedPhoto.label + '.jpeg'}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded font-semibold text-[11px] flex items-center gap-1 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </a>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-3 py-1 bg-[#073B2F] text-white rounded font-bold text-[11px]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Modal Bottom Footer Bar */}
        <div className="bg-[#F4F7F5] border-t border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px]">
            <span>Ref: {record.reference}</span>
            <span>•</span>
            <span>{record.project}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white hover:bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-300 transition-colors shadow-2xs text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
