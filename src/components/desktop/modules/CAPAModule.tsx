import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import {
  CheckSquare,
  Search,
  Filter,
  Plus,
  Download,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Upload,
  MessageSquare,
  ArrowRight,
  Kanban,
  Table as TableIcon,
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { CAPARecord, CAPAStatus, SeverityLevel } from '../../../types';
import { exportToExcel } from '../../../utils/exportUtils';
import { IMAGE_CAPA_RECTIFIED } from '../../../data/imageAssets';

export const CAPAModule: React.FC = () => {
  const { capas, updateCAPA, createCAPA, currentUser, users, selectedRecordRef, setSelectedRecordRef, addToast } = useHSE();

  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban');

  // Detail Modal
  const [selectedCapa, setSelectedCapa] = useState<CAPARecord | null>(
    selectedRecordRef ? capas.find((c) => c.reference === selectedRecordRef || c.linkedRef === selectedRecordRef) || null : null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(!!selectedRecordRef);
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [newComment, setNewComment] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  // Create Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [actionDesc, setActionDesc] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [linkedRef, setLinkedRef] = useState('HAZ-2026-0042');
  const [ownerId, setOwnerId] = useState(users[0]?.id || 'USR-036');
  const [priority, setPriority] = useState<SeverityLevel>('High');
  const [dueDate, setDueDate] = useState('2026-11-20');

  const todayStr = '2026-11-07';

  const filtered = capas.filter((c) => {
    if (priorityFilter !== 'All' && c.priority !== priorityFilter) return false;
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.reference.toLowerCase().includes(q) ||
        c.linkedRef.toLowerCase().includes(q) ||
        c.actionDescription.toLowerCase().includes(q) ||
        c.actionOwner.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (c: CAPARecord) => {
    setSelectedCapa(c);
    setEvidenceNotes(c.evidenceNotes || '');
    setIsDetailOpen(true);
    setSelectedRecordRef(c.reference);
    setShowRejectBox(false);
  };

  const handleUpdateStatus = (newStatus: CAPAStatus, isVerified = false, isRejected = false) => {
    if (!selectedCapa) return;
    const updated: CAPARecord = {
      ...selectedCapa,
      status: newStatus,
      progressPercentage: newStatus === 'Submitted for Verification' || newStatus === 'Verified' || newStatus === 'Closed' ? 100 : selectedCapa.progressPercentage,
      evidenceNotes: evidenceNotes || selectedCapa.evidenceNotes,
      verificationResult: isVerified ? 'Approved' : isRejected ? 'Rejected' : selectedCapa.verificationResult,
      rejectionReason: isRejected ? rejectionReason : selectedCapa.rejectionReason,
      closureDate: newStatus === 'Closed' ? todayStr : selectedCapa.closureDate,
      closedBy: newStatus === 'Closed' ? currentUser.name : selectedCapa.closedBy,
    };
    updateCAPA(updated);
    setSelectedCapa(updated);
    setShowRejectBox(false);
  };

  const handleAddComment = () => {
    if (!selectedCapa || !newComment.trim()) return;
    const updated: CAPARecord = {
      ...selectedCapa,
      comments: [
        ...selectedCapa.comments,
        {
          user: currentUser.name,
          text: newComment,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        },
      ],
    };
    updateCAPA(updated);
    setSelectedCapa(updated);
    setNewComment('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionDesc.trim()) return;
    const assignedUser = users.find((u) => u.id === ownerId) || users[0];

    const res = createCAPA({
      linkedRef,
      actionDescription: actionDesc,
      rootCauseAddressed: rootCause || 'Preventive safety control implementation',
      actionOwner: assignedUser.name,
      actionOwnerId: assignedUser.id,
      priority,
      dueDate,
      status: 'Assigned',
      progressPercentage: 0,
      verifier: 'Khalid Al-Nuaimi',
    });

    setIsCreateOpen(false);
    setSelectedCapa(res);
    setIsDetailOpen(true);
  };

  const kanbanColumns: CAPAStatus[] = [
    'Open',
    'Assigned',
    'In Progress',
    'Submitted for Verification',
    'Verified',
    'Closed',
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Corrective & Preventive Actions (CAPA)</h2>
            <Badge variant="actionPending" size="sm">{capas.length} active actions</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Full lifecycle tracker: Assigned → In Progress → Submitted → Verified → Closed
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-[#F4F7F5] p-1 rounded-lg border border-[#E3EAE6]">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded flex items-center gap-1 font-semibold ${
                viewMode === 'kanban' ? 'bg-white shadow text-[#073B2F]' : 'text-gray-500'
              }`}
              title="Kanban Board View"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded flex items-center gap-1 font-semibold ${
                viewMode === 'table' ? 'bg-white shadow text-[#073B2F]' : 'text-gray-500'
              }`}
              title="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => exportToExcel('QHSE_CAPA_Tracker', 'CAPAs', capas)}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Assign New CAPA</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ref, linked case, owner or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          />
        </div>

        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Priorities</option>
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
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Submitted for Verification">Submitted for Verification</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {kanbanColumns.map((col) => {
            const colItems = filtered.filter((c) => c.status === col);
            return (
              <div key={col} className="bg-[#F4F7F5] p-2.5 rounded-xl border border-[#E3EAE6] flex flex-col min-h-[500px]">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
                  <span className="font-bold text-[11px] text-gray-800 uppercase tracking-wider truncate">
                    {col === 'Submitted for Verification' ? 'Under Verif.' : col}
                  </span>
                  <span className="text-[10px] font-bold bg-white text-gray-700 px-1.5 py-0.2 rounded-full border">
                    {colItems.length}
                  </span>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto">
                  {colItems.map((c) => {
                    const isOverdue = c.status !== 'Closed' && c.dueDate < todayStr;
                    return (
                      <div
                        key={c.id}
                        onClick={() => handleOpenDetail(c)}
                        className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs hover:border-[#087F5B] cursor-pointer transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[10px] text-[#073B2F]">{c.reference}</span>
                          <Badge variant={c.priority === 'High' ? 'high' : 'medium'} size="sm">
                            {c.priority}
                          </Badge>
                        </div>

                        <p className="font-semibold text-gray-900 text-[11px] line-clamp-2 leading-snug">
                          {c.actionDescription}
                        </p>

                        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                          <div
                            className="bg-[#087F5B] h-1 rounded-full"
                            style={{ width: `${c.progressPercentage}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-100">
                          <span className="truncate">👤 {c.actionOwner.split(' ')[0]}</span>
                          <span className={isOverdue ? 'text-red-600 font-bold' : ''}>
                            {c.dueDate.substring(5)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Ref</th>
                  <th className="py-2.5 px-3 font-semibold">Linked Case</th>
                  <th className="py-2.5 px-3 font-semibold">Action Description</th>
                  <th className="py-2.5 px-3 font-semibold">Owner</th>
                  <th className="py-2.5 px-3 font-semibold">Due Date</th>
                  <th className="py-2.5 px-3 font-semibold">Progress</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAE6]">
                {filtered.map((c) => {
                  const isOverdue = c.status !== 'Closed' && c.dueDate < todayStr;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => handleOpenDetail(c)}
                      className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">{c.reference}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#087F5B] whitespace-nowrap">{c.linkedRef}</td>
                      <td className="py-3 px-3 max-w-sm">
                        <div className="font-bold text-gray-900 leading-snug">{c.actionDescription}</div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">{c.rootCauseAddressed}</div>
                      </td>
                      <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{c.actionOwner}</td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={isOverdue ? 'text-red-600 font-bold' : 'text-gray-600'}>
                          {c.dueDate} {isOverdue && '(Overdue)'}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[#087F5B] h-1.5 rounded-full" style={{ width: `${c.progressPercentage}%` }}></div>
                          </div>
                          <span className="font-semibold text-gray-700">{c.progressPercentage}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <Badge variant={c.status === 'Closed' ? 'closed' : c.status === 'Verified' ? 'verified' : 'actionPending'} size="sm">
                          {c.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(c);
                          }}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-[#087F5B] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail & Lifecycle Modal */}
      {isDetailOpen && selectedCapa && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`CAPA Action Tracker: ${selectedCapa.reference}`}
          subtitle={`Linked to ${selectedCapa.linkedRef} • Verifier: ${selectedCapa.verifier}`}
          maxWidth="4xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Badge variant={selectedCapa.status === 'Closed' ? 'closed' : 'actionPending'}>
                  {selectedCapa.status}
                </Badge>
                <Badge variant={selectedCapa.priority === 'High' ? 'high' : 'medium'}>
                  {selectedCapa.priority} Priority
                </Badge>
                <span className="text-gray-500 font-mono">Due: {selectedCapa.dueDate}</span>
              </div>
              <div className="font-semibold text-gray-700">
                Action Owner: <strong>{selectedCapa.actionOwner}</strong>
              </div>
            </div>

            <div className="bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6] space-y-1.5">
              <h4 className="font-bold text-gray-900 text-sm">{selectedCapa.actionDescription}</h4>
              <p className="text-gray-600 text-[11px]">
                <strong>Root Cause Addressed:</strong> {selectedCapa.rootCauseAddressed}
              </p>
            </div>

            {/* Evidence Section */}
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl space-y-2.5">
              <h5 className="font-bold text-gray-900 flex items-center justify-between">
                <span>Verification Evidence & Physical Proof</span>
                <span className="font-mono text-[#087F5B] text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {selectedCapa.evidenceAttachment || 'CAPA-2026-0095-PROOF.jpg'}
                </span>
              </h5>

              {/* Physical Rectification Evidence Photo */}
              <div className="rounded-xl overflow-hidden border border-gray-300 relative shadow-sm max-w-md bg-slate-900">
                <img
                  src={IMAGE_CAPA_RECTIFIED}
                  alt="Rectification verification proof"
                  className="w-full h-44 object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                  📷 VERIFIED BOLTED MESH • TORQUE TESTED 120Nm
                </span>
              </div>

              <textarea
                rows={2}
                value={evidenceNotes}
                onChange={(e) => setEvidenceNotes(e.target.value)}
                placeholder="Describe completed work, test certificate references, installation dates..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none text-xs"
              />
            </div>

            {/* Workflow Action Transitions */}
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
              <h5 className="font-bold text-emerald-950">Lifecycle Action Triggers:</h5>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus('In Progress')}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm"
                >
                  Mark In Progress
                </button>

                <button
                  onClick={() => handleUpdateStatus('Submitted for Verification')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit Evidence for Verification</span>
                </button>

                <button
                  onClick={() => handleUpdateStatus('Verified', true)}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify & Approve (CAPA Verifier)</span>
                </button>

                <button
                  onClick={() => setShowRejectBox(!showRejectBox)}
                  className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 font-semibold rounded-lg border border-red-300 flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject with Reason</span>
                </button>

                <button
                  onClick={() => handleUpdateStatus('Closed')}
                  className="px-3 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-bold rounded-lg shadow flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Close CAPA</span>
                </button>
              </div>

              {showRejectBox && (
                <div className="mt-2 p-2 bg-white border border-red-300 rounded-lg space-y-2 animate-in fade-in">
                  <label className="block text-red-900 font-bold text-[11px]">Reason for Verification Rejection:</label>
                  <input
                    type="text"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g. Guardrail height does not meet Qatar QCS 2014 1.0m requirement..."
                    className="w-full px-2.5 py-1.5 bg-red-50/50 border border-red-300 rounded text-xs outline-none"
                  />
                  <button
                    onClick={() => handleUpdateStatus('In Progress', false, true)}
                    className="px-3 py-1 bg-red-700 text-white font-bold rounded text-xs"
                  >
                    Confirm Rejection
                  </button>
                </div>
              )}
            </div>

            {/* Comments Thread */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <h5 className="font-bold text-gray-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Action History & Comments ({selectedCapa.comments.length})</span>
              </h5>

              <div className="max-h-32 overflow-y-auto space-y-1.5 bg-gray-50 p-2 rounded-lg border border-gray-200">
                {selectedCapa.comments.length === 0 ? (
                  <p className="text-gray-400 italic text-[11px]">No comments recorded yet.</p>
                ) : (
                  selectedCapa.comments.map((cm, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border border-gray-200">
                      <div className="flex justify-between font-bold text-gray-800 text-[10px]">
                        <span>{cm.user}</span>
                        <span className="text-gray-400">{cm.date}</span>
                      </div>
                      <p className="text-gray-700 text-[11px] mt-0.5">{cm.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add comment or progress update..."
                  className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  className="px-3 py-1.5 bg-[#073B2F] text-white font-bold rounded-lg"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Assign New CAPA Modal */}
      {isCreateOpen && (
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Assign Corrective / Preventive Action"
          subtitle="Mandate verified engineering or procedural control"
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Action Description *</label>
              <textarea
                required
                rows={2}
                value={actionDesc}
                onChange={(e) => setActionDesc(e.target.value)}
                placeholder="Specific action required, e.g. Fabricate and install permanent safety mesh grates..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Root Cause Addressed</label>
              <input
                type="text"
                value={rootCause}
                onChange={(e) => setRootCause(e.target.value)}
                placeholder="e.g. Absence of physical fall-through barrier"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Linked Hazard / Incident Ref</label>
                <input
                  type="text"
                  value={linkedRef}
                  onChange={(e) => setLinkedRef(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as SeverityLevel)}
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
                <label className="block text-gray-700 font-bold mb-1">Assign Action Owner</label>
                <select
                  value={ownerId}
                  onChange={(e) => setOwnerId(e.target.value)}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Target Completion Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                />
              </div>
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
                Assign CAPA
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
