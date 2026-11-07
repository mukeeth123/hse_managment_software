import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import {
  AlertTriangle,
  AlertOctagon,
  Eye,
  CheckCircle2,
  Clock,
  ShieldCheck,
  SearchCheck,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  Scale,
  ThermometerSun,
  TrendingUp,
  ArrowRight,
  Filter,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { Badge } from '../../common/Badge';

export const ExecutiveDashboardModule: React.FC = () => {
  const {
    hazards,
    incidents,
    nearMisses,
    investigations,
    capas,
    inspections,
    permits,
    trainingRecords,
    legalRegister,
    projects,
    selectedProjectFilter,
    setSelectedProjectFilter,
    setActiveDesktopModule,
    setSelectedRecordRef,
  } = useHSE();

  // Filtered by project if selected
  const isAll = selectedProjectFilter === 'All Projects';
  const filtHazards = isAll ? hazards : hazards.filter((h) => h.project === selectedProjectFilter);
  const filtIncidents = isAll ? incidents : incidents.filter((i) => i.project === selectedProjectFilter);
  const filtNearMisses = isAll ? nearMisses : nearMisses.filter((n) => n.project === selectedProjectFilter);
  const filtInvestigations = isAll ? investigations : investigations.filter((inv) => inv.project === selectedProjectFilter);
  const filtCapas = capas;
  const filtInspections = isAll ? inspections : inspections.filter((ins) => ins.project === selectedProjectFilter);
  const filtPermits = isAll ? permits : permits.filter((p) => p.project === selectedProjectFilter);

  // Computed Metrics
  const totalReports = filtHazards.length + filtIncidents.length + filtNearMisses.length;
  const openIncidents = filtIncidents.filter((i) => i.status !== 'Closed').length;
  const openHazards = filtHazards.filter((h) => h.status !== 'Closed').length;
  const criticalHighCases =
    filtHazards.filter((h) => h.severity === 'Critical' || h.severity === 'High').length +
    filtIncidents.filter((i) => i.severity === 'Critical' || i.severity === 'High').length;
  const openInvestigations = filtInvestigations.filter((inv) => inv.status !== 'Completed').length;

  const todayStr = '2026-11-07';
  const overdueCapas = filtCapas.filter((c) => c.status !== 'Closed' && c.dueDate < todayStr).length;
  const closedCases =
    filtHazards.filter((h) => h.status === 'Closed').length +
    filtIncidents.filter((i) => i.status === 'Closed').length;

  const compliantLegal = legalRegister.filter((l) => l.complianceStatus === 'Compliant').length;
  const legalCompliancePct = Math.round((compliantLegal / legalRegister.length) * 100);
  const legalReviewsDue = legalRegister.filter(
    (l) => l.legalReviewStatus === 'Pending Periodic Review' || l.complianceStatus === 'Partial'
  ).length;

  const activePermitsCount = filtPermits.filter((p) => p.status === 'Active').length;
  const validTrainingCount = trainingRecords.filter((t) => t.status === 'Valid').length;
  const trainingCompliancePct = Math.round((validTrainingCount / trainingRecords.length) * 100);

  // Chart Data: Severity distribution
  const severityData = [
    { name: 'Critical', value: filtHazards.filter((h) => h.severity === 'Critical').length + filtIncidents.filter((i) => i.severity === 'Critical').length, color: '#B42318' },
    { name: 'High', value: filtHazards.filter((h) => h.severity === 'High').length + filtIncidents.filter((i) => i.severity === 'High').length, color: '#DC6803' },
    { name: 'Medium', value: filtHazards.filter((h) => h.severity === 'Medium').length + filtIncidents.filter((i) => i.severity === 'Medium').length, color: '#D99A16' },
    { name: 'Low', value: filtHazards.filter((h) => h.severity === 'Low').length + filtIncidents.filter((i) => i.severity === 'Low').length, color: '#16834A' },
  ];

  // Chart Data: Hazards vs Near Misses by Month
  const trendData = [
    { month: 'Jun', Hazards: 3, NearMisses: 2, Incidents: 1 },
    { month: 'Jul', Hazards: 4, NearMisses: 3, Incidents: 2 },
    { month: 'Aug', Hazards: 6, NearMisses: 5, Incidents: 3 },
    { month: 'Sep', Hazards: 5, NearMisses: 4, Incidents: 3 },
    { month: 'Oct', Hazards: 8, NearMisses: 7, Incidents: 4 },
    { month: 'Nov', Hazards: filtHazards.length, NearMisses: filtNearMisses.length, Incidents: filtIncidents.length },
  ];

  // Chart Data: Heat Stress Observations & WBGT Trend
  const heatStressTrendData = [
    { period: 'May', avgWBGT: 27.5, heatObservations: 2, restrictionStatus: 'Normal' },
    { period: 'Jun (Midday Ban)', avgWBGT: 31.8, heatObservations: 8, restrictionStatus: 'MD 17/2021 Active' },
    { period: 'Jul (Peak)', avgWBGT: 33.4, heatObservations: 14, restrictionStatus: 'Work Stoppages' },
    { period: 'Aug (Peak)', avgWBGT: 33.1, heatObservations: 12, restrictionStatus: 'Work Stoppages' },
    { period: 'Sep (Midday Ban)', avgWBGT: 30.9, heatObservations: 6, restrictionStatus: 'MD 17/2021 Active' },
    { period: 'Oct', avgWBGT: 28.2, heatObservations: 3, restrictionStatus: 'Normal' },
    { period: 'Nov (Current)', avgWBGT: 26.4, heatObservations: 1, restrictionStatus: 'Normal' },
  ];

  // Legal by Category chart data
  const legalCategories = [
    'Labour & Occupational Safety',
    'Heat Stress & Outdoor Work',
    'Environmental Protection',
    'Fire Safety & Civil Defence',
    'Construction & Worksite Safety',
  ];
  const legalCategoryData = legalCategories.map((cat) => {
    const items = legalRegister.filter((l) => l.category === cat);
    const comp = items.filter((i) => i.complianceStatus === 'Compliant').length;
    return {
      category: cat.replace(' & ', ' &\n'),
      Compliant: comp,
      Partial: items.filter((i) => i.complianceStatus === 'Partial').length,
    };
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Header & Project Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Executive HSE Dashboard</h2>
            <span className="text-xs bg-[#DDF5EA] text-[#073B2F] px-2.5 py-0.5 rounded-full font-semibold border border-[#20A887]/30">
              Live Local Dataset
            </span>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Operational HSE performance, statutory Qatar compliance metrics & risk controls overview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#F4F7F5] px-3 py-1.5 rounded-lg border border-[#E3EAE6] text-xs">
            <Filter className="w-3.5 h-3.5 text-[#087F5B]" />
            <span className="text-[#65756D] font-medium">Scope:</span>
            <select
              value={selectedProjectFilter}
              onChange={(e) => setSelectedProjectFilter(e.target.value)}
              className="bg-transparent font-bold text-[#172B25] outline-none cursor-pointer"
            >
              <option value="All Projects">All Projects (Consolidated)</option>
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setActiveDesktopModule('Analytics and Reports')}
            className="px-3 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (All computed dynamically from shared demo dataset) */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* Total Reports */}
        <div
          onClick={() => setActiveDesktopModule('Hazard Reporting')}
          className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm hover:border-[#087F5B] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-[#65756D]">
            <span>Total Reports</span>
            <TrendingUp className="w-4 h-4 text-[#20A887]" />
          </div>
          <div className="text-2xl font-extrabold text-[#172B25] mt-1 group-hover:text-[#087F5B]">
            {totalReports}
          </div>
          <div className="text-[11px] text-[#65756D] mt-1 flex items-center justify-between">
            <span>Hazards / Inc / NM</span>
            <span className="text-[#087F5B] font-semibold">Active</span>
          </div>
        </div>

        {/* Open Incidents */}
        <div
          onClick={() => setActiveDesktopModule('Incident Management')}
          className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm hover:border-red-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-[#65756D]">
            <span>Open Incidents</span>
            <AlertOctagon className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{openIncidents}</div>
          <div className="text-[11px] text-[#65756D] mt-1 flex items-center justify-between">
            <span>Requires Review</span>
            <span className="text-red-700 font-semibold">{filtIncidents.length} total</span>
          </div>
        </div>

        {/* Open Hazards */}
        <div
          onClick={() => setActiveDesktopModule('Hazard Reporting')}
          className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm hover:border-amber-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-[#65756D]">
            <span>Open Hazards</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{openHazards}</div>
          <div className="text-[11px] text-[#65756D] mt-1 flex items-center justify-between">
            <span>In Action / Review</span>
            <span className="text-amber-700 font-semibold">{filtHazards.length} total</span>
          </div>
        </div>

        {/* Critical & High Risk Cases */}
        <div
          onClick={() => setActiveDesktopModule('Risk Register')}
          className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm hover:border-red-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-[#65756D]">
            <span>High/Critical Risk</span>
            <ShieldCheck className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-extrabold text-red-700 mt-1">{criticalHighCases}</div>
          <div className="text-[11px] text-[#65756D] mt-1 flex items-center justify-between">
            <span>Target Controls</span>
            <span className="text-red-600 font-semibold">Priority</span>
          </div>
        </div>

        {/* Qatar Legal Compliance % */}
        <div
          onClick={() => setActiveDesktopModule('Qatar Legal Compliance')}
          className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm hover:border-[#087F5B] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-[#65756D]">
            <span>Qatar Compliance</span>
            <Scale className="w-4 h-4 text-[#087F5B]" />
          </div>
          <div className="text-2xl font-extrabold text-[#087F5B] mt-1">{legalCompliancePct}%</div>
          <div className="text-[11px] text-[#65756D] mt-1 flex items-center justify-between">
            <span>{compliantLegal} of {legalRegister.length} compliant</span>
            <span className="text-amber-600 font-semibold">{legalReviewsDue} reviews due</span>
          </div>
        </div>

        {/* Overdue CAPAs */}
        <div
          onClick={() => setActiveDesktopModule('Corrective and Preventive Actions')}
          className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm hover:border-amber-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-[#65756D]">
            <span>Active PTW Permits</span>
            <FileCheck2 className="w-4 h-4 text-[#20A887]" />
          </div>
          <div className="text-2xl font-extrabold text-[#172B25] mt-1">{activePermitsCount}</div>
          <div className="text-[11px] text-[#65756D] mt-1 flex items-center justify-between">
            <span>Work at Height / Hot</span>
            <span className="text-[#087F5B] font-semibold">{filtPermits.length} total</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart 1: Safety Reporting Trends */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#172B25]">Incident, Hazard & Near Miss Trends</h3>
              <p className="text-xs text-[#65756D]">Monthly observation velocity across Qatar project sites</p>
            </div>
            <span className="text-xs font-semibold text-[#087F5B]">Past 6 Months</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E3EAE6', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Hazards" stroke="#D99A16" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="NearMisses" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Incidents" stroke="#B42318" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Severity Distribution */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#172B25]">Severity Distribution</h3>
              <p className="text-xs text-[#65756D]">Active risk exposure profile</p>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E3EAE6', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#E3EAE6] text-xs">
            {severityData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#65756D]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                  {s.name}
                </span>
                <strong className="text-[#172B25]">{s.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Qatar MD 17/2021 Heat Stress Seasonal Trend Card */}
      <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-white p-4 rounded-xl border border-amber-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-bold text-sm text-amber-950">
                Qatar Ministerial Decision No. 17 of 2021 — Heat Stress Exposure & WBGT Seasonal Analysis
              </h3>
              <p className="text-xs text-amber-800/80">
                Mandatory outdoor work restrictions (10:00 to 15:30 between 1 June & 15 Sept) & Wet Bulb Globe Temperature threshold monitoring (&gt;32.1°C)
              </p>
            </div>
          </div>
          <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-md">
            Statutory Rule Enforced
          </span>
        </div>

        <div className="h-48 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={heatStressTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #FDE68A', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="avgWBGT" name="Mean WBGT (°C)" fill="#D97706" radius={[4, 4, 0, 0]} />
              <Bar dataKey="heatObservations" name="Recorded Heat Incidents" fill="#DC2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Operational Highlights Tables (Recent Incidents, Pending Investigations, Active Permits) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Table 1: Recent Incidents & Cases */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-[#172B25] flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <span>Recent Incidents Requiring Oversight</span>
            </h3>
            <button
              onClick={() => setActiveDesktopModule('Incident Management')}
              className="text-xs text-[#087F5B] hover:underline font-semibold flex items-center gap-0.5"
            >
              View all ({filtIncidents.length}) <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
                <tr>
                  <th className="py-2 px-2.5 font-semibold">Ref</th>
                  <th className="py-2 px-2 font-semibold">Type</th>
                  <th className="py-2 px-2 font-semibold">Location</th>
                  <th className="py-2 px-2 font-semibold">Severity</th>
                  <th className="py-2 px-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtIncidents.slice(0, 4).map((inc) => (
                  <tr
                    key={inc.id}
                    onClick={() => {
                      setActiveDesktopModule('Incident Management');
                      setSelectedRecordRef(inc.reference);
                    }}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-2.5 font-mono font-bold text-[#073B2F]">{inc.reference}</td>
                    <td className="py-2.5 px-2 font-medium text-gray-900">{inc.incidentType}</td>
                    <td className="py-2.5 px-2 text-gray-600">{inc.location}</td>
                    <td className="py-2.5 px-2">
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
                    <td className="py-2.5 px-2">
                      <Badge variant={inc.status === 'Closed' ? 'closed' : 'underReview'} size="sm">
                        {inc.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Active Permits to Work */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-[#172B25] flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#087F5B]" />
              <span>Active Permits to Work (PTW)</span>
            </h3>
            <button
              onClick={() => setActiveDesktopModule('Permit to Work')}
              className="text-xs text-[#087F5B] hover:underline font-semibold flex items-center gap-0.5"
            >
              Permits Register ({filtPermits.length}) <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
                <tr>
                  <th className="py-2 px-2.5 font-semibold">Permit Ref</th>
                  <th className="py-2 px-2 font-semibold">Category</th>
                  <th className="py-2 px-2 font-semibold">Location</th>
                  <th className="py-2 px-2 font-semibold">Applicant</th>
                  <th className="py-2 px-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtPermits.slice(0, 4).map((ptw) => (
                  <tr
                    key={ptw.id}
                    onClick={() => {
                      setActiveDesktopModule('Permit to Work');
                      setSelectedRecordRef(ptw.reference);
                    }}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-2.5 font-mono font-bold text-[#073B2F]">{ptw.reference}</td>
                    <td className="py-2.5 px-2 font-semibold text-gray-900">{ptw.permitType}</td>
                    <td className="py-2.5 px-2 text-gray-600">{ptw.location}</td>
                    <td className="py-2.5 px-2 text-gray-700">{ptw.applicant}</td>
                    <td className="py-2.5 px-2">
                      <Badge variant={ptw.status === 'Active' ? 'verified' : 'neutral'} size="sm">
                        {ptw.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
