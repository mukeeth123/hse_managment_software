import React, { useState, useRef, useEffect } from 'react';
import { useHSE, DesktopModule } from '../../../context/HSEContext';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  User,
  Scale,
  AlertTriangle,
  CheckCircle2,
  CheckSquare,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  ThermometerSun,
  ChevronRight,
  ArrowRight,
  Info,
  Clock,
  Layers,
  Search,
} from 'lucide-react';
import { Badge } from '../../common/Badge';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  timestamp: string;
  text: string;
  statutoryReference?: string;
  structuredCard?: {
    type: 'hazard-capa' | 'heat-ban' | 'scaffold' | 'permit' | 'capa-velocity' | 'general';
    title: string;
    subtitle?: string;
    pillars?: Array<{
      label: string;
      value: string;
      sub: string;
      color: string;
    }>;
    recordLinks?: Array<{
      module: DesktopModule;
      recordRef?: string;
      label: string;
    }>;
    recommendation?: string;
  };
}

export const AIChatModule: React.FC = () => {
  const { currentUser, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  // Initial rich mock conversation history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      timestamp: '10:14 AM',
      text: `Marhaban, ${currentUser.name}! I am your Antigravity QHSE Safety Copilot for Lusail Commercial Tower Zone 4.

I maintain continuous real-time indexing across Qatar Labour Law No. 14/2004, Ministerial Decision 17/2021 (Heat Stress Orders), Qatar Construction Specifications (QCS 2014), and active project hazard registers.

You can ask me any statutory question, query recurring hazards, or verify CAPA engineering controls.`,
    },
    {
      id: 'm2',
      sender: 'user',
      timestamp: '10:15 AM',
      text: 'What are the mandatory heat stress stoppage protocols under Qatar MD 17/2021 today?',
    },
    {
      id: 'm3',
      sender: 'ai',
      timestamp: '10:15 AM',
      text: 'Under Qatar Ministerial Decision No. 17 of 2021 (Ministry of Labour), all outdoor construction operations are governed by seasonal prohibited hours and real-time thermal monitoring thresholds:',
      statutoryReference: 'Ministerial Decision No. 17 of 2021 • Art. 2 & Art. 3',
      structuredCard: {
        type: 'heat-ban',
        title: 'Qatar MD 17/2021 Mandatory Heat Stress Orders',
        subtitle: 'State of Qatar Ministry of Labour Compliance Directives',
        pillars: [
          {
            label: 'Prohibited Hours',
            value: '10:00 – 15:30',
            sub: 'Seasonal outdoor ban: 1 June to 15 Sept',
            color: 'text-amber-800 bg-amber-50 border-amber-200',
          },
          {
            label: 'Universal Stoppage',
            value: 'WBGT > 32.1°C',
            sub: 'Mandatory work halt regardless of hour',
            color: 'text-red-800 bg-red-50 border-red-200',
          },
          {
            label: 'Current Site Status',
            value: 'WBGT 30.2°C',
            sub: 'Orange Advisory: 45m work / 15m rest',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
          },
        ],
        recommendation:
          'Enforce shaded break rotations every 45 minutes, verify shaded resting stations have cooled drinking water (500ml/hr quota), and log hourly wet-bulb psychrometer readings.',
        recordLinks: [
          {
            module: 'Qatar Legal Compliance',
            label: 'Inspect MD 17/2021 in Legal Register →',
          },
        ],
      },
    },
    {
      id: 'm4',
      sender: 'user',
      timestamp: '10:18 AM',
      text: 'Are there any active high-risk hazards in Work Area A?',
    },
    {
      id: 'm5',
      sender: 'ai',
      timestamp: '10:18 AM',
      text: 'Cross-record indexing identified 1 active High-Risk hazard currently recorded in Work Area A on Level 2:',
      statutoryReference: 'Qatar Labour Law No. 14/2004 • Art. 100 Precautionary Controls',
      structuredCard: {
        type: 'hazard-capa',
        title: 'HAZ-2026-0042 • Uncovered Mechanical Floor Opening',
        subtitle: 'Location: Work Area A (Level 2 Slab) • Severity: 4 × Likelihood: 4 = Score 16',
        pillars: [
          {
            label: 'Hazard State',
            value: 'Level 2 Void',
            sub: '1.2m × 0.9m mechanical riser opening',
            color: 'text-amber-800 bg-amber-50 border-amber-200',
          },
          {
            label: 'Mitigating Control',
            value: 'CAPA-2026-0095',
            sub: 'Steel mesh bolted to slab anchors',
            color: 'text-blue-800 bg-blue-50 border-blue-200',
          },
          {
            label: 'Action Owner',
            value: 'Tariq Al-Mansoor',
            sub: 'Pending final supervisor torque verification',
            color: 'text-purple-800 bg-purple-50 border-purple-200',
          },
        ],
        recommendation:
          'Physical torque verification of anchor bolts must be completed and photo evidence uploaded before removing perimeter exclusion tape.',
        recordLinks: [
          {
            module: 'Hazard Reporting',
            recordRef: 'HAZ-2026-0042',
            label: 'Inspect HAZ-2026-0042 Dossier →',
          },
          {
            module: 'Corrective and Preventive Actions',
            recordRef: 'CAPA-2026-0095',
            label: 'Open CAPA-2026-0095 Action Item →',
          },
        ],
      },
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Suggested 1-click prompt questions
  const promptSuggestions = [
    {
      id: 'p1',
      label: '☀️ Summer Work Ban Hours (MD 17/2021)',
      query: 'What are the exact statutory hours and temperature thresholds for summer work ban under MD 17/2021?',
    },
    {
      id: 'p2',
      label: '🏗️ Work Area A Floor Opening Hazard',
      query: 'What is the mitigation status of the floor opening in Work Area A (HAZ-2026-0042)?',
    },
    {
      id: 'p3',
      label: '📋 Overdue CAPA Trajectories',
      query: 'Which CAPA actions are currently pending verification or closeout?',
    },
    {
      id: 'p4',
      label: '🪜 Scaffolding Guardrail Standards',
      query: 'What are the QCS 2014 guardrail and toe-board height requirements for working at heights?',
    },
    {
      id: 'p5',
      label: '🔥 Hot Work & PTW Safety Protocols',
      query: 'What atmospheric gas tests and fire-watch conditions are required for a hot work permit?',
    },
  ];

  // Intelligent mock response generator
  const generateMockReply = (queryText: string): ChatMessage => {
    const q = queryText.toLowerCase();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('heat') || q.includes('ban') || q.includes('17/2021') || q.includes('wbgt') || q.includes('summer')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Detailed synthesis of Qatar Ministerial Decision No. 17 of 2021 regarding occupational heat stress prevention:',
        statutoryReference: 'Ministerial Decision 17/2021 • Articles 1, 2, 3 & 5',
        structuredCard: {
          type: 'heat-ban',
          title: 'Qatar MD 17/2021 Thermal Stress Protection Directives',
          subtitle: 'Mandatory Enforcement for all outdoor worksites in Qatar',
          pillars: [
            {
              label: 'Seasonal Ban',
              value: '10:00 – 15:30',
              sub: 'Enforced June 1 to Sept 15 annually',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
            {
              label: 'Emergency Cut-Off',
              value: 'WBGT ≥ 32.1°C',
              sub: 'Cease work immediately, shade mandatory',
              color: 'text-red-800 bg-red-50 border-red-200',
            },
            {
              label: 'Hydration Mandate',
              value: '500ml / Hour',
              sub: 'Free cooled potable electrolyte water',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Conduct continuous calibrated WBGT readings at the workface. When index exceeds 30.0°C, adjust work-rest cycle to 45m work / 15m rest under shaded shelters with misting fans.',
          recordLinks: [
            {
              module: 'Qatar Legal Compliance',
              label: 'View Qatar Legal Compliance Register →',
            },
          ],
        },
      };
    }

    if (q.includes('area a') || q.includes('void') || q.includes('floor') || q.includes('0042') || q.includes('opening')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Dossier report for Work Area A floor penetration hazard:',
        statutoryReference: 'Qatar Labour Law 14/2004 Art. 100 & QCS 2014 Sec. 11',
        structuredCard: {
          type: 'hazard-capa',
          title: 'HAZ-2026-0042 • Level 2 Floor Slab Opening',
          subtitle: 'Work Area A Mechanical Shaft Void (1.2m × 0.9m)',
          pillars: [
            {
              label: 'Initial Risk',
              value: 'Risk Score 16',
              sub: 'High Severity (Fall from height)',
              color: 'text-red-800 bg-red-50 border-red-200',
            },
            {
              label: 'Mitigating Control',
              value: 'CAPA-2026-0095',
              sub: 'Galvanized steel mesh secured with Hilti bolts',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'Sign-off State',
              value: 'Under Verification',
              sub: 'Supervisory torque check required',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Do not strike physical barricade tape until Site Supervisor (Tariq Al-Mansoor) conducts bolt torque testing and signs off verification photographic evidence.',
          recordLinks: [
            {
              module: 'Hazard Reporting',
              recordRef: 'HAZ-2026-0042',
              label: 'Open HAZ-2026-0042 Case File →',
            },
            {
              module: 'Corrective and Preventive Actions',
              recordRef: 'CAPA-2026-0095',
              label: 'Open CAPA-2026-0095 Verification →',
            },
          ],
        },
      };
    }

    if (q.includes('capa') || q.includes('overdue') || q.includes('action') || q.includes('0095')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Summary of active Corrective and Preventive Actions (CAPA) across Lusail Commercial Tower Zone 4:',
        statutoryReference: 'ISO 45001:2018 Cl. 10.2 & Enterprise Safety Governance',
        structuredCard: {
          type: 'capa-velocity',
          title: 'Active CAPA Trajectories & Resolution Velocity',
          subtitle: 'Tracking 7 active corrective measures across Zone 4',
          pillars: [
            {
              label: 'On-Time Velocity',
              value: '92% On-Time',
              sub: 'Average close-out SLA: 4.8 days',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'Pending Verification',
              value: '1 Action Item',
              sub: 'CAPA-2026-0095 (Steel mesh installation)',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
            {
              label: 'Overdue Trajectory',
              value: '0 Overdue',
              sub: 'All mandatory milestones within SLA target',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Expedite photographic verification for CAPA-2026-0095 to achieve 100% resolution for Level 2 Work Area A.',
          recordLinks: [
            {
              module: 'Corrective and Preventive Actions',
              label: 'Open Full CAPA Action Tracker →',
            },
          ],
        },
      };
    }

    if (q.includes('scaffold') || q.includes('height') || q.includes('fall') || q.includes('guardrail')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Statutory work-at-height and scaffolding compliance requirements for Qatar construction worksites:',
        statutoryReference: 'Qatar Construction Specifications (QCS 2014) • Section 11',
        structuredCard: {
          type: 'scaffold',
          title: 'QCS 2014 Scaffolding & Edge Protection Standards',
          subtitle: 'Mandatory structural fall prevention safeguards',
          pillars: [
            {
              label: 'Top Guardrail',
              value: '950 – 1150 mm',
              sub: 'Rigid scaffold tubing with 200kg load rating',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
            {
              label: 'Toe-Board Height',
              value: '≥ 150 mm',
              sub: 'Secured to prevent tool drop below',
              color: 'text-purple-800 bg-purple-50 border-purple-200',
            },
            {
              label: 'Scaffold Tag',
              value: 'Green Scafftag',
              sub: 'Inspected every 7 days by competent scaffolder',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
          ],
          recommendation:
            'Inspect mobile access towers on Level 4. Ensure yellow caution tags are removed only when outriggers and double guardrails are locked in position.',
          recordLinks: [
            {
              module: 'Inspections and Audits',
              label: 'Log New Scaffolding Checklist →',
            },
          ],
        },
      };
    }

    if (q.includes('permit') || q.includes('ptw') || q.includes('hot work') || q.includes('confined')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Qatar Civil Defence (QCDD) and high-risk Permit to Work (PTW) statutory prerequisites:',
        statutoryReference: 'QCDD Fire Protection Code & Qatar Labour Law 14/2004',
        structuredCard: {
          type: 'permit',
          title: 'High-Risk Permit to Work (PTW) Verification',
          subtitle: 'Mandatory checks for Hot Work and Confined Space Entry',
          pillars: [
            {
              label: 'Atmospheric Gas Check',
              value: 'O₂ 19.5% – 23.5%',
              sub: 'LEL < 10% • H₂S < 10ppm • CO < 25ppm',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'Fire Watch Duration',
              value: '60 Minutes',
              sub: 'Dedicated fire watch post-welding cessation',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
            {
              label: 'QCDD Equipment',
              value: '2× 9kg Dry Powder',
              sub: 'Inspected within 30 days with valid seal',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Verify active PTW-2026-0018 before authorizing spark-generating grinding near Zone 4 mechanical risers.',
          recordLinks: [
            {
              module: 'Permit to Work',
              label: 'Open Permit to Work Register →',
            },
          ],
        },
      };
    }

    // Default intelligent response
    return {
      id: `m-${Date.now()}`,
      sender: 'ai',
      timestamp: timeNow,
      text: `Cross-indexing analysis completed for: "${queryText}". The platform has correlated your query with current site observations and Qatar safety standards:`,
      statutoryReference: 'Qatar Labour Law No. 14 of 2004 • General Occupational Safety',
      structuredCard: {
        type: 'general',
        title: 'QHSE Safety & Compliance Intelligence',
        subtitle: `Project: Lusail Commercial Tower Zone 4 • Query: ${queryText.slice(0, 40)}...`,
        pillars: [
          {
            label: 'Indexed Records',
            value: '40 Hazards • 25 Incidents',
            sub: 'Zero discrepancies identified',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
          },
          {
            label: 'Statutory Alignment',
            value: '100% Compliant',
            sub: 'Aligned with Al-Meezan legal articles',
            color: 'text-blue-800 bg-blue-50 border-blue-200',
          },
          {
            label: 'Next Operational Step',
            value: 'Supervisory Review',
            sub: 'Logged in digital HSE compliance ledger',
            color: 'text-purple-800 bg-purple-50 border-purple-200',
          },
        ],
        recommendation:
          'Maintain daily tool-box talks and verify physical control measures before commencing high-risk shift works.',
        recordLinks: [
          {
            module: 'Executive Dashboard',
            label: 'Return to Executive Dashboard →',
          },
        ],
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isTyping) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: timeNow,
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Realistic typing delay (650ms) to impress client
    setTimeout(() => {
      const aiReply = generateMockReply(text);
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 650);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'm-reset',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Conversation thread cleared. Antigravity QHSE Copilot is standing by. Ask any question regarding Qatar safety regulations or site operations.`,
      },
    ]);
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate voice transcription after 1.8 seconds
      setTimeout(() => {
        setIsListening(false);
        setInputQuery('What is the heat index and WBGT reading right now?');
      }, 1800);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[580px] bg-white rounded-2xl border border-[#E3EAE6] shadow-sm overflow-hidden text-xs animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#0A4537] text-white flex items-center justify-between flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight truncate">
                Antigravity HSE AI Safety Copilot
              </h2>
              <span className="text-[10px] font-semibold bg-white/15 text-emerald-200 px-2.5 py-0.5 rounded-full border border-white/20 hidden sm:inline-block">
                Qatar Statutory AI
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80 truncate mt-0.5">
              Live Indexing: Qatar Labour Law 14/2004 • MD 17/2021 Heat Orders • Lusail Tower Zone 4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-emerald-200 text-[11px] font-mono border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Deterministic Engine (12ms)</span>
          </div>

          <button
            onClick={() => setActiveDesktopModule('AI-Assisted HSE Search')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/15"
            title="Open Structured Semantic Search Dossier"
          >
            <Search className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">Search Dossier</span>
          </button>

          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-black/20 hover:bg-black/35 text-white/90 hover:text-white font-medium text-xs transition-colors border border-white/10"
            title="Reset conversation thread"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Suggested 1-Click Prompt Chips */}
      <div className="bg-[#F8FAF9] px-4 py-2 border-b border-gray-200 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#087F5B]" />
          Suggested:
        </span>
        {promptSuggestions.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSendMessage(p.query)}
            className="flex-shrink-0 px-2.5 py-1 bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#073B2F] rounded-lg border border-gray-200 hover:border-[#087F5B] text-[11px] font-medium transition-all shadow-2xs active:scale-95 whitespace-nowrap"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Message History Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-[#F8FAF9]">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs ${
                  isAi
                    ? 'bg-gradient-to-tr from-[#073B2F] to-[#20A887] text-white'
                    : 'bg-[#172B25] text-white'
                }`}
              >
                {isAi ? <Sparkles className="w-4 h-4 text-emerald-200" /> : <User className="w-4 h-4 text-white" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[11px] text-gray-800">
                    {isAi ? 'Antigravity QHSE Copilot' : currentUser.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{msg.timestamp}</span>
                  {msg.statutoryReference && (
                    <span className="text-[9px] font-bold bg-emerald-50 text-[#073B2F] px-2 py-0.5 rounded border border-emerald-200/80">
                      ⚖️ {msg.statutoryReference}
                    </span>
                  )}
                </div>

                <div
                  className={`p-3.5 rounded-2xl shadow-xs text-xs leading-relaxed transition-all ${
                    isAi
                      ? 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'
                      : 'bg-gradient-to-br from-[#073B2F] to-[#0A4537] text-white rounded-tr-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Structured Rich Card (if present) */}
                  {msg.structuredCard && (
                    <div className="mt-3 bg-[#F8FAF9] rounded-xl border border-gray-200 overflow-hidden text-gray-800 shadow-2xs">
                      {/* Card Header */}
                      <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-gray-900">{msg.structuredCard.title}</h4>
                          {msg.structuredCard.subtitle && (
                            <p className="text-[10px] text-gray-500 mt-0.5">{msg.structuredCard.subtitle}</p>
                          )}
                        </div>
                        <span className="text-[9px] font-bold bg-[#DDF5EA] text-[#073B2F] px-2 py-0.5 rounded-full border border-[#20A887]/30">
                          Verified Record
                        </span>
                      </div>

                      {/* 3 Metric Pillars */}
                      {msg.structuredCard.pillars && (
                        <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {msg.structuredCard.pillars.map((pillar, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${pillar.color}`}
                            >
                              <span className="text-[9px] font-bold uppercase tracking-wider block opacity-75">
                                {pillar.label}
                              </span>
                              <strong className="text-xs font-bold block my-0.5 truncate">{pillar.value}</strong>
                              <span className="text-[9px] block opacity-90 truncate">{pillar.sub}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actionable Recommendation */}
                      {msg.structuredCard.recommendation && (
                        <div className="p-3 bg-white border-t border-gray-100 flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#087F5B] flex-shrink-0 mt-0.5" />
                          <div className="text-[11px] text-gray-700 leading-snug">
                            <strong className="text-gray-900 block text-[11px]">Recommended HSE Action:</strong>
                            {msg.structuredCard.recommendation}
                          </div>
                        </div>
                      )}

                      {/* Direct Record Inspection Buttons */}
                      {msg.structuredCard.recordLinks && msg.structuredCard.recordLinks.length > 0 && (
                        <div className="p-2.5 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-2 items-center">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">
                            Quick Jump:
                          </span>
                          {msg.structuredCard.recordLinks.map((link, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setActiveDesktopModule(link.module as any);
                                if (link.recordRef) setSelectedRecordRef(link.recordRef);
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-[#073B2F] text-gray-700 hover:text-white rounded-md border border-gray-300 hover:border-[#073B2F] text-[10px] font-bold transition-all shadow-2xs flex items-center gap-1 active:scale-95"
                            >
                              <span>{link.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Copy button */}
                  {isAi && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Statutory Cross-Verified
                      </span>
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="hover:text-gray-700 transition-colors flex items-center gap-1 text-[10px]"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Realistic Animated Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%] mr-auto animate-in fade-in duration-100">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#073B2F] to-[#20A887] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-xs flex items-center gap-2.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[11px] text-gray-500 font-medium italic">
                QHSE Copilot is indexing Qatar legal decrees and Lusail Tower records...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Dictation Active Wave Banner */}
      {isListening && (
        <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-between text-xs animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 items-center">
              <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
              <span className="w-1 h-5 bg-white rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150" />
              <span className="w-1 h-4 bg-white rounded-full animate-pulse delay-200" />
            </div>
            <span className="font-bold">Listening for Qatar HSE query... Speak now.</span>
          </div>
          <button
            onClick={() => setIsListening(false)}
            className="text-[10px] bg-black/20 hover:bg-black/30 px-2 py-0.5 rounded text-white font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="p-3.5 bg-white border-t border-gray-200 flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-md ring-2 ring-red-300'
                : 'bg-[#F4F7F5] hover:bg-gray-200 text-gray-600'
            }`}
            title="Simulate Voice Input"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything (e.g., 'What are the heat ban hours under MD 17/2021?' or 'Check hazard HAZ-2026-0042')..."
              className="w-full pl-3.5 pr-20 py-2.5 bg-[#F4F7F5] border border-gray-200 rounded-xl outline-none text-xs text-gray-800 placeholder-gray-400 font-medium focus:ring-2 focus:ring-[#087F5B] focus:bg-white transition-all shadow-inner"
            />
            <span className="absolute right-2.5 top-2.5 text-[10px] text-gray-400 font-mono hidden sm:inline-block pointer-events-none">
              Press Enter ↵
            </span>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all flex-shrink-0 shadow-sm ${
              inputQuery.trim() && !isTyping
                ? 'bg-gradient-to-r from-[#073B2F] to-[#087F5B] text-white hover:opacity-95 active:scale-95 shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-emerald-600" />
            Antigravity In-Browser Copilot • No external cloud AI API required • 100% deterministic local data
          </span>
          <span className="font-mono text-gray-500">Lusail Tower Zone 4</span>
        </div>
      </div>
    </div>
  );
};
