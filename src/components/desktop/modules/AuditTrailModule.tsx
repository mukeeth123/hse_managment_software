import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { History, Search, Filter, Download, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { exportToExcel, exportToCSV } from '../../../utils/exportUtils';

export const AuditTrailModule: React.FC = () => {
  const { auditTrail, addToast } = useHSE();

  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [entityFilter, setEntityFilter] = useState('All');

  const filtered = auditTrail.filter((evt) => {
    if (actionFilter !== 'All' && evt.actionType !== actionFilter) return false;
    if (entityFilter !== 'All' && evt.entityType !== entityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        evt.actorName.toLowerCase().includes(q) ||
        evt.entityRef.toLowerCase().includes(q) ||
        evt.details.toLowerCase().includes(q) ||
        evt.actorRole.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportExcel = () => {
    exportToExcel('QHSE_Audit_Trail_Log', 'AuditLog', filtered);
    addToast('success', 'Audit Export Ready', 'Exported chronological audit trail');
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Compliance Audit Trail & Event Ledger</h2>
            <Badge variant="verified" size="sm">{auditTrail.length} recorded events</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Immutable log of safety submissions, supervisory reviews, CAPA verifications and closure sign-offs
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          className="px-3.5 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Ledger</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search actor, ref or audit details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          />
        </div>

        <div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Action Types</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="REVIEW">REVIEW</option>
            <option value="VERIFY">VERIFY</option>
            <option value="CLOSE">CLOSE</option>
            <option value="REOPEN">REOPEN</option>
          </select>
        </div>

        <div>
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Entities</option>
            <option value="Hazard">Hazard</option>
            <option value="Incident">Incident</option>
            <option value="CAPA">CAPA</option>
            <option value="Permit">Permit</option>
            <option value="Investigation">Investigation</option>
            <option value="Legal">Legal Register</option>
          </select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                <th className="py-2.5 px-3 font-semibold">Actor</th>
                <th className="py-2.5 px-3 font-semibold">Action</th>
                <th className="py-2.5 px-3 font-semibold">Entity Type</th>
                <th className="py-2.5 px-3 font-semibold">Reference</th>
                <th className="py-2.5 px-3 font-semibold">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((evt) => (
                <tr key={evt.id} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-mono text-gray-600 whitespace-nowrap">{evt.timestamp}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{evt.actorName}</div>
                    <span className="text-[10px] text-gray-400">{evt.actorRole}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded border ${
                        evt.actionType === 'CLOSE' || evt.actionType === 'VERIFY'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : evt.actionType === 'CREATE'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {evt.actionType}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-700">{evt.entityType}</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">{evt.entityRef}</td>
                  <td className="py-3 px-3 text-gray-700 max-w-lg leading-relaxed">{evt.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
