import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import {
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  Download,
  Calendar,
  UserCheck,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Camera,
  ZoomIn,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { PhotoViewerModal } from '../../common/PhotoViewerModal';
import { HazardRecord, HazardCategory, SeverityLevel, HazardStatus } from '../../../types';
import { exportToExcel, exportToCSV } from '../../../utils/exportUtils';
import { getSafeImageUrl, getFallbackHazardImage } from '../../../data/imageAssets';

export const HazardReportingModule: React.FC = () => {
  const {
    hazards,
    updateHazard,
    createHazard,
    currentUser,
    projects,
    locations,
    selectedRecordRef,
    setSelectedRecordRef,
    setActiveDesktopModule,
    addToast,
  } = useHSE();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Detail Modal
  const [selectedHazard, setSelectedHazard] = useState<HazardRecord | null>(
    selectedRecordRef ? hazards.find((h) => h.reference === selectedRecordRef) || null : null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(!!selectedRecordRef);

  // New Hazard Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<HazardCategory>('Work at height');
  const [newSeverity, setNewSeverity] = useState<SeverityLevel>('High');
  const [newLocation, setNewLocation] = useState('Work Area A');
  const [newProject, setNewProject] = useState(projects[0]);
  const [newDesc, setNewDesc] = useState('');
  const [newPotential, setNewPotential] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [newCaption, setNewCaption] = useState('');

  // Full-screen photo viewer state
  const [photoViewerState, setPhotoViewerState] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    caption?: string;
    location?: string;
    reference?: string;
  }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const filtered = hazards.filter((h) => {
    if (categoryFilter !== 'All' && h.category !== categoryFilter) return false;
    if (severityFilter !== 'All' && h.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && h.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        h.reference.toLowerCase().includes(q) ||
        h.title.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.reportedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (h: HazardRecord) => {
    setSelectedHazard(h);
    setIsDetailOpen(true);
    setSelectedRecordRef(h.reference);
  };

  const handleUpdateStatus = (newStatus: HazardStatus) => {
    if (!selectedHazard) return;
    const updated: HazardRecord = {
      ...selectedHazard,
      status: newStatus,
      closedAt: newStatus === 'Closed' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined,
      closedBy: newStatus === 'Closed' ? currentUser.name : undefined,
    };
    updateHazard(updated);
    setSelectedHazard(updated);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const res = createHazard({
      title: newTitle,
      category: newCategory,
      project: newProject,
      location: newLocation,
      reportedBy: currentUser.name,
      reporterEmployeeId: currentUser.employeeId,
      severity: newSeverity,
      potentialConsequence: newPotential || 'Safety hazard identified during walkthrough',
      immediateAction: newAction || 'Barricaded zone and notified supervisor',
      status: 'Submitted',
      description: newDesc,
      assignedSupervisor: 'Tariq Al-Mansoor',
    });

    setIsCreateOpen(false);
    setSelectedHazard(res);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Hazard Reporting & Management</h2>
            <Badge variant="high" size="sm">{hazards.length} total hazards</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Identify, classify, investigate and eliminate workplace hazards before incidents occur
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel('QHSE_Hazard_Register', 'Hazards', hazards)}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel Export</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Hazard</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ref, title, location, reporter..."
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
            <option value="Work at height">Work at height</option>
            <option value="Slips, trips and falls">Slips, trips and falls</option>
            <option value="Electrical hazards">Electrical hazards</option>
            <option value="Fire hazards">Fire hazards</option>
            <option value="Chemical exposure">Chemical exposure</option>
            <option value="Excavation">Excavation</option>
            <option value="Confined space">Confined space</option>
            <option value="Heat stress">Heat stress</option>
            <option value="Unsafe machinery">Unsafe machinery</option>
            <option value="Lifting operations">Lifting operations</option>
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
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Investigation">Investigation</option>
            <option value="Action Pending">Action Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Hazard Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Ref #</th>
                <th className="py-2.5 px-3 font-semibold">Title & Description</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold">Severity</th>
                <th className="py-2.5 px-3 font-semibold">Reporter</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((h) => {
                const isSelected = selectedHazard?.id === h.id;
                return (
                  <tr
                    key={h.id}
                    onClick={() => handleOpenDetail(h)}
                    className={`hover:bg-gray-50/80 cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/50' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span>{h.reference}</span>
                        {h.imageUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPhotoViewerState({
                                isOpen: true,
                                url: h.imageUrl!,
                                title: h.title,
                                caption: h.imageCaption,
                                location: h.location,
                                reference: h.reference,
                              });
                            }}
                            className="p-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] flex items-center gap-0.5"
                            title="Inspect field photo evidence"
                          >
                            📷
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 max-w-sm">
                      <div className="font-bold text-gray-900 leading-snug">{h.title}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{h.description}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-700">{h.category}</td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-600">
                      <div>{h.location}</div>
                      <span className="text-[10px] text-gray-400">{h.project}</span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge
                        variant={
                          h.severity === 'Critical'
                            ? 'critical'
                            : h.severity === 'High'
                            ? 'high'
                            : h.severity === 'Medium'
                            ? 'medium'
                            : 'low'
                        }
                        size="sm"
                      >
                        {h.severity}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-700">
                      <div>{h.reportedBy}</div>
                      <span className="text-[10px] font-mono text-gray-400">{h.reporterEmployeeId}</span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge
                        variant={
                          h.status === 'Closed'
                            ? 'closed'
                            : h.status === 'Investigation'
                            ? 'investigation'
                            : h.status === 'Submitted'
                            ? 'submitted'
                            : 'underReview'
                        }
                        size="sm"
                      >
                        {h.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(h);
                        }}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-[#087F5B] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Hazard Detail Modal */}
      {isDetailOpen && selectedHazard && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Hazard Detail: ${selectedHazard.reference}`}
          subtitle={`${selectedHazard.title} — ${selectedHazard.project}`}
          maxWidth="4xl"
        >
          <div className="space-y-4 text-xs">
            {/* Top metadata cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] text-gray-500 block">Status</span>
                <Badge
                  variant={
                    selectedHazard.status === 'Closed'
                      ? 'closed'
                      : selectedHazard.status === 'Investigation'
                      ? 'investigation'
                      : 'underReview'
                  }
                >
                  {selectedHazard.status}
                </Badge>
              </div>

              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] text-gray-500 block">Risk Severity</span>
                <Badge variant={selectedHazard.severity === 'High' ? 'high' : 'medium'}>
                  {selectedHazard.severity}
                </Badge>
              </div>

              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] text-gray-500 block">Location</span>
                <span className="font-bold text-gray-900">{selectedHazard.location}</span>
              </div>

              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] text-gray-500 block">Reported By</span>
                <span className="font-bold text-gray-900">{selectedHazard.reportedBy} ({selectedHazard.reporterEmployeeId})</span>
              </div>
            </div>

            {/* Description & Image */}
            <div className="bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6] space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">{selectedHazard.title}</h4>
              <p className="text-gray-700 leading-relaxed">{selectedHazard.description}</p>

              {selectedHazard.imageUrl && (
                <div className="mt-3">
                  <div className="relative rounded-xl overflow-hidden border border-gray-300 max-w-md group bg-slate-900 shadow-sm">
                    <img
                      src={getSafeImageUrl(selectedHazard.imageUrl, selectedHazard.category)}
                      alt="Hazard evidence"
                      className="w-full h-48 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackHazardImage(selectedHazard.category);
                      }}
                      onClick={() =>
                        setPhotoViewerState({
                          isOpen: true,
                          url: getSafeImageUrl(selectedHazard.imageUrl, selectedHazard.category),
                          title: selectedHazard.title,
                          caption: selectedHazard.imageCaption,
                          location: selectedHazard.location,
                          reference: selectedHazard.reference,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPhotoViewerState({
                          isOpen: true,
                          url: getSafeImageUrl(selectedHazard.imageUrl, selectedHazard.category),
                          title: selectedHazard.title,
                          caption: selectedHazard.imageCaption,
                          location: selectedHazard.location,
                          reference: selectedHazard.reference,
                        })
                      }
                      className="absolute top-2 right-2 px-2.5 py-1 bg-black/75 hover:bg-black text-white text-[11px] font-semibold rounded-md backdrop-blur-sm flex items-center gap-1 shadow"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Inspect Photo</span>
                    </button>
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                      {selectedHazard.imageCaption || 'Field evidence photo'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Potential Consequence & Immediate Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-red-50/60 border border-red-200 rounded-xl">
                <span className="font-bold text-red-900 block mb-1">Potential Consequence:</span>
                <p className="text-red-800 text-[11px] leading-relaxed">{selectedHazard.potentialConsequence}</p>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <span className="font-bold text-emerald-900 block mb-1">Immediate Action Taken:</span>
                <p className="text-emerald-800 text-[11px] leading-relaxed">{selectedHazard.immediateAction}</p>
              </div>
            </div>

            {/* Workflow Action Transitions */}
            <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
              <h5 className="font-bold text-gray-900">Workflow Transitions & RBAC Assignment:</h5>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus('Under Review')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Mark Under Review
                </button>

                <button
                  onClick={() => {
                    handleUpdateStatus('Investigation');
                    setActiveDesktopModule('Investigation Management');
                    setSelectedRecordRef(selectedHazard.reference);
                    setIsDetailOpen(false);
                  }}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <span>Open Investigation (5-Whys)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    handleUpdateStatus('Action Pending');
                    setActiveDesktopModule('Corrective and Preventive Actions');
                    setSelectedRecordRef(selectedHazard.reference);
                    setIsDetailOpen(false);
                  }}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <span>Assign CAPA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleUpdateStatus('Closed')}
                  className="px-3 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify & Close Case</span>
                </button>
              </div>
            </div>

            {selectedHazard.closedAt && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px]">
                Case closed on <strong>{selectedHazard.closedAt}</strong> by <strong>{selectedHazard.closedBy}</strong>. Notes: {selectedHazard.closureNotes || 'Mitigated.'}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Create New Hazard Modal */}
      {isCreateOpen && (
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Log New HSE Hazard"
          subtitle="Direct desktop hazard entry with automatic audit logging"
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Hazard Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Broken ladder stile or missing barricade"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as HazardCategory)}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                >
                  <option value="Work at height">Work at height</option>
                  <option value="Slips, trips and falls">Slips, trips and falls</option>
                  <option value="Electrical hazards">Electrical hazards</option>
                  <option value="Fire hazards">Fire hazards</option>
                  <option value="Chemical exposure">Chemical exposure</option>
                  <option value="Excavation">Excavation</option>
                  <option value="Heat stress">Heat stress</option>
                  <option value="Poor housekeeping">Poor housekeeping</option>
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
              <label className="block text-gray-700 font-bold mb-1">Description *</label>
              <textarea
                required
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Observed conditions, dimensions, missing controls..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Potential Consequence</label>
              <input
                type="text"
                value={newPotential}
                onChange={(e) => setNewPotential(e.target.value)}
                placeholder="e.g. Fall from height leading to severe trauma"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Immediate Action Taken</label>
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g. Placed barricade tape and stopped work"
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
                className="px-4 py-2 bg-[#087F5B] hover:bg-[#073B2F] text-white rounded-lg font-bold shadow"
              >
                Save & Submit Hazard
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Full Photo Viewer Modal */}
      {photoViewerState.isOpen && (
        <PhotoViewerModal
          isOpen={photoViewerState.isOpen}
          onClose={() => setPhotoViewerState((prev) => ({ ...prev, isOpen: false }))}
          imageUrl={photoViewerState.url}
          title={photoViewerState.title}
          caption={photoViewerState.caption}
          location={photoViewerState.location}
          reference={photoViewerState.reference}
        />
      )}
    </div>
  );
};
