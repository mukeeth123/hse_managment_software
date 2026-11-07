import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import {
  SearchCheck,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  UserCheck,
  Calendar,
  Layers,
  ArrowRight,
  GitBranch,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { InvestigationRecord } from '../../../types';
import { generateHSEPDFReport } from '../../../utils/exportUtils';

export const InvestigationManagementModule: React.FC = () => {
  const { investigations, saveInvestigation, currentUser, selectedRecordRef, setSelectedRecordRef, addToast, setActiveDesktopModule } = useHSE();

  const [search, setSearch] = useState('');
  const [selectedInv, setSelectedInv] = useState<InvestigationRecord>(
    (selectedRecordRef ? investigations.find((i) => i.reference === selectedRecordRef || i.linkedRecordRef === selectedRecordRef) : null) || investigations[0]
  );
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'5whys' | 'fishbone' | 'timeline' | 'witnesses'>('5whys');

  const filtered = investigations.filter((inv) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        inv.reference.toLowerCase().includes(q) ||
        inv.linkedRecordRef.toLowerCase().includes(q) ||
        inv.leadInvestigator.toLowerCase().includes(q) ||
        inv.incidentSummary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApproveInvestigation = () => {
    const updated: InvestigationRecord = {
      ...selectedInv,
      status: 'Approved',
      approvalDate: new Date().toISOString().substring(0, 10),
      approvedBy: currentUser.name,
    };
    saveInvestigation(updated);
    setSelectedInv(updated);
    addToast('success', 'Investigation Approved', `${updated.reference} signed off by ${currentUser.name}`);
  };

  const handleExportPDF = () => {
    generateHSEPDFReport(
      `Formal Root Cause Investigation Report: ${selectedInv.reference}`,
      `Linked Case: ${selectedInv.linkedRecordRef} — Lead: ${selectedInv.leadInvestigator}`,
      [
        {
          title: 'Executive Incident Summary',
          lines: [selectedInv.incidentSummary, `Location: ${selectedInv.location} | Project: ${selectedInv.project}`],
        },
        {
          title: 'Investigation Team',
          lines: [`Lead: ${selectedInv.leadInvestigator}`, `Team Members: ${selectedInv.investigationTeam.join(', ')}`],
        },
        {
          title: '5 Whys Root Cause Trajectory',
          lines: selectedInv.fiveWhys,
        },
        {
          title: 'Immediate & Underlying Causes',
          lines: [
            ...selectedInv.immediateCauses.map((c) => `Immediate: ${c}`),
            ...selectedInv.underlyingCauses.map((c) => `Underlying: ${c}`),
          ],
        },
        {
          title: 'Findings & Statutory Compliance Observations',
          lines: selectedInv.findings,
        },
        {
          title: 'Corrective Action Recommendations',
          lines: selectedInv.recommendations,
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
            <h2 className="text-xl font-bold text-[#172B25]">Investigation Management & Root Cause Analysis</h2>
            <Badge variant="investigation" size="sm">{investigations.length} case files</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Structured 5-Whys methodology, Ishikawa Fishbone diagrams, witness testimony and corrective recommendations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Investigation Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Case Selector on Left, Case Details & Root Cause on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Investigation Case List */}
        <div className="lg:col-span-4 bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search case ref or linked incident..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none text-xs"
            />
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[620px] pr-1">
            {filtered.map((inv) => {
              const isSelected = selectedInv.id === inv.id;
              return (
                <div
                  key={inv.id}
                  onClick={() => setSelectedInv(inv)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#087F5B] bg-emerald-50/40 shadow-sm ring-1 ring-[#087F5B]/30'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-[#073B2F]">{inv.reference}</span>
                    <Badge variant={inv.status === 'Approved' ? 'closed' : 'investigation'} size="sm">
                      {inv.status}
                    </Badge>
                  </div>

                  <div className="text-[11px] font-semibold text-gray-900 mb-1">
                    Linked to: <span className="font-mono text-[#087F5B]">{inv.linkedRecordRef}</span> ({inv.linkedRecordType})
                  </div>

                  <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                    {inv.incidentSummary}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100 text-[10px] text-gray-500">
                    <span>Lead: {inv.leadInvestigator}</span>
                    <span>📍 {inv.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Deep-Dive & Root Cause Workspace */}
        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm space-y-4">
          {/* Header of Active Case */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-[#E3EAE6]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-900">{selectedInv.reference}</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-purple-100 text-purple-900 border border-purple-300">
                  Linked Case: {selectedInv.linkedRecordRef}
                </span>
                <Badge variant={selectedInv.status === 'Approved' ? 'closed' : 'underReview'}>
                  {selectedInv.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Lead Investigator: <strong>{selectedInv.leadInvestigator}</strong> • Team: {selectedInv.investigationTeam.join(', ')}
              </p>
            </div>

            {selectedInv.status !== 'Approved' && (
              <button
                onClick={handleApproveInvestigation}
                className="px-3.5 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Finalise Findings</span>
              </button>
            )}
          </div>

          {/* Incident Summary */}
          <div className="bg-[#F4F7F5] p-3 rounded-xl border border-[#E3EAE6]">
            <h4 className="font-bold text-gray-900 text-xs mb-1">Incident Event Summary</h4>
            <p className="text-gray-700 leading-relaxed text-[11px]">{selectedInv.incidentSummary}</p>
          </div>

          {/* Analysis View Switcher */}
          <div className="flex gap-2 border-b border-gray-200 pb-2 font-bold text-xs">
            <button
              onClick={() => setActiveAnalysisTab('5whys')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeAnalysisTab === '5whys' ? 'bg-[#073B2F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>5 Whys Root Cause Trajectory</span>
            </button>

            <button
              onClick={() => setActiveAnalysisTab('fishbone')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeAnalysisTab === 'fishbone' ? 'bg-[#073B2F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Ishikawa Fishbone Diagram (6Ms)</span>
            </button>

            <button
              onClick={() => setActiveAnalysisTab('timeline')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeAnalysisTab === 'timeline' ? 'bg-[#073B2F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Sequence Timeline</span>
            </button>

            <button
              onClick={() => setActiveAnalysisTab('witnesses')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeAnalysisTab === 'witnesses' ? 'bg-[#073B2F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Witness Statements</span>
            </button>
          </div>

          {/* Tab 1: 5 Whys Analysis */}
          {activeAnalysisTab === '5whys' && (
            <div className="space-y-2 bg-purple-50/40 p-3.5 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-900 text-xs flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>Iterative 5-Whys Diagnostic Chain</span>
              </h4>

              <div className="space-y-2">
                {selectedInv.fiveWhys.map((why, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-purple-200 shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      W{idx + 1}
                    </span>
                    <p className="text-gray-800 text-[11px] leading-relaxed pt-0.5">{why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Ishikawa Fishbone Diagram */}
          {activeAnalysisTab === 'fishbone' && (
            <div className="space-y-3 bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6]">
              <h4 className="font-bold text-[#172B25] text-xs">Fishbone Cause-and-Effect Analysis (Ishikawa)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {Object.entries(selectedInv.fishbone).map(([category, causes]) => (
                  <div key={category} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs">
                    <h5 className="font-bold text-[11px] text-[#073B2F] uppercase tracking-wider mb-1.5 pb-1 border-b border-gray-100">
                      {category}
                    </h5>
                    <ul className="space-y-1">
                      {causes.map((c, i) => (
                        <li key={i} className="text-[10px] text-gray-700 flex items-start gap-1">
                          <span className="text-[#20A887]">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Timeline */}
          {activeAnalysisTab === 'timeline' && (
            <div className="space-y-2 bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6]">
              <h4 className="font-bold text-gray-900 text-xs mb-2">Chronological Incident Timeline</h4>
              <div className="space-y-2">
                {selectedInv.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
                    <span className="font-mono font-bold text-xs text-[#087F5B] bg-[#DDF5EA] px-2 py-0.5 rounded">
                      {item.time}
                    </span>
                    <p className="text-gray-800 text-[11px]">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Witnesses */}
          {activeAnalysisTab === 'witnesses' && (
            <div className="space-y-2 bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6]">
              <h4 className="font-bold text-gray-900 text-xs mb-2">Authenticated Witness Statements</h4>
              <div className="space-y-2">
                {selectedInv.witnessStatements.map((ws, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-xs">{ws.witness}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{ws.date}</span>
                    </div>
                    <p className="text-gray-700 italic text-[11px] leading-relaxed">"{ws.statement}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Findings & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
              <h5 className="font-bold text-gray-900 text-xs">Key Investigation Findings:</h5>
              <ul className="space-y-1 text-[11px] text-gray-700">
                {selectedInv.findings.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
              <h5 className="font-bold text-emerald-950 text-xs">Preventive Recommendations:</h5>
              <ul className="space-y-1 text-[11px] text-emerald-900">
                {selectedInv.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
