import React, { useState, useRef, useEffect } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Sparkles,
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  User,
  Scale,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export interface MobileChatMessage {
  id: string;
  sender: 'ai' | 'user';
  timestamp: string;
  text: string;
  badge?: string;
  recordRef?: string;
}

export const MobileChatScreen: React.FC = () => {
  const { currentUser, setMobileScreen } = useHSE();

  const [messages, setMessages] = useState<MobileChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      timestamp: '10:14 AM',
      text: `Marhaban, ${currentUser.name}! I am your AI Safety Copilot for Lusail Commercial Tower Zone 4. Ask me about Qatar heat stress rules, active hazards, or PPE standards.`,
      badge: 'Qatar Statutory AI',
    },
    {
      id: 'm2',
      sender: 'user',
      timestamp: '10:15 AM',
      text: 'What are the heat stress ban hours under Qatar MD 17/2021?',
    },
    {
      id: 'm3',
      sender: 'ai',
      timestamp: '10:15 AM',
      text: `Under Qatar Ministerial Decision 17/2021:
• 10:00 to 15:30: All outdoor work prohibited (1 June - 15 Sept).
• WBGT > 32.1°C: Universal stoppage regardless of time.
• Current Reading: WBGT 30.2°C (45 min work / 15 min shaded rest with 500ml chilled water/hr).`,
      badge: 'MD 17/2021 Stoppage Order',
    },
    {
      id: 'm4',
      sender: 'user',
      timestamp: '10:17 AM',
      text: 'Check status of floor opening in Work Area A',
    },
    {
      id: 'm5',
      sender: 'ai',
      timestamp: '10:17 AM',
      text: `Record HAZ-2026-0042 (Level 2 mechanical riser void):
• Risk: High (Score 16)
• Control: CAPA-2026-0095 steel mesh cover bolted to slab.
• Status: Awaiting physical torque verification sign-off by Tariq Al-Mansoor before tape removal.`,
      badge: 'HAZ-2026-0042 & CAPA-2026-0095',
      recordRef: 'HAZ-2026-0042',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPills = [
    { label: '☀️ Heat Ban Hours', query: 'What are the outdoor work ban hours today?' },
    { label: '🏗️ Work Area A Void', query: 'Check status of floor opening in Work Area A' },
    { label: '📋 Pending CAPAs', query: 'Are there any overdue CAPA actions in Zone 4?' },
    { label: '🪜 Scaffolding QCS', query: 'What is the minimum guardrail height under QCS 2014?' },
  ];

  const handleSend = (queryText?: string) => {
    const text = (queryText || inputVal).trim();
    if (!text || isTyping) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: 'user',
        timestamp: time,
        text,
      },
    ]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const q = text.toLowerCase();
      let replyText = `Cross-indexing analysis completed for "${text}". Correlated against Qatar Labour Law No. 14/2004 and Lusail Tower Zone 4 records. All controls compliant.`;
      let badge = 'Statutory Verified';

      if (q.includes('heat') || q.includes('ban') || q.includes('wbgt') || q.includes('summer')) {
        replyText = `Under Qatar Ministerial Decision 17/2021:
• 10:00 to 15:30: Outdoor work prohibited from 1 June to 15 Sept.
• WBGT > 32.1°C: Universal mandatory stoppage.
• Current Site Index: WBGT 30.2°C (Orange Advisory: 45 min work / 15 min shaded rest).`;
        badge = 'MD 17/2021 Heat Rule';
      } else if (q.includes('area a') || q.includes('void') || q.includes('opening') || q.includes('0042')) {
        replyText = `HAZ-2026-0042 (Work Area A Floor Void):
• 1.2m × 0.9m floor slab opening on Level 2.
• Mitigated by CAPA-2026-0095 (galvanized steel mesh bolted to slab).
• Status: Pending torque sign-off by Site Supervisor Tariq Al-Mansoor.`;
        badge = 'HAZ-2026-0042 / CAPA-2026-0095';
      } else if (q.includes('capa') || q.includes('overdue')) {
        replyText = `Zone 4 CAPA Tracking:
• Active Actions: 7 items
• On-Time Closure Rate: 92%
• Pending Verification: CAPA-2026-0095 (Work Area A)
• Zero overdue milestones currently.`;
        badge = 'CAPA Resolution SLA';
      } else if (q.includes('scaffold') || q.includes('height') || q.includes('qcs')) {
        replyText = `QCS 2014 Scaffolding Directives:
• Top guardrail: 950mm - 1150mm.
• Mid rail required.
• Toe-board height: ≥ 150mm.
• Green Scafftag required every 7 days.`;
        badge = 'QCS 2014 Section 11';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: replyText,
          badge,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const toggleVoice = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputVal('What is the current WBGT heat index?');
      }, 1600);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F4F7F5] text-xs">
      {/* Mobile Top Header */}
      <div className="bg-[#073B2F] text-white px-3.5 py-3 flex items-center justify-between border-b border-[#087F5B]/30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileScreen('home')}
            className="p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-white/90"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white leading-tight">HSE AI Copilot</h3>
            <p className="text-[9px] text-[#20A887] font-mono leading-none">Qatar Statutory Assistant</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'm-reset',
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: 'Chat thread cleared. How can I assist with Qatar HSE regulations or site hazards?',
                badge: 'Standing By',
              },
            ])
          }
          className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          title="Clear Chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Suggested Query Chips */}
      <div className="bg-white px-3 py-1.5 border-b border-gray-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
        {quickPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(pill.query)}
            className="flex-shrink-0 px-2 py-0.5 bg-[#F4F7F5] hover:bg-emerald-50 text-gray-700 hover:text-[#073B2F] rounded-full border border-gray-200 hover:border-[#087F5B] text-[10px] font-medium transition-all shadow-2xs whitespace-nowrap active:scale-95"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-16">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';

          return (
            <div
              key={m.id}
              className={`flex gap-2 max-w-[90%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow-xs ${
                  isAi
                    ? 'bg-gradient-to-tr from-[#073B2F] to-[#20A887] text-white'
                    : 'bg-[#172B25] text-white'
                }`}
              >
                {isAi ? <Sparkles className="w-3.5 h-3.5 text-emerald-200" /> : currentUser.name.charAt(0)}
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10px] text-gray-700">
                    {isAi ? 'HSE Copilot' : currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono">{m.timestamp}</span>
                </div>

                <div
                  className={`p-2.5 rounded-xl shadow-2xs text-[11px] leading-relaxed ${
                    isAi
                      ? 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                      : 'bg-gradient-to-br from-[#073B2F] to-[#0A4537] text-white rounded-tr-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {m.badge && (
                    <div className="mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[9px]">
                      <span className="font-bold text-[#073B2F] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/80">
                        ⚖️ {m.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-2 max-w-[85%] mr-auto items-center text-gray-500 text-[10px] italic">
            <div className="w-6 h-6 rounded-full bg-[#073B2F] text-white flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-emerald-300 animate-spin" />
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B] animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B] animate-bounce delay-200" />
              <span className="ml-1 text-[10px]">Analyzing Qatar records...</span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Voice Dictation Wave Banner */}
      {isListening && (
        <div className="bg-amber-500 text-white px-3 py-1.5 text-[10px] font-bold flex items-center justify-between animate-in slide-in-from-bottom-2">
          <span>🎙️ Listening to safety prompt...</span>
          <button onClick={() => setIsListening(false)} className="underline">
            Cancel
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="bg-white p-2 border-t border-gray-200 flex items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={toggleVoice}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600'
          }`}
          title="Voice input"
        >
          {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask HSE AI Copilot..."
          className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg outline-none text-[11px] text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-[#087F5B]"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputVal.trim() || isTyping}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            inputVal.trim() && !isTyping
              ? 'bg-[#073B2F] text-white active:scale-95'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
