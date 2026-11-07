import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { ClipboardList, Search, Filter, Plus, Download, CheckCircle2, XCircle, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { InspectionRecord, InspectionChecklistItem } from '../../../types';
import { exportToExcel, generateHSEPDFReport } from '../../../utils/exportUtils';

export const InspectionsModule: React.FC = () => {
  const { inspections, updateInspection, currentUser, projects, locations, addToast } = useHSE();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedInspection, setSelectedInspection] = useState<InspectionRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filtered = inspections.filter((ins) => {
    if (typeFilter !== 'All' && ins.type !== typeFilter) return false;
    if (statusFilter !== 'All' && ins.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ins.reference.toLowerCase().includes(q) ||
        ins.title.toLowerCase().includes(q) ||
        ins.location.toLowerCase().includes(q) ||
        ins.inspector.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (ins: InspectionRecord) => {
    setSelectedInspection(ins);
    setIsDetailOpen(true);
  };

  const handleToggleItemStatus = (itemId: string, newStatus: 'Pass' | 'Fail' | 'N/A') => {
    if (!selectedInspection) return;
    const updatedItems = selectedInspection.items.map((item) =>
      item.id === itemId ? { ...item, status: newStatus } : item
    );
    const passCount = updatedItems.filter((i) => i.status === 'Pass').length;
    const activeCount = updatedItems.filter((i) => i.status !== 'N/A').length;
    const scorePercentage = activeCount > 0 ? Math.round((passCount / activeCount) * 100) : 100;

    const updated: InspectionRecord = {
      ...selectedInspection,
      items: updatedItems,
      scorePercentage,
      status: scorePercentage < 80 ? 'Requires CAPA' : 'Completed',
    };
    updateInspection(updated);
    setSelectedInspection(updated);
  };

  const handleExportPDF = (ins: InspectionRecord) => {
    generateHSEPDFReport(
      `Site Inspection Report: ${ins.reference}`,
      `${ins.title} — ${ins.project}`,
      [
        {
          title: 'Audit Metadata',
          lines: [
            `Inspector: ${ins.inspector} | Date: ${ins.inspectionDate}`,
            `Location: ${ins.location} | Overall Compliance Score: ${ins.scorePercentage}%`,
            `Status: ${ins.status.toUpperCase()}`,
          ],
        },
        {
          title: 'Executive Summary',
          lines: [ins.summary],
        },
        {
          title: 'Checklist Findings',
          lines: ins.items.map(
            (i) => `[${i.status.toUpperCase()}] ${i.category}: ${i.question} ${i.comment ? `(Notes: ${i.comment})` : ''}`
          ),
        },
      ]
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Inspections & Safety Audits</h2>
            <Badge variant="closed" size="sm">{inspections.length} recorded audits</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Pre-commissioning checklists, Qatar MD 17/2021 heat audits, scaffolding tags, electrical and plant reviews
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel('QHSE_Inspections_Register', 'Inspections', inspections)}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel Export</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ref, title, inspector..."
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
            <option value="All">All Inspection Types</option>
            <option value="Heat stress inspection">Heat stress inspection (Qatar MD 17/2021)</option>
            <option value="Fire safety inspection">Fire safety inspection</option>
            <option value="Scaffolding inspection">Scaffolding inspection</option>
            <option value="Electrical inspection">Electrical inspection</option>
            <option value="General site inspection">General site inspection</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Requires CAPA">Requires CAPA</option>
            <option value="In Progress">In Progress</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Ref #</th>
                <th className="py-2.5 px-3 font-semibold">Inspection Title</th>
                <th className="py-2.5 px-3 font-semibold">Type</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold">Inspector</th>
                <th className="py-2.5 px-3 font-semibold">Date</th>
                <th className="py-2.5 px-3 font-semibold">Score</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((ins) => (
                <tr
                  key={ins.id}
                  onClick={() => handleOpenDetail(ins)}
                  className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">{ins.reference}</td>
                  <td className="py-3 px-3 max-w-sm">
                    <div className="font-bold text-gray-900 leading-snug">{ins.title}</div>
                    <div className="text-[11px] text-gray-500 line-clamp-1">{ins.summary}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">{ins.type}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">{ins.location}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">{ins.inspector}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">{ins.inspectionDate}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-xs ${
                        ins.scorePercentage >= 90
                          ? 'bg-emerald-100 text-emerald-800'
                          : ins.scorePercentage >= 80
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {ins.scorePercentage}%
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={ins.status === 'Completed' ? 'closed' : 'high'} size="sm">
                      {ins.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(ins);
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#087F5B] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checklist Audit Modal */}
      {isDetailOpen && selectedInspection && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Inspection Checklist: ${selectedInspection.reference}`}
          subtitle={`${selectedInspection.title} (${selectedInspection.type})`}
          maxWidth="4xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Badge variant={selectedInspection.status === 'Completed' ? 'closed' : 'high'}>
                  {selectedInspection.status}
                </Badge>
                <span className="font-bold text-sm text-[#073B2F]">
                  Compliance Score: {selectedInspection.scorePercentage}%
                </span>
                <span className="text-gray-500 font-mono">
                  Inspector: {selectedInspection.inspector} ({selectedInspection.inspectionDate})
                </span>
              </div>

              <button
                onClick={() => handleExportPDF(selectedInspection)}
                className="px-3 py-1 bg-[#073B2F] hover:bg-[#092B24] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Inspection PDF</span>
              </button>
            </div>

            <div className="bg-[#F4F7F5] p-3 rounded-xl border border-[#E3EAE6]">
              <span className="font-bold text-gray-900 block mb-0.5">Auditor Summary:</span>
              <p className="text-gray-700 leading-relaxed text-[11px]">{selectedInspection.summary}</p>
            </div>

            {/* Checklist items with Pass / Fail / NA toggles */}
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900">Configurable Verification Checkpoints:</h5>
              <div className="space-y-2">
                {selectedInspection.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] text-gray-400 font-bold">{item.id}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.2 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 text-xs">{item.question}</p>
                      {item.comment && (
                        <p className="text-[11px] text-gray-500 italic mt-0.5">Note: {item.comment}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleToggleItemStatus(item.id, 'Pass')}
                        className={`px-3 py-1 rounded font-bold text-xs transition-colors ${
                          item.status === 'Pass'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => handleToggleItemStatus(item.id, 'Fail')}
                        className={`px-3 py-1 rounded font-bold text-xs transition-colors ${
                          item.status === 'Fail'
                            ? 'bg-red-600 text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Fail
                      </button>
                      <button
                        onClick={() => handleToggleItemStatus(item.id, 'N/A')}
                        className={`px-3 py-1 rounded font-bold text-xs transition-colors ${
                          item.status === 'N/A'
                            ? 'bg-slate-700 text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        N/A
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-gray-500 text-[11px]">
              <span>Sign-off: <strong>{selectedInspection.signOffBy || 'Pending HSE Approval'}</strong></span>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
