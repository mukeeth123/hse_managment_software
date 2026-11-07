import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { FileCheck2, Search, Filter, Plus, Download, CheckCircle2, AlertTriangle, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { PermitRecord, PermitStatus } from '../../../types';
import { exportToExcel, generateHSEPDFReport } from '../../../utils/exportUtils';

export const PermitToWorkModule: React.FC = () => {
  const { permits, updatePermit, createPermit, currentUser, projects, locations, selectedRecordRef, addToast } = useHSE();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedPermit, setSelectedPermit] = useState<PermitRecord | null>(
    selectedRecordRef ? permits.find((p) => p.reference === selectedRecordRef) || null : null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(!!selectedRecordRef);

  const filtered = permits.filter((p) => {
    if (typeFilter !== 'All' && p.permitType !== typeFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.reference.toLowerCase().includes(q) ||
        p.workDescription.toLowerCase().includes(q) ||
        p.applicant.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (p: PermitRecord) => {
    setSelectedPermit(p);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (newStatus: PermitStatus) => {
    if (!selectedPermit) return;
    const updated: PermitRecord = {
      ...selectedPermit,
      status: newStatus,
    };
    updatePermit(updated);
    setSelectedPermit(updated);
    addToast('success', 'Permit Status Updated', `${updated.reference} set to ${newStatus}`);
  };

  const handleExportPDF = (p: PermitRecord) => {
    generateHSEPDFReport(
      `Permit to Work Authorization: ${p.reference}`,
      `${p.permitType} — ${p.project}`,
      [
        {
          title: 'Permit Details & Team',
          lines: [
            `Applicant: ${p.applicant} | Issuer: ${p.issuer} | Approver: ${p.approver}`,
            `Valid Window: ${p.startTime} to ${p.endTime}`,
            `Location: ${p.location} | Performing Team: ${p.performingTeam.join(', ')}`,
            `Status: ${p.status.toUpperCase()}`,
          ],
        },
        {
          title: 'Work Description & Scope',
          lines: [p.workDescription],
        },
        {
          title: 'Mandatory Precautions & Safeguards',
          lines: p.requiredPrecautions,
        },
        {
          title: 'Required Personal Protective Equipment (PPE)',
          lines: p.requiredPPE,
        },
        {
          title: 'Emergency Response Arrangements',
          lines: [p.emergencyArrangements],
        },
        ...(p.gasTestingRequired && p.gasTestingResults
          ? [
              {
                title: 'Atmospheric Gas Testing Records',
                lines: [
                  `Oxygen (O2): ${p.gasTestingResults.o2} (Safe range: 19.5% - 23.5%)`,
                  `Combustible Flammability (LEL): ${p.gasTestingResults.lelL} (Must be < 10%)`,
                  `Hydrogen Sulfide (H2S): ${p.gasTestingResults.h2s} (Must be < 10 ppm)`,
                  `Carbon Monoxide (CO): ${p.gasTestingResults.co} (Must be < 25 ppm)`,
                  `Testing Timestamp: ${p.gasTestingResults.testedAt}`,
                ],
              },
            ]
          : []),
      ]
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Permit to Work (PTW) Governance</h2>
            <Badge variant="verified" size="sm">{permits.length} total permits</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Hot work, confined space, work at height, electrical isolation, excavation & lifting permits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel('QHSE_PTW_Register', 'Permits', permits)}
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
            placeholder="Search ref, description, applicant..."
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
            <option value="All">All Permit Categories</option>
            <option value="Work at height">Work at height</option>
            <option value="Hot work">Hot work</option>
            <option value="Confined space entry">Confined space entry</option>
            <option value="Electrical isolation">Electrical isolation</option>
            <option value="Excavation">Excavation</option>
            <option value="Lifting operations">Lifting operations</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Approved">Approved</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Submitted">Submitted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Permits Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Permit Ref</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Work Scope</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold">Applicant</th>
                <th className="py-2.5 px-3 font-semibold">Valid Window</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((ptw) => (
                <tr
                  key={ptw.id}
                  onClick={() => handleOpenDetail(ptw)}
                  className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">{ptw.reference}</td>
                  <td className="py-3 px-3 font-bold text-gray-900 whitespace-nowrap">{ptw.permitType}</td>
                  <td className="py-3 px-3 max-w-sm">
                    <div className="text-gray-900 leading-snug line-clamp-2">{ptw.workDescription}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">{ptw.location}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">{ptw.applicant}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">
                    <div>{ptw.startTime.substring(0, 10)}</div>
                    <span className="text-[10px] text-gray-400">
                      {ptw.startTime.substring(11)} - {ptw.endTime.substring(11)}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={ptw.status === 'Active' ? 'verified' : ptw.status === 'Closed' ? 'closed' : 'underReview'} size="sm">
                      {ptw.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(ptw);
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#073B2F] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      Authorize
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permit Detail Modal */}
      {isDetailOpen && selectedPermit && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Permit to Work: ${selectedPermit.reference}`}
          subtitle={`${selectedPermit.permitType} — ${selectedPermit.location}`}
          maxWidth="4xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Badge variant={selectedPermit.status === 'Active' ? 'verified' : 'neutral'}>
                  {selectedPermit.status}
                </Badge>
                <span className="font-bold text-gray-900">{selectedPermit.permitType}</span>
                <span className="text-gray-500 font-mono">
                  {selectedPermit.startTime} to {selectedPermit.endTime}
                </span>
              </div>

              <button
                onClick={() => handleExportPDF(selectedPermit)}
                className="px-3 py-1 bg-[#073B2F] hover:bg-[#092B24] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Permit PDF</span>
              </button>
            </div>

            <div className="bg-[#F4F7F5] p-3 rounded-xl border border-[#E3EAE6] space-y-1">
              <h4 className="font-bold text-gray-900 text-xs">Permitted Work Scope:</h4>
              <p className="text-gray-700 leading-relaxed text-[11px]">{selectedPermit.workDescription}</p>
              <div className="text-[10px] text-gray-500 pt-1">
                Applicant: <strong>{selectedPermit.applicant}</strong> • Performing Team: <strong>{selectedPermit.performingTeam.join(', ')}</strong>
              </div>
            </div>

            {/* Precautions & PPE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
                <h5 className="font-bold text-gray-900 text-xs">Required Safety Precautions:</h5>
                <ul className="space-y-1 text-[11px] text-gray-700">
                  {selectedPermit.requiredPrecautions.map((p, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
                <h5 className="font-bold text-gray-900 text-xs">Mandatory PPE:</h5>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedPermit.requiredPPE.map((ppe, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 rounded font-semibold text-[10px]">
                      🛡️ {ppe}
                    </span>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-gray-600">
                  <strong>Emergency Arrangement:</strong> {selectedPermit.emergencyArrangements}
                </div>
              </div>
            </div>

            {/* Atmospheric Gas Testing if applicable */}
            {selectedPermit.gasTestingRequired && selectedPermit.gasTestingResults && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <h5 className="font-bold text-blue-900 text-xs">Atmospheric Gas Testing Results:</h5>
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono font-bold mt-1">
                  <div className="p-1.5 bg-white rounded border border-blue-200 text-blue-900">
                    O2: {selectedPermit.gasTestingResults.o2}
                  </div>
                  <div className="p-1.5 bg-white rounded border border-blue-200 text-blue-900">
                    LEL: {selectedPermit.gasTestingResults.lelL}
                  </div>
                  <div className="p-1.5 bg-white rounded border border-blue-200 text-blue-900">
                    H2S: {selectedPermit.gasTestingResults.h2s}
                  </div>
                  <div className="p-1.5 bg-white rounded border border-blue-200 text-blue-900">
                    CO: {selectedPermit.gasTestingResults.co}
                  </div>
                </div>
              </div>
            )}

            {/* Lifecycle Triggers */}
            <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
              <h5 className="font-bold text-gray-900">Permit Workflow Authority:</h5>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus('Approved')}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-sm"
                >
                  Approve Permit (Issuer)
                </button>
                <button
                  onClick={() => handleUpdateStatus('Active')}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Activate & Handover to Team</span>
                </button>
                <button
                  onClick={() => handleUpdateStatus('Closed')}
                  className="px-3 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-bold rounded-lg shadow"
                >
                  Close & De-isolate Permit
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
