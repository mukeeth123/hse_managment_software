import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { Eye, Search, Filter, Plus, Download, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { EnterpriseHSEDossierModal } from '../../common/EnterpriseHSEDossierModal';
import { NearMissRecord, NearMissCategory, SeverityLevel } from '../../../types';
import { exportToExcel } from '../../../utils/exportUtils';

export const NearMissManagementModule: React.FC = () => {
  const { nearMisses, updateNearMiss, createNearMiss, currentUser, projects, locations, selectedRecordRef, setSelectedRecordRef, setActiveDesktopModule } = useHSE();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedNearMiss, setSelectedNearMiss] = useState<NearMissRecord | null>(
    selectedRecordRef ? nearMisses.find((n) => n.reference === selectedRecordRef) || null : null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(!!selectedRecordRef);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<NearMissCategory>('Dropped object');
  const [newSeverity, setNewSeverity] = useState<SeverityLevel>('High');
  const [newLocation, setNewLocation] = useState('Work Area A');
  const [newProject, setNewProject] = useState(projects[0]);
  const [newDesc, setNewDesc] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [newAction, setNewAction] = useState('');

  const filtered = nearMisses.filter((nm) => {
    if (categoryFilter !== 'All' && nm.category !== categoryFilter) return false;
    if (severityFilter !== 'All' && nm.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && nm.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        nm.reference.toLowerCase().includes(q) ||
        nm.title.toLowerCase().includes(q) ||
        nm.location.toLowerCase().includes(q) ||
        nm.reportedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (nm: NearMissRecord) => {
    setSelectedNearMiss(nm);
    setIsDetailOpen(true);
  };

  const handleCloseNearMiss = () => {
    if (!selectedNearMiss) return;
    const updated: NearMissRecord = {
      ...selectedNearMiss,
      status: 'Closed',
      reviewNotes: 'Reviewed by HSE Team. Immediate preventive actions verified on site.',
    };
    updateNearMiss(updated);
    setSelectedNearMiss(updated);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const res = createNearMiss({
      title: newTitle,
      category: newCategory,
      project: newProject,
      location: newLocation,
      reportedBy: currentUser.name,
      reporterEmployeeId: currentUser.employeeId,
      severity: newSeverity,
      description: newDesc,
      potentialOutcome: newOutcome || 'Potential serious trauma had personnel been present',
      immediateActionTaken: newAction || 'Secured area and advised crew',
      status: 'Reported',
      assignedReviewer: 'Fatima Al-Kuwari',
    });

    setIsCreateOpen(false);
    setSelectedNearMiss(res);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Near Miss Management</h2>
            <Badge variant="submitted" size="sm">{nearMisses.length} near misses logged</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Capture leading safety indicators, investigate near-hits, and implement preventive controls
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel('QHSE_Near_Miss_Register', 'NearMisses', nearMisses)}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel Export</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Log Near Miss</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Dropped object">Dropped object</option>
            <option value="Unsafe movement">Unsafe movement</option>
            <option value="Equipment malfunction">Equipment malfunction</option>
            <option value="Vehicle near miss">Vehicle near miss</option>
            <option value="Electrical near miss">Electrical near miss</option>
            <option value="Fire or smoke observation">Fire or smoke observation</option>
            <option value="Falling material">Falling material</option>
            <option value="Unsafe work practice">Unsafe work practice</option>
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
            <option value="Reviewed">Reviewed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Near Miss Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Ref #</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Observation Title</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold">Severity</th>
                <th className="py-2.5 px-3 font-semibold">Reporter</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((nm) => (
                <tr
                  key={nm.id}
                  onClick={() => handleOpenDetail(nm)}
                  className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">
                    {nm.reference}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-800">
                    {nm.category}
                  </td>
                  <td className="py-3 px-3 max-w-sm">
                    <div className="font-bold text-gray-900 leading-snug">{nm.title}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{nm.description}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">{nm.location}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={nm.severity === 'Critical' ? 'critical' : nm.severity === 'High' ? 'high' : 'medium'} size="sm">
                      {nm.severity}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">
                    <div>{nm.reportedBy}</div>
                    <span className="text-[10px] text-gray-400 font-mono">{nm.reporterEmployeeId}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={nm.status === 'Closed' ? 'closed' : nm.status === 'Reviewed' ? 'underReview' : 'submitted'} size="sm">
                      {nm.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(nm);
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-blue-700 hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* In-Depth Institutional Enterprise Dossier Modal */}
      {isDetailOpen && selectedNearMiss && (
        <EnterpriseHSEDossierModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          recordType="Near Miss"
          record={selectedNearMiss}
          onStatusChange={(status) => {
            if (status === 'Closed') {
              handleCloseNearMiss();
            } else {
              const updated = { ...selectedNearMiss, status };
              updateNearMiss(updated);
              setSelectedNearMiss(updated);
            }
          }}
          onLaunchInvestigation={() => {
            setActiveDesktopModule('Investigation Management');
            setSelectedRecordRef(selectedNearMiss.reference);
            setIsDetailOpen(false);
          }}
          onAssignCAPA={() => {
            setActiveDesktopModule('Corrective and Preventive Actions');
            setSelectedRecordRef(selectedNearMiss.reference);
            setIsDetailOpen(false);
          }}
        />
      )}

      {/* Log New Near Miss Modal */}
      {isCreateOpen && (
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Log Leading Indicator / Near Miss"
          subtitle="Record near-hit event to prevent future incident occurrence"
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Crane load slewed near workforce scaffold"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as NearMissCategory)}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                >
                  <option value="Dropped object">Dropped object</option>
                  <option value="Unsafe movement">Unsafe movement</option>
                  <option value="Equipment malfunction">Equipment malfunction</option>
                  <option value="Vehicle near miss">Vehicle near miss</option>
                  <option value="Electrical near miss">Electrical near miss</option>
                  <option value="Fire or smoke observation">Fire or smoke observation</option>
                  <option value="Falling material">Falling material</option>
                  <option value="Unsafe work practice">Unsafe work practice</option>
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
              <label className="block text-gray-700 font-bold mb-1">Observation Details *</label>
              <textarea
                required
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="What happened and what prevented injury?"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Potential Consequence</label>
              <input
                type="text"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="e.g. Could have caused dropped object injury"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Immediate Action Taken</label>
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g. Halted crane slew and briefed banksman"
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
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold shadow"
              >
                Save Near Miss
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
