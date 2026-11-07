import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import {
  AlertOctagon,
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  RotateCcw,
  FileText,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { IncidentRecord, IncidentCategory, SeverityLevel, IncidentStatus } from '../../../types';
import { exportToExcel, generateHSEPDFReport } from '../../../utils/exportUtils';

export const IncidentManagementModule: React.FC = () => {
  const {
    incidents,
    updateIncident,
    createIncident,
    currentUser,
    projects,
    locations,
    selectedRecordRef,
    setSelectedRecordRef,
    setActiveDesktopModule,
    addToast,
  } = useHSE();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(
    selectedRecordRef ? incidents.find((i) => i.reference === selectedRecordRef) || null : null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(!!selectedRecordRef);
  const [reopenReason, setReopenReason] = useState('');
  const [showReopenInput, setShowReopenInput] = useState(false);

  // New Incident Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<IncidentCategory>('First-aid case');
  const [newSeverity, setNewSeverity] = useState<SeverityLevel>('Low');
  const [newLocation, setNewLocation] = useState('Work Area A');
  const [newProject, setNewProject] = useState(projects[0]);
  const [newDesc, setNewDesc] = useState('');
  const [newImmediate, setNewImmediate] = useState('');
  const [newInjury, setNewInjury] = useState('');

  const filtered = incidents.filter((inc) => {
    if (typeFilter !== 'All' && inc.incidentType !== typeFilter) return false;
    if (severityFilter !== 'All' && inc.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && inc.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        inc.reference.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.location.toLowerCase().includes(q) ||
        inc.reportedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (inc: IncidentRecord) => {
    setSelectedIncident(inc);
    setIsDetailOpen(true);
    setSelectedRecordRef(inc.reference);
    setShowReopenInput(false);
  };

  const handleStatusChange = (newStatus: IncidentStatus) => {
    if (!selectedIncident) return;
    const updated: IncidentRecord = {
      ...selectedIncident,
      status: newStatus,
      closedAt: newStatus === 'Closed' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined,
      closedBy: newStatus === 'Closed' ? currentUser.name : undefined,
      reopenReason: newStatus === 'Reopened' ? reopenReason : undefined,
    };
    updateIncident(updated);
    setSelectedIncident(updated);
    setShowReopenInput(false);
  };

  const handleExportIncidentPDF = (inc: IncidentRecord) => {
    generateHSEPDFReport(
      `Incident Investigation Dossier: ${inc.reference}`,
      `${inc.incidentType} — ${inc.project}`,
      [
        {
          title: 'Incident Metadata',
          lines: [
            `Reference: ${inc.reference} | Occurred: ${inc.incidentDate} at ${inc.incidentTime}`,
            `Location: ${inc.location} | Department: ${inc.department}`,
            `Reported by: ${inc.reportedBy} (${inc.reporterEmployeeId})`,
            `Severity: ${inc.severity} (Potential: ${inc.potentialSeverity}) | Status: ${inc.status.toUpperCase()}`,
          ],
        },
        {
          title: 'Description of Event',
          lines: [inc.description],
        },
        {
          title: 'Injury & Immediate Emergency Actions',
          lines: [
            `Injury Details: ${inc.injuryDetails || 'None / Not Applicable'}`,
            `Immediate Actions: ${inc.immediateActions}`,
            `Equipment Involved: ${inc.equipmentInvolved || 'N/A'}`,
            `Witnesses: ${inc.witnesses?.join(', ') || 'None listed'}`,
          ],
        },
        {
          title: 'Root Cause & Regulatory Reporting (Qatar MD 19/2005)',
          lines: [
            `Root Cause Summary: ${inc.rootCauseSummary || 'Under formal investigation'}`,
            `Statutory 24-Hour MoL Notification: Verified under Ministerial Decision No. 19 of 2005`,
          ],
        },
      ]
    );
    addToast('success', 'Dossier Downloaded', `PDF report generated for ${inc.reference}`);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const res = createIncident({
      title: newTitle,
      incidentType: newType,
      project: newProject,
      location: newLocation,
      department: currentUser.department || 'Operations',
      reportedBy: currentUser.name,
      reporterEmployeeId: currentUser.employeeId,
      personsInvolved: [currentUser.name],
      severity: newSeverity,
      potentialSeverity: newSeverity === 'Low' ? 'Medium' : 'Critical',
      description: newDesc,
      immediateActions: newImmediate || 'Administered first aid and secured work zone',
      injuryDetails: newInjury,
      requiresInvestigation: newSeverity === 'High' || newSeverity === 'Critical',
      status: 'Reported',
    });

    setIsCreateOpen(false);
    setSelectedIncident(res);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Incident Management Centre</h2>
            <Badge variant="critical" size="sm">{incidents.length} recorded incidents</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Statutory incident reporting, injury logging, 24-hour Qatar MoL notification protocol and root cause tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel('QHSE_Incidents_Register', 'Incidents', incidents)}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel Export</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Report Incident</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ref, title, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Incident Types</option>
            <option value="First-aid case">First-aid case</option>
            <option value="Medical treatment case">Medical treatment case</option>
            <option value="Lost-time incident">Lost-time incident</option>
            <option value="Occupational illness">Occupational illness</option>
            <option value="Property damage">Property damage</option>
            <option value="Equipment damage">Equipment damage</option>
            <option value="Fire">Fire</option>
            <option value="Environmental incident">Environmental incident</option>
            <option value="Chemical spill">Chemical spill</option>
          </select>
        </div>

        <div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="CAPA Assigned">CAPA Assigned</option>
            <option value="Closed">Closed</option>
            <option value="Reopened">Reopened</option>
          </select>
        </div>
      </div>

      {/* Incident Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Incident Ref</th>
                <th className="py-2.5 px-3 font-semibold">Type</th>
                <th className="py-2.5 px-3 font-semibold">Title & Details</th>
                <th className="py-2.5 px-3 font-semibold">Occurred</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold">Severity</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => handleOpenDetail(inc)}
                  className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">
                    {inc.reference}
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-900 whitespace-nowrap">
                    {inc.incidentType}
                  </td>
                  <td className="py-3 px-3 max-w-sm">
                    <div className="font-bold text-gray-900 leading-snug">{inc.title}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{inc.description}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">
                    <div>{inc.incidentDate}</div>
                    <span className="text-[10px] text-gray-400">{inc.incidentTime}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">{inc.location}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge
                      variant={
                        inc.severity === 'Critical'
                          ? 'critical'
                          : inc.severity === 'High'
                          ? 'high'
                          : inc.severity === 'Medium'
                          ? 'medium'
                          : 'low'
                      }
                      size="sm"
                    >
                      {inc.severity}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={inc.status === 'Closed' ? 'closed' : 'underReview'} size="sm">
                      {inc.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(inc);
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#073B2F] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Detail Modal */}
      {isDetailOpen && selectedIncident && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Incident File: ${selectedIncident.reference}`}
          subtitle={`${selectedIncident.incidentType} — ${selectedIncident.project}`}
          maxWidth="4xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Badge variant={selectedIncident.status === 'Closed' ? 'closed' : 'critical'}>
                  {selectedIncident.status}
                </Badge>
                <Badge variant={selectedIncident.severity === 'Critical' ? 'critical' : 'high'}>
                  {selectedIncident.severity}
                </Badge>
                <span className="text-gray-500 font-mono">
                  {selectedIncident.incidentDate} at {selectedIncident.incidentTime}
                </span>
              </div>

              <button
                onClick={() => handleExportIncidentPDF(selectedIncident)}
                className="px-3 py-1 bg-[#073B2F] hover:bg-[#092B24] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Formal Incident Dossier (PDF)</span>
              </button>
            </div>

            {/* Description & Immediate Action */}
            <div className="bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6] space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">{selectedIncident.title}</h4>
              <p className="text-gray-700 leading-relaxed">{selectedIncident.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-red-50/60 border border-red-200 rounded-xl">
                <span className="font-bold text-red-900 block mb-1">Injury / Occupational Illness:</span>
                <p className="text-red-800 text-[11px] leading-relaxed">
                  {selectedIncident.injuryDetails || 'No clinical physical injury reported.'}
                </p>
                <div className="mt-2 text-[10px] text-gray-600">
                  Persons involved: <strong>{selectedIncident.personsInvolved.join(', ')}</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <span className="font-bold text-emerald-900 block mb-1">Immediate Actions Taken:</span>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  {selectedIncident.immediateActions}
                </p>
                <div className="mt-2 text-[10px] text-gray-600">
                  Equipment involved: <strong>{selectedIncident.equipmentInvolved || 'N/A'}</strong>
                </div>
              </div>
            </div>

            {/* Root Cause Summary */}
            {selectedIncident.rootCauseSummary && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                <span className="font-bold text-purple-900 block mb-1">Root Cause Analysis Summary:</span>
                <p className="text-purple-800 text-[11px] leading-relaxed">
                  {selectedIncident.rootCauseSummary}
                </p>
              </div>
            )}

            {/* Status & Investigation Actions */}
            <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
              <h5 className="font-bold text-gray-900">Incident Lifecycle Transitions:</h5>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    handleStatusChange('Under Investigation');
                    setActiveDesktopModule('Investigation Management');
                    setSelectedRecordRef(selectedIncident.reference);
                    setIsDetailOpen(false);
                  }}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <span>Launch Investigation (5-Whys & Fishbone)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    handleStatusChange('CAPA Assigned');
                    setActiveDesktopModule('Corrective and Preventive Actions');
                    setSelectedRecordRef(selectedIncident.reference);
                    setIsDetailOpen(false);
                  }}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <span>Assign CAPA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleStatusChange('Closed')}
                  className="px-3 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Close Incident</span>
                </button>

                <button
                  onClick={() => setShowReopenInput(!showReopenInput)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reopen Case</span>
                </button>
              </div>

              {showReopenInput && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                  <label className="block text-amber-900 font-bold text-[11px]">Reason for Reopening:</label>
                  <input
                    type="text"
                    value={reopenReason}
                    onChange={(e) => setReopenReason(e.target.value)}
                    placeholder="e.g. Recurrence of symptom or new evidence uncovered..."
                    className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded text-xs outline-none"
                  />
                  <button
                    onClick={() => handleStatusChange('Reopened')}
                    className="px-3 py-1 bg-amber-700 text-white font-bold rounded text-xs"
                  >
                    Confirm Reopen
                  </button>
                </div>
              )}
            </div>

            {selectedIncident.closedAt && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px]">
                Incident closed on <strong>{selectedIncident.closedAt}</strong> by <strong>{selectedIncident.closedBy}</strong>.
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Create New Incident Modal */}
      {isCreateOpen && (
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="File Formal HSE Incident Report"
          subtitle="Statutory workplace incident and injury notification"
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Incident Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Worker slipped on wet staircase in Building Zone 01"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Incident Classification</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as IncidentCategory)}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                >
                  <option value="First-aid case">First-aid case</option>
                  <option value="Medical treatment case">Medical treatment case</option>
                  <option value="Lost-time incident">Lost-time incident</option>
                  <option value="Occupational illness">Occupational illness</option>
                  <option value="Property damage">Property damage</option>
                  <option value="Equipment damage">Equipment damage</option>
                  <option value="Fire">Fire</option>
                  <option value="Chemical spill">Chemical spill</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Severity</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as SeverityLevel)}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg outline-none font-semibold"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Project</label>
                <select
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                >
                  {projects.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Location</label>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Description of Incident *</label>
              <textarea
                required
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Sequence of events, root factors, timeline..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Injury Details (if applicable)</label>
              <input
                type="text"
                value={newInjury}
                onChange={(e) => setNewInjury(e.target.value)}
                placeholder="e.g. Contusion to right knee, ice applied"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Immediate Actions Taken</label>
              <input
                type="text"
                value={newImmediate}
                onChange={(e) => setNewImmediate(e.target.value)}
                placeholder="e.g. Escorted to clinic, barricaded slippery area"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold shadow"
              >
                Submit Incident Report
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
