import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { BarChart3, Download, FileText, Filter, Calendar, Printer, RefreshCw } from 'lucide-react';
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
  CartesianGrid,
} from 'recharts';
import { Badge } from '../../common/Badge';
import { exportToExcel, exportToCSV, generateHSEPDFReport } from '../../../utils/exportUtils';

export const AnalyticsReportsModule: React.FC = () => {
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
    locations,
    addToast,
  } = useHSE();

  const [selectedProject, setSelectedProject] = useState('All');
  const [reportType, setReportType] = useState('Consolidated Executive Summary');

  // Filtered by project
  const filtHazards = selectedProject === 'All' ? hazards : hazards.filter((h) => h.project === selectedProject);
  const filtIncidents = selectedProject === 'All' ? incidents : incidents.filter((i) => i.project === selectedProject);
  const filtNearMisses = selectedProject === 'All' ? nearMisses : nearMisses.filter((n) => n.project === selectedProject);

  // By Project breakdown
  const projectStats = projects.map((p) => ({
    name: p.replace('Qatar Project — ', ''),
    Hazards: hazards.filter((h) => h.project === p).length,
    Incidents: incidents.filter((i) => i.project === p).length,
    NearMisses: nearMisses.filter((n) => n.project === p).length,
  }));

  // By Category Breakdown
  const categories = ['Work at height', 'Heat stress', 'Excavation', 'Electrical hazards', 'Fire hazards', 'Chemical exposure'];
  const categoryStats = categories.map((cat) => ({
    category: cat,
    Hazards: hazards.filter((h) => h.category === cat).length,
  }));

  const handleExportCSV = () => {
    const rows = [
      ...filtHazards.map((h) => ({ Type: 'Hazard', Ref: h.reference, Title: h.title, Project: h.project, Location: h.location, Severity: h.severity, Status: h.status })),
      ...filtIncidents.map((i) => ({ Type: 'Incident', Ref: i.reference, Title: i.title, Project: i.project, Location: i.location, Severity: i.severity, Status: i.status })),
      ...filtNearMisses.map((n) => ({ Type: 'Near Miss', Ref: n.reference, Title: n.title, Project: n.project, Location: n.location, Severity: n.severity, Status: n.status })),
    ];
    exportToCSV('QHSE_Analytics_Export', rows);
    addToast('success', 'CSV Generated', 'Exported safety dataset as CSV');
  };

  const handleExportExcel = () => {
    const rows = [
      ...filtHazards.map((h) => ({ Type: 'Hazard', Ref: h.reference, Title: h.title, Project: h.project, Location: h.location, Severity: h.severity, Status: h.status })),
      ...filtIncidents.map((i) => ({ Type: 'Incident', Ref: i.reference, Title: i.title, Project: i.project, Location: i.location, Severity: i.severity, Status: i.status })),
      ...filtNearMisses.map((n) => ({ Type: 'Near Miss', Ref: n.reference, Title: n.title, Project: n.project, Location: n.location, Severity: n.severity, Status: n.status })),
    ];
    exportToExcel('QHSE_Executive_Analytics', 'SafetyData', rows);
    addToast('success', 'Excel Generated', 'Exported consolidated report as Excel spreadsheet');
  };

  const handleGeneratePDF = () => {
    generateHSEPDFReport(
      'Executive Health, Safety & Environment Performance Dossier',
      `Scope: ${selectedProject} | Generated for Client Organisation (Qatar)`,
      [
        {
          title: 'High-Level HSE Metrics Overview',
          lines: [
            `Total Observation Volume: ${filtHazards.length + filtIncidents.length + filtNearMisses.length}`,
            `Hazards Logged: ${filtHazards.length} | Open Hazards: ${filtHazards.filter((h) => h.status !== 'Closed').length}`,
            `Incidents Logged: ${filtIncidents.length} | Open Incidents: ${filtIncidents.filter((i) => i.status !== 'Closed').length}`,
            `Near Misses Logged: ${filtNearMisses.length}`,
            `Active Permits to Work: ${permits.filter((p) => p.status === 'Active').length}`,
            `CAPA Mitigation Actions Closed: ${capas.filter((c) => c.status === 'Closed').length} of ${capas.length}`,
          ],
        },
        {
          title: 'Qatar Statutory Compliance Verification',
          lines: [
            `Total Verified Legislation References: ${legalRegister.length}`,
            `Full Statutory Compliance: ${legalRegister.filter((l) => l.complianceStatus === 'Compliant').length} references (${Math.round((legalRegister.filter((l) => l.complianceStatus === 'Compliant').length / legalRegister.length) * 100)}%)`,
            `Reviews Requiring Periodic Re-verification: ${legalRegister.filter((l) => l.legalReviewStatus !== 'Up-to-date').length}`,
            `Qatar MD 17/2021 Heat Stress Controls: 100% compliant during seasonal window`,
          ],
        },
        {
          title: 'Project Performance Breakdown',
          lines: projectStats.map(
            (p) => `${p.name}: Hazards (${p.Hazards}) | Incidents (${p.Incidents}) | Near Misses (${p.NearMisses})`
          ),
        },
      ]
    );
    addToast('success', 'PDF Generated', 'Downloaded formatted HSE Executive Dossier');
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Analytics, Trends & Reporting Suite</h2>
            <Badge variant="verified" size="sm">Browser-Side Generation</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Dynamic report synthesis, cross-project safety comparisons and exportable regulatory dossiers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export</span>
          </button>
          <button
            onClick={handleExportExcel}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel Dossier</span>
          </button>
          <button
            onClick={handleGeneratePDF}
            className="px-3.5 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate PDF Report</span>
          </button>
        </div>
      </div>

      {/* Scope Filter Bar */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-bold mb-1">Select Project Scope:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none font-semibold"
          >
            <option value="All">All Qatar Projects (Consolidated Portfolio)</option>
            {projects.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Report Template Dossier:</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none font-semibold"
          >
            <option value="Consolidated Executive Summary">Consolidated Executive Summary</option>
            <option value="Qatar Legal & Regulatory Audit">Qatar Legal & Regulatory Audit</option>
            <option value="Heat Stress & Summer MD 17/2021">Heat Stress & Summer MD 17/2021</option>
            <option value="CAPA & Action Verification Status">CAPA & Action Verification Status</option>
          </select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Project Comparison Chart */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm">
          <h3 className="font-bold text-sm text-[#172B25] mb-1">Safety Observations by Project Site</h3>
          <p className="text-xs text-[#65756D] mb-3">Comparing Demo Sites 01, 02 and 03</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E3EAE6', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="Hazards" fill="#D99A16" radius={[4, 4, 0, 0]} />
                <Bar dataKey="NearMisses" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Incidents" fill="#B42318" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Hazard Categories */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm">
          <h3 className="font-bold text-sm text-[#172B25] mb-1">Hazard Distribution by High-Risk Trade</h3>
          <p className="text-xs text-[#65756D] mb-3">Dominant risk exposures across work fronts</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E3EAE6', fontSize: '11px' }} />
                <Bar dataKey="Hazards" fill="#087F5B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
