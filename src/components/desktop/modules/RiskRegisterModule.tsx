import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { ShieldAlert, Search, Filter, Plus, Download, Grid, Table as TableIcon } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { RiskAssessmentRecord } from '../../../types';
import { exportToExcel } from '../../../utils/exportUtils';

export const RiskRegisterModule: React.FC = () => {
  const { riskAssessments, saveRiskAssessment, projects, locations, currentUser } = useHSE();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedCell, setSelectedCell] = useState<{ l: number; s: number } | null>(null);

  const [selectedRisk, setSelectedRisk] = useState<RiskAssessmentRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filtered
  const filtered = riskAssessments.filter((r) => {
    if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
    if (selectedCell && (r.residualLikelihood !== selectedCell.l || r.residualSeverity !== selectedCell.s)) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.reference.toLowerCase().includes(q) ||
        r.activity.toLowerCase().includes(q) ||
        r.hazard.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'bg-red-600 text-white';
    if (score >= 10) return 'bg-amber-500 text-white';
    if (score >= 6) return 'bg-yellow-400 text-gray-900';
    return 'bg-emerald-600 text-white';
  };

  const getScoreRating = (score: number) => {
    if (score >= 15) return 'Critical Risk';
    if (score >= 10) return 'High Risk';
    if (score >= 6) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Enterprise Risk Register & 5×5 Risk Matrix</h2>
            <Badge variant="critical" size="sm">{riskAssessments.length} assessments</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Initial vs Residual risk evaluations, hierarchy of controls, and statutory review schedules
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedCell && (
            <button
              onClick={() => setSelectedCell(null)}
              className="px-2.5 py-1 bg-amber-100 text-amber-800 font-semibold rounded-lg text-xs hover:bg-amber-200"
            >
              Clear Heatmap Filter (L:{selectedCell.l}, S:{selectedCell.s})
            </button>
          )}

          <button
            onClick={() => exportToExcel('QHSE_Risk_Register', 'Risks', riskAssessments)}
            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel Export</span>
          </button>
        </div>
      </div>

      {/* 5x5 Heat Map Grid Visualization */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm text-[#172B25]">Interactive 5×5 Risk Matrix (Residual)</h3>
            <span className="text-[10px] text-gray-500">Click any cell to filter risk register</span>
          </div>

          <div className="flex items-center gap-2 flex-1">
            {/* Vertical Y-axis label */}
            <div className="text-[10px] font-bold text-gray-400 -rotate-90 whitespace-nowrap">
              LIKELIHOOD (1 to 5) →
            </div>

            {/* Matrix Table */}
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {[5, 4, 3, 2, 1].map((l) => (
                  <React.Fragment key={l}>
                    {[1, 2, 3, 4, 5].map((s) => {
                      const score = l * s;
                      const count = riskAssessments.filter(
                        (r) => r.residualLikelihood === l && r.residualSeverity === s
                      ).length;
                      const isSelected = selectedCell?.l === l && selectedCell?.s === s;

                      return (
                        <button
                          key={`${l}-${s}`}
                          onClick={() => setSelectedCell(isSelected ? null : { l, s })}
                          className={`h-11 rounded-lg flex flex-col items-center justify-center font-bold transition-all ${getScoreColor(
                            score
                          )} ${
                            isSelected ? 'ring-4 ring-black scale-105 shadow-lg' : 'hover:opacity-90'
                          }`}
                        >
                          <span className="text-[10px] opacity-80">{score}</span>
                          {count > 0 && (
                            <span className="text-[11px] font-extrabold bg-black/25 px-1.5 rounded-full">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>

              {/* Horizontal X-axis label */}
              <div className="text-center text-[10px] font-bold text-gray-400 mt-2">
                SEVERITY / CONSEQUENCE (1 to 5) →
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Legend & Scoring Rules */}
        <div className="lg:col-span-6 bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6] flex flex-col justify-between space-y-3">
          <div>
            <h4 className="font-bold text-xs text-[#172B25] mb-1">Standard 5×5 Scoring Thresholds:</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2 p-1.5 bg-red-100 text-red-900 rounded border border-red-200">
                <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                <span><strong>15 to 25:</strong> Critical (Stop work)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 bg-amber-100 text-amber-900 rounded border border-amber-200">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                <span><strong>10 to 14:</strong> High (Mandatory PTW)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 bg-yellow-100 text-yellow-900 rounded border border-yellow-200">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span><strong>6 to 9:</strong> Medium (Specific SOP)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 bg-emerald-100 text-emerald-900 rounded border border-emerald-200">
                <span className="w-3 h-3 bg-emerald-600 rounded-full"></span>
                <span><strong>1 to 5:</strong> Low (Acceptable)</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-600 leading-relaxed bg-white p-2.5 rounded-lg border border-gray-200">
            <strong>Hierarchy of Controls Applied:</strong> Elimination → Substitution → Engineering Controls (Barricades, Grates, Shoring) → Administrative Controls (PTW, Training, Shifts) → Personal Protective Equipment (PPE).
          </div>
        </div>
      </div>

      {/* Risk Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Ref</th>
                <th className="py-2.5 px-3 font-semibold">Activity & Hazard</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold text-center">Initial Score</th>
                <th className="py-2.5 px-3 font-semibold">Engineered & Additional Controls</th>
                <th className="py-2.5 px-3 font-semibold text-center">Residual Score</th>
                <th className="py-2.5 px-3 font-semibold">Risk Owner</th>
                <th className="py-2.5 px-3 font-semibold text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => {
                    setSelectedRisk(r);
                    setIsDetailOpen(true);
                  }}
                  className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">{r.reference}</td>
                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-bold text-gray-900 leading-snug">{r.activity}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{r.hazard}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">{r.location}</td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${getScoreColor(r.initialScore)}`}>
                      {r.initialScore} (L:{r.initialLikelihood} × S:{r.initialSeverity})
                    </span>
                  </td>
                  <td className="py-3 px-3 max-w-sm text-gray-700">
                    <p className="line-clamp-2 text-[11px]">{r.additionalControls}</p>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${getScoreColor(r.residualScore)}`}>
                      {r.residualScore} (L:{r.residualLikelihood} × S:{r.residualSeverity})
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">{r.riskOwner}</td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRisk(r);
                        setIsDetailOpen(true);
                      }}
                      className="px-2 py-1 bg-gray-100 hover:bg-[#073B2F] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Detail Modal */}
      {isDetailOpen && selectedRisk && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Risk Assessment: ${selectedRisk.reference}`}
          subtitle={`${selectedRisk.activity} — ${selectedRisk.location}`}
          maxWidth="4xl"
        >
          <div className="space-y-4 text-xs">
            <div className="bg-[#F4F7F5] p-3.5 rounded-xl border border-[#E3EAE6] space-y-1">
              <h4 className="font-bold text-gray-900 text-sm">Hazard Description:</h4>
              <p className="text-gray-700 leading-relaxed">{selectedRisk.hazard}</p>
              <div className="text-[11px] text-gray-500 pt-1">
                <strong>People Exposed:</strong> {selectedRisk.peopleExposed}
              </div>
            </div>

            {/* Comparison of Initial vs Residual Risk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-red-950">Initial Inherent Risk</h5>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getScoreColor(selectedRisk.initialScore)}`}>
                    Score: {selectedRisk.initialScore}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-red-900">
                  <div>Likelihood: <strong>{selectedRisk.initialLikelihood} of 5</strong></div>
                  <div>Severity: <strong>{selectedRisk.initialSeverity} of 5</strong></div>
                </div>
                <div>
                  <span className="font-bold text-[11px] text-red-950 block">Baseline Controls:</span>
                  <p className="text-[11px] text-red-900">{selectedRisk.existingControls}</p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-emerald-950">Residual Controlled Risk</h5>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getScoreColor(selectedRisk.residualScore)}`}>
                    Score: {selectedRisk.residualScore} ({getScoreRating(selectedRisk.residualScore)})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-900">
                  <div>Residual Likelihood: <strong>{selectedRisk.residualLikelihood} of 5</strong></div>
                  <div>Residual Severity: <strong>{selectedRisk.residualSeverity} of 5</strong></div>
                </div>
                <div>
                  <span className="font-bold text-[11px] text-emerald-950 block">Mandatory Additional Safeguards:</span>
                  <p className="text-[11px] text-emerald-900">{selectedRisk.additionalControls}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-gray-500 text-[11px]">
              <span>Risk Owner: <strong>{selectedRisk.riskOwner}</strong></span>
              <span>Next Review Date: <strong>{selectedRisk.reviewDate}</strong></span>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
