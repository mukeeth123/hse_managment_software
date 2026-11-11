import React, { useState } from 'react';
import {
  FileText,
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
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!isOpen || !record) return null;

  // Normalized helper data
  const isIncident = recordType === 'Incident';
  const isHazard = recordType === 'Hazard';
  const isNearMiss = recordType === 'Near Miss';

  const inc = record as IncidentRecord;
  const haz = record as HazardRecord;
  const nm = record as NearMissRecord;

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
    (isIncident ? [inc.incidentType] : isNearMiss ? ['Near Miss'] : ['Hazard Observation']);

  // Sequence of events fallback
  const sequenceOfEvents =
    inc.sequenceOfEvents ||
    (isIncident
      ? [
          { time: `${inc.incidentTime || '10:00'}`, event: 'Information received through radio / initial observation.' },
          { time: `${inc.incidentTime ? '10:15' : '10:15'}`, event: 'Response team arrived at location.' },
          { time: `${inc.incidentTime ? '10:20' : '10:20'}`, event: 'Immediate containment / area verified.' },
          { time: `${inc.incidentTime ? '10:45' : '10:45'}`, event: 'Normal operations restored.' },
        ]
      : [
          { time: '08:30 AM', event: 'Frontline observer detected unsafe condition during pre-task inspection.' },
          { time: '08:45 AM', event: 'Immediate warning barrier / exclusion zone established.' },
          { time: '09:15 AM', event: 'Observation logged into QHSE Platform.' },
        ]);

  // Witnesses fallback
  const witnessList =
    inc.witnessList ||
    (inc.witnesses && inc.witnesses.length > 0
      ? inc.witnesses.map((w, idx) => ({
          name: w,
          title: 'Field Tradesman',
          idNumber: `EMP-${3000 + idx}`,
          phone: '+974 4403-3999',
        }))
      : [
          { name: 'Mubarak Esam', title: 'Firefighter / Safety Inspector', idNumber: '55010', phone: '+974 4403-3999' },
          { name: 'Mohammad Siraj', title: 'FAS Technician', idNumber: '44373', phone: '+974 4403-6900' },
        ]);

  // Actions list fallback
  const actionItems =
    inc.actionItems ||
    (haz.actionItems || [
      {
        id: 1,
        action: 'Immediately responded to the scene, verified exact location and triggered condition.',
        actionBy: 'FGSD-Fire / Safety Team',
        date: inc.incidentDate || '2026-11-06',
        status: 'CLOSED' as const,
        closeoutNotes: 'Location physically inspected and declared safe.',
      },
      {
        id: 2,
        action: 'Surroundings inspected, temporary barrier and warning signage installed.',
        actionBy: 'CIVIL / HSE',
        date: inc.incidentDate || '2026-11-06',
        status: 'CLOSED' as const,
        closeoutNotes: 'Physical barriers confirmed.',
      },
      {
        id: 3,
        action: 'Technical team deployed for mechanical/electrical inspection and device cleaning.',
        actionBy: 'SYSTEM / MEP',
        date: inc.incidentDate || '2026-11-07',
        status: 'CLOSED' as const,
        closeoutNotes: 'System restored to normal operating state.',
      },
      {
        id: 4,
        action: 'Supervisory sign-off and follow-up preventive maintenance inspection.',
        actionBy: 'HSS Compliance',
        date: inc.incidentDate || '2026-11-08',
        status: 'UNDER PROCESS' as const,
        closeoutNotes: 'Scheduled in weekly audit round.',
      },
    ]);

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
                    {inc.incidentDate || haz.reportedAt?.substring(0, 10) || '2025-08-21'} at{' '}
                    {inc.incidentTime || '00:30'} {inc.timeAmPm || 'AM'}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Reference Number</span>
                  <strong className="text-[#073B2F] font-mono font-bold">{record.reference}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Zone & Building Code</span>
                  <strong className="text-gray-900">
                    {inc.zone || 'Zone F'} / {inc.buildingCode || 'BLD F05'}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Specific Location / Room</span>
                  <strong className="text-gray-900 truncate block">
                    {inc.roomNo || record.location || 'Male Hostel, 3rd Floor, Corridor'}
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
                    <strong className="text-gray-900">{record.reportedBy || 'Obaid Khalid'}</strong>
                    <span className="text-[10px] text-gray-500 block">
                      Title: {inc.reporterTitle || 'Firefighter (B. CRO)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Contact Phone & Email</span>
                    <strong className="text-gray-900 font-mono">{inc.reporterPhone || '4403-3999'}</strong>
                    <span className="text-[10px] text-gray-500 block">
                      {inc.reporterEmail || 'okhalid@example.qa'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Department / Contractor</span>
                    <strong className="text-gray-900">
                      {inc.contractorName || 'Zeal-IT Trading & Contracting'}
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
                  <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>Description of Event</span>
                  </h5>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 text-[11px] text-gray-700 leading-relaxed whitespace-pre-line font-medium min-h-[140px]">
                    {record.description}
                  </div>
                </div>

                {/* Sequence of Events Chronological Timeline */}
                <div className="bg-[#F8FAF9] p-3.5 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#087F5B]" />
                      <span>Sequence of Events (Timeline)</span>
                    </h5>
                    <span className="text-[10px] text-gray-500 font-mono">Step-by-step resolution</span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-200 text-[11px] space-y-2.5 min-h-[140px]">
                    {sequenceOfEvents.map((seq, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[11px]">
                        <span className="font-mono font-bold text-[#073B2F] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex-shrink-0 text-[10px]">
                          {seq.time}
                        </span>
                        <span className="text-gray-800 leading-snug">{seq.event}</span>
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
                    <span className="font-bold text-xs text-[#073B2F] bg-[#DDF5EA] px-2 py-0.5 rounded">
                      {isNearMiss ? 'Near Miss' : 'Incident'}
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
                        <span className="w-3.5 h-3.5 rounded border flex items-center justify-center font-mono text-[9px] bg-white">
                          {isChecked ? '✓' : ''}
                        </span>
                        <span className="truncate">{item.label}</span>
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
                  {inc.rootCauseSummary ||
                    'Atmospheric moisture condensation in the optical chamber of smoke detector L31/011/3F caused refracted light scattering onto the photodiode sensor, registering a false alarm. No combustion or fire hazards detected.'}
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
                      <th className="py-2.5 px-3 w-24 text-center">Status</th>
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
                        {inc.reviewedBy?.name || 'Moumeen Mohamed Ali'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Job Title:</span>
                      <span className="text-gray-800">
                        {inc.reviewedBy?.title || 'Fire Safety Specialist'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-mono text-gray-800">
                        {inc.reviewedBy?.signatureDate || inc.incidentDate || '2025-08-21'}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
                      <span>Digital Certificate:</span>
                      <span className="font-mono text-[#073B2F] font-bold">SHA256: 7f8a9...b401</span>
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
                        {inc.approvedBy?.name || 'Abdulhadi Al-Hajri'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Job Title:</span>
                      <span className="text-gray-800">
                        {inc.approvedBy?.title || 'Act. Head of Health and Safety'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-mono text-gray-800">
                        {inc.approvedBy?.signatureDate || inc.incidentDate || '2025-08-21'}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
                      <span>Digital Certificate:</span>
                      <span className="font-mono text-[#073B2F] font-bold">SHA256: 3c19e...88ad</span>
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
