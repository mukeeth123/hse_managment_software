import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { GraduationCap, Search, Filter, Download, Award, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { exportToExcel } from '../../../utils/exportUtils';

export const TrainingModule: React.FC = () => {
  const { trainingCourses, trainingRecords, users } = useHSE();

  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'matrix' | 'courses'>('matrix');

  const filteredRecords = trainingRecords.filter((tr) => {
    if (courseFilter !== 'All' && tr.courseCode !== courseFilter) return false;
    if (statusFilter !== 'All' && tr.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        tr.employeeName.toLowerCase().includes(q) ||
        tr.employeeId.toLowerCase().includes(q) ||
        tr.courseTitle.toLowerCase().includes(q) ||
        tr.certificateRef.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const validCount = trainingRecords.filter((t) => t.status === 'Valid').length;
  const expiringCount = trainingRecords.filter((t) => t.status === 'Expiring Soon').length;
  const expiredCount = trainingRecords.filter((t) => t.status === 'Expired').length;
  const compliancePct = Math.round((validCount / trainingRecords.length) * 100);

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Training & Workforce Competency</h2>
            <Badge variant="closed" size="sm">{compliancePct}% Compliant</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Qatar Labour Law Art. 102 & MD 17/2021 training compliance tracker and statutory certifications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel('QHSE_Training_Competency_Matrix', 'TrainingMatrix', trainingRecords)}
            className="px-3 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Training Matrix (Excel)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">Total Certified Personnel</span>
          <span className="text-2xl font-extrabold text-gray-900">{trainingRecords.length}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">Active & Valid</span>
          <span className="text-2xl font-extrabold text-emerald-600">{validCount}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">Expiring Within 30 Days</span>
          <span className="text-2xl font-extrabold text-amber-500">{expiringCount}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">Courses in Catalogue</span>
          <span className="text-2xl font-extrabold text-[#073B2F]">{trainingCourses.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3EAE6] bg-white px-4 rounded-t-xl gap-2 font-bold">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'matrix' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Workforce Competency Records ({filteredRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'courses' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Standard HSE Course Catalogue ({trainingCourses.length})</span>
        </button>
      </div>

      {activeTab === 'matrix' ? (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-3">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employee, ID, or cert #..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
              />
            </div>

            <div>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
              >
                <option value="All">All Course Topics</option>
                {trainingCourses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Valid">Valid</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Employee ID</th>
                  <th className="py-2.5 px-3 font-semibold">Employee Name</th>
                  <th className="py-2.5 px-3 font-semibold">Course Title</th>
                  <th className="py-2.5 px-3 font-semibold">Accredited Provider</th>
                  <th className="py-2.5 px-3 font-semibold">Completed</th>
                  <th className="py-2.5 px-3 font-semibold">Expiry Date</th>
                  <th className="py-2.5 px-3 font-semibold">Certificate Ref</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAE6]">
                {filteredRecords.map((tr) => (
                  <tr key={tr.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3 font-mono font-bold text-[#073B2F]">{tr.employeeId}</td>
                    <td className="py-3 px-3 font-bold text-gray-900">{tr.employeeName}</td>
                    <td className="py-3 px-3 font-semibold text-gray-800">{tr.courseTitle}</td>
                    <td className="py-3 px-3 text-gray-600">{tr.provider}</td>
                    <td className="py-3 px-3 text-gray-600">{tr.completionDate}</td>
                    <td className="py-3 px-3 text-gray-700 font-semibold">{tr.expiryDate}</td>
                    <td className="py-3 px-3 font-mono text-gray-500">{tr.certificateRef}</td>
                    <td className="py-3 px-3">
                      <Badge variant={tr.status === 'Valid' ? 'closed' : 'high'} size="sm">
                        {tr.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Catalogue View */
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingCourses.map((c) => (
            <div key={c.id} className="p-3.5 bg-[#F4F7F5] rounded-xl border border-[#E3EAE6] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#087F5B] bg-white px-2 py-0.5 rounded border border-[#E3EAE6]">
                  {c.code}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold">
                  Valid: {c.validityMonths} months
                </span>
              </div>
              <h4 className="font-bold text-sm text-gray-900">{c.title}</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed">{c.description}</p>
              <div className="text-[10px] text-[#073B2F] font-semibold pt-1 border-t border-gray-200">
                Mandatory for: {c.mandatoryFor.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
