import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import {
  Scale,
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  BookOpen,
  Building,
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
  Upload,
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { QatarLegalRegisterItem } from '../../../types';
import { exportToExcel, exportToCSV, generateHSEPDFReport } from '../../../utils/exportUtils';

export const QatarLegalComplianceModule: React.FC = () => {
  const { legalRegister, updateLegalItem, addToast } = useHSE();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [authorityFilter, setAuthorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'register' | 'matrix' | 'dashboard'>('register');

  // Detail Modal State
  const [selectedItem, setSelectedItem] = useState<QatarLegalRegisterItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editComplianceStatus, setEditComplianceStatus] = useState<any>('Compliant');

  // Computed KPIs
  const totalReferences = legalRegister.length;
  const verifiedCount = legalRegister.filter((l) => l.classification === 'VERIFIED LEGAL REQUIREMENT').length;
  const reviewRequiredCount = legalRegister.filter((l) => l.classification === 'REQUIRES LEGAL REVIEW').length;
  const compliantCount = legalRegister.filter((l) => l.complianceStatus === 'Compliant').length;
  const partialCount = legalRegister.filter((l) => l.complianceStatus === 'Partial').length;
  const nonCompliantCount = legalRegister.filter((l) => l.complianceStatus === 'Non-compliant').length;
  const reviewsDueCount = legalRegister.filter((l) => l.legalReviewStatus !== 'Up-to-date').length;
  const compliancePct = Math.round((compliantCount / totalReferences) * 100);

  // Filtered List
  const filteredItems = legalRegister.filter((item) => {
    if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
    if (authorityFilter !== 'All' && !item.issuingAuthority.includes(authorityFilter)) return false;
    if (statusFilter !== 'All' && item.complianceStatus !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.reference.toLowerCase().includes(q) ||
        item.legislationTitle.toLowerCase().includes(q) ||
        item.legislationNumberYear.toLowerCase().includes(q) ||
        item.relevantArticle.toLowerCase().includes(q) ||
        item.practicalWorkplaceImplications.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (item: QatarLegalRegisterItem) => {
    setSelectedItem(item);
    setEditNotes(item.notes || '');
    setEditComplianceStatus(item.complianceStatus);
    setIsDetailModalOpen(true);
  };

  const handleSaveReview = () => {
    if (!selectedItem) return;
    const updated: QatarLegalRegisterItem = {
      ...selectedItem,
      complianceStatus: editComplianceStatus,
      notes: editNotes,
      lastVerificationDate: new Date().toISOString().substring(0, 10),
      legalReviewStatus: 'Up-to-date',
    };
    updateLegalItem(updated);
    setSelectedItem(updated);
    addToast('success', 'Compliance Status Updated', `${updated.reference} set to ${editComplianceStatus}`);
  };

  const handleExportExcel = () => {
    const exportData = filteredItems.map((item) => ({
      Reference: item.reference,
      Legislation: item.legislationTitle,
      Authority: item.issuingAuthority,
      Provision: item.relevantArticle,
      Classification: item.classification,
      ComplianceStatus: item.complianceStatus,
      Applicability: item.applicability,
      EvidenceNeeded: item.evidenceNeeded,
      ResponsibleOwner: item.responsiblePerson,
      NextReview: item.nextReviewDate,
      OfficialSource: item.officialSourceUrl,
    }));
    exportToExcel('Qatar_HSE_Legal_Compliance_Register', 'LegalRegister', exportData);
    addToast('success', 'Excel Export Ready', 'Downloaded Qatar Legal Register as spreadsheet');
  };

  const handleExportPDF = () => {
    const sections = filteredItems.map((item) => ({
      title: `${item.reference}: ${item.legislationTitle} (${item.classification})`,
      lines: [
        `Authority: ${item.issuingAuthority} | Relevant Provision: ${item.relevantArticle}`,
        `Compliance Status: ${item.complianceStatus.toUpperCase()} | Applicability: ${item.applicability} | Owner: ${item.responsiblePerson}`,
        `Workplace Obligations: ${item.practicalWorkplaceImplications}`,
        `Organisational Controls: ${item.requiredOrganisationalControls}`,
        `Evidence Required: ${item.evidenceNeeded} (Linked Ref: ${item.linkedEvidenceRef || 'Pending'})`,
        `Official Source: ${item.officialSourceUrl}`,
      ],
    }));

    generateHSEPDFReport(
      'Qatar Legal & Regulatory Compliance Register',
      'Statutory HSE Legislation, Ministerial Decisions & Standards Audit',
      sections
    );
    addToast('success', 'PDF Generated', 'Downloaded formatted Qatar Legal Compliance Report');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#073B2F] text-white flex items-center justify-center font-bold">
              <Scale className="w-4 h-4 text-[#20A887]" />
            </div>
            <h2 className="text-xl font-bold text-[#172B25]">Qatar Legal & Regulatory Compliance Centre</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-300">
              Verified Legal Register
            </span>
          </div>
          <p className="text-xs text-[#65756D] mt-1">
            Authoritative Qatar OSH & environmental legislation, ministerial decisions, verification audits and operational control mappings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel Export</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Legal Dossier</span>
          </button>
        </div>
      </div>

      {/* Prominent Statutory Disclaimer (Mandatory Requirement) */}
      <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs text-amber-950 flex items-start gap-3 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold block text-amber-900">Legal Compliance Disclaimer:</span>
          Legal information is provided for demonstration and compliance-management purposes. Applicability and interpretation must be confirmed against the current official Arabic legislation, applicable amendments, regulator requirements and qualified Qatar legal advice. This platform does not replace legal advice or regulator approval.
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5">
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Total References</span>
          <span className="text-xl font-extrabold text-[#172B25]">{totalReferences}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Verified Laws</span>
          <span className="text-xl font-extrabold text-emerald-700">{verifiedCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Requires Review</span>
          <span className="text-xl font-extrabold text-purple-700">{reviewRequiredCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Compliant</span>
          <span className="text-xl font-extrabold text-[#087F5B]">{compliantCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Partial</span>
          <span className="text-xl font-extrabold text-amber-600">{partialCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Non-compliant</span>
          <span className="text-xl font-extrabold text-red-600">{nonCompliantCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Reviews Due</span>
          <span className="text-xl font-extrabold text-orange-600">{reviewsDueCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-[#65756D] block">Compliance %</span>
          <span className="text-xl font-extrabold text-[#073B2F]">{compliancePct}%</span>
        </div>
      </div>

      {/* Module Tabs (Register Table vs Applicability Matrix vs Dashboard Breakdown) */}
      <div className="flex border-b border-[#E3EAE6] bg-white px-4 rounded-t-xl gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('register')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'register'
              ? 'border-[#087F5B] text-[#073B2F]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Statutory Legal Register Table ({filteredItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'matrix'
              ? 'border-[#087F5B] text-[#073B2F]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Legal Applicability Matrix (Operations Mapping)</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'dashboard'
              ? 'border-[#087F5B] text-[#073B2F]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Qatar Authorities & Sources Directory</span>
        </button>
      </div>

      {/* Tab 1: Legal Register Table */}
      {activeTab === 'register' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-4">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search law #, title, article or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none focus:ring-1 focus:ring-[#087F5B]"
              />
            </div>

            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Labour & Occupational Safety">Labour & Occupational Safety</option>
                <option value="Heat Stress & Outdoor Work">Heat Stress & Outdoor Work</option>
                <option value="Environmental Protection">Environmental Protection</option>
                <option value="Fire Safety & Civil Defence">Fire Safety & Civil Defence</option>
                <option value="Construction & Worksite Safety">Construction & Worksite Safety</option>
                <option value="Occupational Health">Occupational Health</option>
                <option value="Chemical & Hazardous Substances">Chemical & Hazardous Substances</option>
              </select>
            </div>

            <div>
              <select
                value={authorityFilter}
                onChange={(e) => setAuthorityFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
              >
                <option value="All">All Issuing Authorities</option>
                <option value="Labour">Ministry of Labour (MoL)</option>
                <option value="Environment">Ministry of Environment (MECC)</option>
                <option value="Civil Defence">General Directorate of Civil Defence</option>
                <option value="Public Health">Ministry of Public Health (MoPH)</option>
                <option value="Municipality">Ministry of Municipality</option>
                <option value="ILO">International Labour Organization (ILO)</option>
              </select>
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
              >
                <option value="All">All Compliance Statuses</option>
                <option value="Compliant">Compliant</option>
                <option value="Partial">Partial</option>
                <option value="Non-compliant">Non-compliant</option>
                <option value="Not Assessed">Not Assessed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E3EAE6] rounded-lg">
              <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Reference</th>
                  <th className="py-2.5 px-3 font-semibold">Legislation & Provision</th>
                  <th className="py-2.5 px-3 font-semibold">Classification</th>
                  <th className="py-2.5 px-3 font-semibold">Authority</th>
                  <th className="py-2.5 px-3 font-semibold">Compliance Status</th>
                  <th className="py-2.5 px-3 font-semibold">Linked Module</th>
                  <th className="py-2.5 px-3 font-semibold">Next Review</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAE6]">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                    onClick={() => handleOpenDetail(item)}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">
                      {item.reference}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-bold text-gray-900 leading-snug">{item.legislationTitle}</div>
                      <div className="text-[11px] text-[#087F5B] mt-0.5 line-clamp-1">{item.relevantArticle}</div>
                      {item.isUnofficialEnglishTranslation && (
                        <span className="text-[9px] text-gray-400 italic">Unofficial English translation</span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                          item.classification === 'VERIFIED LEGAL REQUIREMENT'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.classification === 'OFFICIAL GUIDANCE'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : item.classification === 'INDUSTRY STANDARD'
                            ? 'bg-slate-50 text-slate-800 border-slate-300'
                            : 'bg-purple-50 text-purple-800 border-purple-300'
                        }`}
                      >
                        {item.classification}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{item.issuingAuthority}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge
                        variant={
                          item.complianceStatus === 'Compliant'
                            ? 'closed'
                            : item.complianceStatus === 'Partial'
                            ? 'high'
                            : 'critical'
                        }
                        size="sm"
                      >
                        {item.complianceStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{item.linkedOperationalModule}</td>
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{item.nextReviewDate}</td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(item);
                        }}
                        className="px-2 py-1 bg-gray-100 hover:bg-[#087F5B] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
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
      )}

      {/* Tab 2: Legal Applicability Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-[#172B25]">
              Legal Requirement to Operational Module Mapping Matrix
            </h3>
            <p className="text-xs text-[#65756D]">
              Direct linkage between statutory Qatar provisions, active HSE execution modules, required controls, and compliance evidence
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E3EAE6] rounded-lg">
              <thead className="bg-[#073B2F] text-white">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Statutory Provision</th>
                  <th className="py-2.5 px-3 font-semibold">Operational Module</th>
                  <th className="py-2.5 px-3 font-semibold">Required Workplace Controls</th>
                  <th className="py-2.5 px-3 font-semibold">Compliance Evidence Required</th>
                  <th className="py-2.5 px-3 font-semibold">Linked Demonstration Record</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {legalRegister.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-semibold text-gray-900 max-w-xs">
                      <div>{l.relevantArticle}</div>
                      <span className="text-[10px] text-gray-500 font-normal">{l.legislationNumberYear}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-800 font-bold rounded border border-emerald-200 inline-block">
                        {l.linkedOperationalModule}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700 max-w-sm">{l.requiredOrganisationalControls}</td>
                    <td className="py-3 px-3 text-gray-700 max-w-xs">{l.evidenceNeeded}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-xs text-[#087F5B] bg-[#F4F7F5] px-2 py-1 rounded border border-[#E3EAE6]">
                        {l.linkedEvidenceRef || 'Pending Audit'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Qatar Authorities & Sources Directory */}
      {activeTab === 'dashboard' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-[#172B25]">Authoritative Qatar Regulatory Sources Directory</h3>
            <p className="text-xs text-[#65756D]">
              Verified official legal databases, gazette publishers and ministerial departments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Qatar Al Meezan Legal Portal',
                url: 'https://www.almeezan.qa/',
                desc: 'Official state legislation portal maintained by the Ministry of Justice containing authenticated Arabic laws and ministerial decrees.',
              },
              {
                title: 'Qatar Official Gazette',
                url: 'https://officialgazette.gov.qa/',
                desc: 'Official journal publishing primary legislation, emiri decrees and ministerial decisions with statutory effective dates.',
              },
              {
                title: 'Ministry of Labour (MoL)',
                url: 'https://www.mol.gov.qa/',
                desc: 'Competent authority governing Labour Law No. 14 of 2004, Heat Stress MD No. 17 of 2021, and OSH labor inspections.',
              },
              {
                title: 'General Directorate of Civil Defence',
                url: 'https://portal.moi.gov.qa/',
                desc: 'Ministry of Interior body governing building fire safety licenses, fire suppression standards, and evacuation drills.',
              },
              {
                title: 'Ministry of Environment and Climate Change (MECC)',
                url: 'https://www.mecc.gov.qa/',
                desc: 'Regulator administering Environmental Protection Law No. 30 of 2002, chemical import permits, EIA and hazardous waste manifests.',
              },
              {
                title: 'Ministry of Public Health (MoPH)',
                url: 'https://www.moph.gov.qa/',
                desc: 'State health authority issuing occupational health surveillance standards, worksite clinic licensing, and first aid mandates.',
              },
            ].map((src, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-200 hover:border-[#087F5B] bg-[#F4F7F5] shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{src.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{src.desc}</p>
                </div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F5B] hover:underline"
                >
                  <span>Visit Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail & Review Modal */}
      {isDetailModalOpen && selectedItem && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Legal Compliance Record: ${selectedItem.reference}`}
          subtitle={`${selectedItem.legislationTitle} (${selectedItem.legislationNumberYear})`}
          maxWidth="4xl"
        >
          <div className="space-y-4 text-xs">
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-gray-200">
              <span className="font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300">
                {selectedItem.classification}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-900 border border-blue-300">
                Authority: {selectedItem.issuingAuthority}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-700">
                Published: {selectedItem.publicationDate}
              </span>
              {selectedItem.isUnofficialEnglishTranslation && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-900 border border-amber-300">
                  Unofficial English Translation
                </span>
              )}
            </div>

            {/* Provision Details */}
            <div className="bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6] space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">{selectedItem.relevantArticle}</h4>
              <p className="text-gray-700 leading-relaxed">{selectedItem.practicalWorkplaceImplications}</p>
            </div>

            {/* Required Controls and Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-gray-200 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                  <ShieldAlert className="w-4 h-4 text-[#087F5B]" /> Required Organisational Controls
                </h5>
                <p className="text-gray-700 leading-relaxed text-[11px]">{selectedItem.requiredOrganisationalControls}</p>
              </div>

              <div className="p-3 bg-white border border-gray-200 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Evidence Needed to Demonstrate Compliance
                </h5>
                <p className="text-gray-700 leading-relaxed text-[11px]">{selectedItem.evidenceNeeded}</p>
                <div className="mt-2 text-[10px] text-gray-500">
                  Linked Demonstration Ref: <strong className="font-mono text-[#073B2F]">{selectedItem.linkedEvidenceRef || 'Pending Audit'}</strong>
                </div>
              </div>
            </div>

            {/* Official Source URL */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-blue-900 text-[11px] block">Verified Official Source URL:</span>
                <span className="text-[10px] text-blue-800 font-mono truncate block max-w-lg">{selectedItem.officialSourceUrl}</span>
              </div>
              <a
                href={selectedItem.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold hover:bg-blue-800 flex items-center gap-1 shadow"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Compliance Review & Sign-Off Section */}
            <div className="border-t border-gray-200 pt-3 space-y-3">
              <h5 className="font-bold text-gray-900">Compliance Audit & Status Update</h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Compliance Evaluation</label>
                  <select
                    value={editComplianceStatus}
                    onChange={(e) => setEditComplianceStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none font-bold"
                  >
                    <option value="Compliant">Compliant — All controls verified with evidence</option>
                    <option value="Partial">Partial — Controls in place, evidence documentation pending</option>
                    <option value="Non-compliant">Non-compliant — Gaps identified requiring CAPA</option>
                    <option value="Not Assessed">Not Assessed — Pending legal assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Assigned Responsible Person</label>
                  <input
                    type="text"
                    disabled
                    value={selectedItem.responsiblePerson}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-xs text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Review Notes & Auditor Findings</label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record audit verification notes, permit references, or gap remediation plans..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-gray-500">
                  Last verified: {selectedItem.lastVerificationDate} • Next review: {selectedItem.nextReviewDate}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveReview}
                    className="px-4 py-2 bg-[#073B2F] hover:bg-[#092B24] text-white font-bold rounded-lg shadow"
                  >
                    Save Review & Update Audit Trail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
