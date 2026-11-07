import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { Sparkles, Search, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { Badge } from '../../common/Badge';

export const AISearchModule: React.FC = () => {
  const { hazards, incidents, nearMisses, capas, inspections, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  const [query, setQuery] = useState('');
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const presets = [
    'Have we previously reported similar hazards in Work Area A?',
    'Which locations have repeated safety observations or floor void penetrations?',
    'Which CAPA corrective actions are overdue or pending verification?',
    'What were previous findings for work at height or scaffolding hazards?',
    'Which heat stress observations were recorded under Qatar MD 17/2021?',
    'Which inspections identified repeated failures?',
  ];

  const handleSelectPreset = (p: string) => {
    setActivePreset(p);
    setQuery(p);
  };

  // Deterministic Local Semantic Search
  const performSearch = () => {
    const q = (query || '').toLowerCase();

    const matchedHazards = hazards.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        (q.includes('work area a') && h.location === 'Work Area A') ||
        (q.includes('void') && h.category === 'Work at height') ||
        (q.includes('floor') && h.title.toLowerCase().includes('floor')) ||
        (q.includes('heat') && h.category === 'Heat stress') ||
        (q.includes('height') && h.category === 'Work at height')
    );

    const matchedIncidents = incidents.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        (q.includes('heat') && i.title.toLowerCase().includes('heat')) ||
        (q.includes('fall') && i.incidentType === 'Work-at-height incident')
    );

    const matchedCapas = capas.filter((c) => {
      if (q.includes('overdue')) return c.status !== 'Closed' && c.dueDate < '2026-11-07';
      if (q.includes('verification')) return c.status === 'Submitted for Verification';
      return (
        c.actionDescription.toLowerCase().includes(q) ||
        c.rootCauseAddressed.toLowerCase().includes(q)
      );
    });

    return { matchedHazards, matchedIncidents, matchedCapas };
  };

  const { matchedHazards, matchedIncidents, matchedCapas } = performSearch();
  const totalMatches = matchedHazards.length + matchedIncidents.length + matchedCapas.length;

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#073B2F] to-[#20A887] text-white flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#172B25]">AI-Assisted Historical HSE Search</h2>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                Local Prototype
              </span>
            </div>
            <p className="text-xs text-[#65756D] mt-0.5">
              Query cross-incident memory, recurring hazard patterns and overdue CAPA trajectories across local records
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Prototype Label Notice */}
      <div className="bg-emerald-50/80 border-l-4 border-[#087F5B] p-3 rounded-r-xl text-xs text-[#073B2F] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
          <span>AI-assisted demonstration analysis — HSE review required. No external cloud AI API connected.</span>
        </div>
        <span className="text-[10px] bg-white px-2 py-0.5 rounded border font-mono">
          Deterministic Local Search
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask natural language HSE question (e.g. Have we reported floor openings in Work Area A?)"
            className="w-full pl-10 pr-4 py-2.5 bg-[#F4F7F5] border border-[#E3EAE6] rounded-xl outline-none font-medium text-xs focus:ring-1 focus:ring-[#087F5B]"
          />
        </div>

        {/* Suggested Queries */}
        <div>
          <span className="text-[11px] font-bold text-gray-700 block mb-1.5">
            Suggested Demonstrations Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`px-2.5 py-1 rounded-lg text-[11px] text-left transition-colors ${
                  query === p
                    ? 'bg-[#073B2F] text-white font-semibold'
                    : 'bg-[#F4F7F5] text-gray-700 hover:bg-gray-200 border border-[#E3EAE6]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Synthesis Summary Card */}
      {query.trim() && (
        <div className="bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-white p-4 rounded-xl border border-emerald-200 shadow-sm space-y-2">
          <div className="flex items-center gap-1.5 text-[#073B2F] font-bold text-xs">
            <Sparkles className="w-4 h-4 text-[#20A887]" />
            <span>Demonstration AI Analysis Summary</span>
          </div>

          <p className="text-gray-800 leading-relaxed text-[11px]">
            Found <strong>{totalMatches} matching historical safety records</strong> related to "{query}". Analysis identifies active case{' '}
            <strong className="text-[#073B2F] font-mono">HAZ-2026-0042</strong> in Work Area A concerning an uncovered floor opening, currently mitigated by CAPA-2026-0095 (Steel mesh installation). Similar work-at-height observations were logged on Level 2 and Elevation 4 scaffolding.
          </p>
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hazards Section */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 text-xs">Matched Hazards ({matchedHazards.length})</h4>
            <span className="text-[10px] text-gray-400">Click to view in module</span>
          </div>

          {matchedHazards.length === 0 ? (
            <p className="text-gray-400 italic text-[11px]">No hazards matching query criteria.</p>
          ) : (
            <div className="space-y-2">
              {matchedHazards.slice(0, 4).map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    setActiveDesktopModule('Hazard Reporting');
                    setSelectedRecordRef(h.reference);
                  }}
                  className="p-2.5 bg-[#F4F7F5] hover:bg-emerald-50/50 rounded-lg border border-gray-200 hover:border-[#087F5B] cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#073B2F] text-[11px]">{h.reference}</span>
                    <Badge variant={h.severity === 'High' ? 'high' : 'medium'} size="sm">
                      {h.severity}
                    </Badge>
                  </div>
                  <h5 className="font-bold text-gray-900 text-xs mt-1">{h.title}</h5>
                  <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">{h.description}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                    <span>📍 {h.location}</span>
                    <span className="text-[#087F5B] font-semibold">Inspect Case →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Incidents & CAPA Section */}
        <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 text-xs">
              Matched Incidents & Corrective Actions ({matchedIncidents.length + matchedCapas.length})
            </h4>
            <span className="text-[10px] text-gray-400">Related Controls</span>
          </div>

          <div className="space-y-2">
            {matchedCapas.slice(0, 3).map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setActiveDesktopModule('Corrective and Preventive Actions');
                  setSelectedRecordRef(c.reference);
                }}
                className="p-2.5 bg-[#F4F7F5] hover:bg-emerald-50/50 rounded-lg border border-gray-200 hover:border-[#087F5B] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#073B2F] text-[11px]">{c.reference}</span>
                  <Badge variant={c.status === 'Closed' ? 'closed' : 'actionPending'} size="sm">
                    {c.status}
                  </Badge>
                </div>
                <h5 className="font-bold text-gray-900 text-xs mt-1">{c.actionDescription}</h5>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                  <span>Linked: {c.linkedRef}</span>
                  <span>Owner: {c.actionOwner}</span>
                </div>
              </div>
            ))}

            {matchedIncidents.slice(0, 2).map((i) => (
              <div
                key={i.id}
                onClick={() => {
                  setActiveDesktopModule('Incident Management');
                  setSelectedRecordRef(i.reference);
                }}
                className="p-2.5 bg-red-50/50 rounded-lg border border-red-200 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-red-900 text-[11px]">{i.reference}</span>
                  <Badge variant="critical" size="sm">{i.incidentType}</Badge>
                </div>
                <h5 className="font-bold text-gray-900 text-xs mt-1">{i.title}</h5>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                  <span>📍 {i.location}</span>
                  <span className="text-red-700 font-semibold">Review Incident →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
