import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Scale,
  FileCheck2,
  CheckSquare,
  ThermometerSun,
  Building,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';
import { Badge } from '../../common/Badge';

export const AISearchModule: React.FC = () => {
  const { hazards, incidents, capas, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  const [query, setQuery] = useState('Have we previously reported similar hazards in Work Area A?');
  const [activeTopicId, setActiveTopicId] = useState<string>('area-a');

  // Structured Query Topics
  const topicCards = [
    {
      id: 'area-a',
      icon: '🏗️',
      title: 'Work Area A Hazards',
      subtitle: 'Floor voids, slab openings & height risks',
      badge: 'Recurring Patterns',
      query: 'Have we previously reported similar hazards in Work Area A?',
    },
    {
      id: 'heat',
      icon: '🌡️',
      title: 'MD 17/2021 Heat Stress',
      subtitle: 'Midday summer outdoor ban violations',
      badge: 'Qatar Statutory',
      query: 'Which heat stress observations were recorded under Qatar MD 17/2021?',
    },
    {
      id: 'capa',
      icon: '📋',
      title: 'Overdue CAPA Trajectories',
      subtitle: 'Actions pending supervisory verification',
      badge: 'Action Tracking',
      query: 'Which CAPA corrective actions are overdue or pending verification?',
    },
    {
      id: 'scaffold',
      icon: '🪜',
      title: 'Scaffold & Edge Safety',
      subtitle: 'Missing toe-boards, handrails & QCS rules',
      badge: 'Fall Protection',
      query: 'What were previous findings for work at height or scaffolding hazards?',
    },
  ];

  const handleSelectTopic = (topic: typeof topicCards[0]) => {
    setActiveTopicId(topic.id);
    setQuery(topic.query);
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
        c.rootCauseAddressed.toLowerCase().includes(q) ||
        (q.includes('work area a') && c.linkedRef === 'HAZ-2026-0042')
      );
    });

    return { matchedHazards, matchedIncidents, matchedCapas };
  };

  const { matchedHazards, matchedIncidents, matchedCapas } = performSearch();
  const totalMatches = matchedHazards.length + matchedIncidents.length + matchedCapas.length;

  // Determine structured synthesis intelligence based on query context
  const getStructuredSynthesis = () => {
    const q = query.toLowerCase();

    if (q.includes('work area a') || q.includes('void') || q.includes('floor')) {
      return {
        executiveInsight:
          'Active recurring hazard pattern detected in Work Area A concerning an unbarricaded 1.2m × 0.9m mechanical floor slab penetration on Level 2.',
        metricPillars: [
          {
            label: 'Primary Hazard',
            value: 'HAZ-2026-0042',
            sub: 'High Severity (Risk Score 16)',
            color: 'text-amber-800 bg-amber-50 border-amber-200',
            icon: AlertTriangle,
          },
          {
            label: 'Mitigation Status',
            value: 'CAPA-2026-0095',
            sub: 'Steel mesh cover bolted to slab',
            color: 'text-blue-800 bg-blue-50 border-blue-200',
            icon: CheckSquare,
          },
          {
            label: 'Statutory Standard',
            value: 'Law 14/2004 Art. 100',
            sub: 'Precautionary worker protection',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            icon: Scale,
          },
        ],
        recommendation:
          'Conduct physical torque inspection on mesh anchors and obtain Site Supervisor (Tariq Al-Mansoor) sign-off before de-barricading.',
      };
    }

    if (q.includes('heat') || q.includes('17/2021')) {
      return {
        executiveInsight:
          'Historical analysis confirms summer midday work ban triggers when Wet Bulb Globe Temperature (WBGT) exceeds statutory 32.1°C threshold.',
        metricPillars: [
          {
            label: 'Mandatory Ban',
            value: '10:00 – 15:30',
            sub: 'Seasonal ban: 1 June – 15 Sept',
            color: 'text-amber-800 bg-amber-50 border-amber-200',
            icon: ThermometerSun,
          },
          {
            label: 'Statutory Limit',
            value: 'WBGT > 32.1°C',
            sub: 'Universal mandatory work stoppage',
            color: 'text-red-800 bg-red-50 border-red-200',
            icon: AlertTriangle,
          },
          {
            label: 'Statutory Decree',
            value: 'MD 17 of 2021',
            sub: 'Ministry of Labour Heat Stress Order',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            icon: Scale,
          },
        ],
        recommendation:
          'Enforce 45m work / 15m shaded rest rotation and log hourly chilled electrolyte consumption in high-humidity zones.',
      };
    }

    if (q.includes('overdue') || q.includes('capa')) {
      return {
        executiveInsight:
          'CAPA corrective action velocity tracks at 92% on-time closure, with pending actions awaiting supervisory photographic verification.',
        metricPillars: [
          {
            label: 'Verified Actions',
            value: `${capas.filter((c) => c.status === 'Closed' || c.status === 'Verified').length} Closed`,
            sub: 'Engineering controls certified',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            icon: CheckCircle2,
          },
          {
            label: 'Under Review',
            value: `${capas.filter((c) => c.status === 'Submitted for Verification').length} Pending`,
            sub: 'Requires HSE Manager sign-off',
            color: 'text-blue-800 bg-blue-50 border-blue-200',
            icon: CheckSquare,
          },
          {
            label: 'Governance Target',
            value: '< 14 Days',
            sub: 'Standard close-out SLA',
            color: 'text-purple-800 bg-purple-50 border-purple-200',
            icon: Scale,
          },
        ],
        recommendation:
          'Review before-and-after photographic evidence in the CAPA Tracker module and execute digital sign-off.',
      };
    }

    return {
      executiveInsight: `Retrieved ${totalMatches} cross-record safety references matching search query "${query}".`,
      metricPillars: [
        {
          label: 'Matched Hazards',
          value: `${matchedHazards.length} Items`,
          sub: 'Field observations logged',
          color: 'text-amber-800 bg-amber-50 border-amber-200',
          icon: AlertTriangle,
        },
        {
          label: 'Corrective Actions',
          value: `${matchedCapas.length} Items`,
          sub: 'CAPA controls assigned',
          color: 'text-blue-800 bg-blue-50 border-blue-200',
          icon: CheckSquare,
        },
        {
          label: 'Incidents',
          value: `${matchedIncidents.length} Items`,
          sub: 'Formal reports on record',
          color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
          icon: Scale,
        },
      ],
      recommendation:
        'Select any matched card below to open its full investigation dossier and inspection records.',
    };
  };

  const synthesis = getStructuredSynthesis();

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Executive Header */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#073B2F] to-[#20A887] text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#172B25]">
                HSE Safety Intelligence & Semantic Search
              </h2>
              <span className="text-[10px] font-semibold bg-[#DDF5EA] text-[#073B2F] px-2.5 py-0.5 rounded-full border border-[#20A887]/30">
                AI Knowledge Engine
              </span>
            </div>
            <p className="text-xs text-[#65756D] mt-0.5">
              Query cross-incident memory, recurring worksite hazard patterns, and statutory compliance trajectories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-gray-500 font-mono bg-[#F4F7F5] px-3 py-1.5 rounded-xl border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Indexed: 40 Hazards • 25 Incidents</span>
          </div>

          <button
            onClick={() => setActiveDesktopModule('HSE AI Chat Copilot')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#073B2F] to-[#087F5B] text-white hover:opacity-95 transition-all shadow-sm active:scale-95 font-semibold text-xs border border-[#20A887]/40"
          >
            <MessageSquare className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>Launch AI Chat Copilot →</span>
          </button>
        </div>
      </div>

      {/* Structured Search Bar & Topic Cards */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3EAE6] shadow-sm space-y-3.5">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveTopicId('');
            }}
            placeholder="Ask natural language HSE question (e.g., Have we reported floor openings in Work Area A?)"
            className="w-full pl-10 pr-24 py-3 bg-[#F4F7F5] border border-gray-200 rounded-xl outline-none font-medium text-xs focus:ring-2 focus:ring-[#087F5B] focus:bg-white transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3 text-[11px] text-gray-400 hover:text-gray-600 bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded-md transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* 4 Structured Topic Cards */}
        <div>
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-2">
            Suggested Intelligence Queries:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {topicCards.map((topic) => {
              const isSelected = activeTopicId === topic.id || query === topic.query;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between gap-1.5 active:scale-98 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#073B2F] to-[#0A4537] text-white border-[#087F5B] shadow-md ring-2 ring-[#20A887]/40'
                      : 'bg-[#F4F7F5] hover:bg-white text-gray-800 border-gray-200 hover:border-gray-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{topic.icon}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                        isSelected
                          ? 'bg-white/15 text-emerald-200 border-white/20'
                          : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      {topic.badge}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs leading-tight">{topic.title}</h5>
                    <p
                      className={`text-[10px] mt-0.5 truncate ${
                        isSelected ? 'text-[#DDF5EA]/80' : 'text-gray-500'
                      }`}
                    >
                      {topic.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Structured AI Intelligence Dossier Card */}
      {query.trim() && (
        <div className="bg-white rounded-2xl border border-emerald-300/80 shadow-md overflow-hidden animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#0A4537] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span className="font-bold text-xs">AI Safety Synthesis Dossier</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="bg-white/15 text-emerald-200 px-2 py-0.5 rounded-full border border-white/10">
                Confidence: 98%
              </span>
              <span className="hidden sm:inline-block bg-black/30 text-white px-2 py-0.5 rounded-full border border-white/10">
                Deterministic Semantic Check
              </span>
            </div>
          </div>

          <div className="p-4 space-y-3.5">
            {/* Executive Takeaway Callout */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                Executive Safety Insight
              </span>
              <p className="text-xs text-gray-900 font-semibold leading-relaxed">
                {synthesis.executiveInsight}
              </p>
            </div>

            {/* 3 Structured Metric Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {synthesis.metricPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 ${pillar.color}`}
                  >
                    <IconComponent className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                        {pillar.label}
                      </span>
                      <strong className="text-xs font-black block truncate">{pillar.value}</strong>
                      <span className="text-[10px] block opacity-90 truncate mt-0.5">{pillar.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actionable AI Recommendation */}
            <div className="p-3 bg-[#F4F7F5] rounded-xl border border-gray-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#087F5B] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-gray-900 block">
                  Actionable HSE Recommendation:
                </span>
                <p className="text-[11px] text-gray-700 mt-0.5 leading-relaxed">
                  {synthesis.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Matched Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hazards Section */}
        <div className="bg-white p-4 rounded-2xl border border-[#E3EAE6] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
              <span>Matched Hazards & Observations</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded-full font-bold">
                {matchedHazards.length}
              </span>
            </h4>
            <span className="text-[10px] text-gray-400">1-Click Inspect</span>
          </div>

          {matchedHazards.length === 0 ? (
            <p className="text-gray-400 italic text-[11px] py-4 text-center">
              No hazard records matching query criteria.
            </p>
          ) : (
            <div className="space-y-2">
              {matchedHazards.slice(0, 3).map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    setActiveDesktopModule('Hazard Reporting');
                    setSelectedRecordRef(h.reference);
                  }}
                  className="p-3 bg-[#F4F7F5] hover:bg-emerald-50/50 rounded-xl border border-gray-200 hover:border-[#087F5B] cursor-pointer transition-all space-y-1.5 group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#073B2F] text-[11px]">{h.reference}</span>
                    <Badge variant={h.severity === 'High' ? 'high' : 'medium'} size="sm">
                      {h.severity}
                    </Badge>
                  </div>
                  <h5 className="font-bold text-gray-900 text-xs group-hover:text-[#087F5B] transition-colors line-clamp-1">
                    {h.title}
                  </h5>
                  <p className="text-[11px] text-gray-600 line-clamp-1 leading-snug">{h.description}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 pt-1 border-t border-gray-200/60">
                    <span>📍 {h.location}</span>
                    <span className="text-[#087F5B] font-semibold group-hover:underline flex items-center gap-0.5">
                      <span>Inspect Case</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Incidents & CAPA Section */}
        <div className="bg-white p-4 rounded-2xl border border-[#E3EAE6] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
              <span>Related Controls & CAPA Actions</span>
              <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded-full font-bold">
                {matchedCapas.length + matchedIncidents.length}
              </span>
            </h4>
            <span className="text-[10px] text-gray-400">Linked Trajectories</span>
          </div>

          <div className="space-y-2">
            {matchedCapas.slice(0, 3).map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setActiveDesktopModule('Corrective and Preventive Actions');
                  setSelectedRecordRef(c.reference);
                }}
                className="p-3 bg-[#F4F7F5] hover:bg-emerald-50/50 rounded-xl border border-gray-200 hover:border-[#087F5B] cursor-pointer transition-all space-y-1.5 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#073B2F] text-[11px]">{c.reference}</span>
                  <Badge variant={c.status === 'Closed' ? 'closed' : 'actionPending'} size="sm">
                    {c.status}
                  </Badge>
                </div>
                <h5 className="font-bold text-gray-900 text-xs group-hover:text-[#087F5B] transition-colors line-clamp-1">
                  {c.actionDescription}
                </h5>
                <div className="flex justify-between items-center text-[10px] text-gray-500 pt-1 border-t border-gray-200/60">
                  <span>Linked: {c.linkedRef}</span>
                  <span className="text-[#087F5B] font-semibold group-hover:underline flex items-center gap-0.5">
                    <span>View in CAPA</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
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
                className="p-3 bg-red-50/50 rounded-xl border border-red-200 cursor-pointer transition-all space-y-1.5 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-red-900 text-[11px]">{i.reference}</span>
                  <Badge variant="critical" size="sm">
                    {i.incidentType}
                  </Badge>
                </div>
                <h5 className="font-bold text-gray-900 text-xs line-clamp-1">{i.title}</h5>
                <div className="flex justify-between items-center text-[10px] text-gray-500 pt-1 border-t border-red-200/60">
                  <span>📍 {i.location}</span>
                  <span className="text-red-700 font-semibold flex items-center gap-0.5">
                    <span>Review Incident</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}

            {matchedCapas.length === 0 && matchedIncidents.length === 0 && (
              <div className="p-3 bg-white rounded-xl border border-gray-200 text-center text-gray-500 text-[11px]">
                No linked incidents or overdue actions for this query.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
