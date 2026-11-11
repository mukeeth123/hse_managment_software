import React from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  AlertTriangle,
  AlertOctagon,
  Eye,
  ThermometerSun,
  ShieldCheck,
  ClipboardList,
  PhoneCall,
  Clock,
  ArrowRight,
  Flame,
  Award,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const MobileHomeScreen: React.FC = () => {
  const { currentUser, setMobileScreen, hazards, capas, inspections, setIsScenarioModalOpen } = useHSE();

  // Find tasks assigned to current user
  const userCapas = capas.filter((c) => c.actionOwnerId === currentUser.id || c.actionOwner === currentUser.name);
  const myReports = hazards.filter((h) => h.reportedBy === currentUser.name || h.reporterEmployeeId === currentUser.employeeId);

  return (
    <div className="flex-1 overflow-y-auto pb-16 bg-[#F4F7F5] text-[#172B25] text-xs">
      {/* Header Profile Greeting */}
      <div className="bg-[#073B2F] text-white p-4 pt-3 pb-3.5 rounded-b-2xl shadow-sm border-b border-[#087F5B]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#20A887] text-white font-bold flex items-center justify-center text-sm shadow">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] text-[#DDF5EA]/80 font-medium">Marhaban,</p>
              <h3 className="font-bold text-sm leading-tight text-white">{currentUser.name}</h3>
              <p className="text-[10px] text-[#20A887] font-mono mt-0.5">{currentUser.employeeId} • {currentUser.role}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] bg-black/25 text-[#DDF5EA] px-2 py-0.5 rounded-full font-medium border border-white/10 truncate max-w-[120px] block">
              {currentUser.project || 'Lusail Tower Zone 4'}
            </span>
          </div>
        </div>

        {/* Thermal Heat Alert Bar - Clean & Direct */}
        <div className="mt-2.5 bg-gradient-to-r from-amber-500/20 via-amber-600/20 to-orange-500/20 px-2.5 py-1.5 rounded-xl border border-amber-400/35 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <ThermometerSun className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <div className="leading-tight truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[10px] text-amber-200">Worksite Heat Index</span>
                <span className="text-[9px] text-amber-100/80">• 45m Work / 15m Rest</span>
              </div>
              <p className="text-[9px] text-amber-100/70 truncate">
                Drink 500ml/hr • Stoppage Threshold 32.1°C
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full flex-shrink-0 shadow-xs font-mono">
            WBGT 30.2°C
          </span>
        </div>
      </div>

      {/* Quick Reporting Actions */}
      <div className="p-3.5 space-y-3">
        {/* AI Safety Copilot Card */}
        <div
          onClick={() => setMobileScreen('chat')}
          className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#0A4537] text-white p-3 rounded-2xl shadow-sm border border-[#20A887]/40 cursor-pointer hover:border-emerald-300 transition-all active:scale-98 flex items-center justify-between gap-2.5 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white">Ask HSE AI Copilot</span>
                <span className="text-[8px] bg-white/20 text-emerald-200 px-1.5 py-0.2 rounded-full font-mono border border-white/10">
                  AI Copilot
                </span>
              </div>
              <p className="text-[10px] text-emerald-100/80 truncate mt-0.5">
                Instant safety guidance, hazard checks & PTW standards
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
        </div>

        <div>
          <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider mb-2">
            Instant Safety Actions
          </h4>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => setMobileScreen('report-hazard')}
              className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-[#087F5B] active:scale-95 transition-all text-center flex flex-col items-center gap-1.5"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] text-gray-900 leading-tight">Report Hazard</span>
            </button>

            <button
              onClick={() => setMobileScreen('report-incident')}
              className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-red-500 active:scale-95 transition-all text-center flex flex-col items-center gap-1.5"
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] text-gray-900 leading-tight">Report Incident</span>
            </button>

            <button
              onClick={() => setMobileScreen('report-nearmiss')}
              className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-blue-500 active:scale-95 transition-all text-center flex flex-col items-center gap-1.5"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <span className="font-bold text-[11px] text-gray-900 leading-tight">Near Miss</span>
            </button>
          </div>
        </div>

        {/* Assigned Tasks for User */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
              My Action Items ({userCapas.length})
            </h4>
            <button
              onClick={() => setMobileScreen('tasks')}
              className="text-[10px] text-[#087F5B] font-semibold flex items-center gap-0.5"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {userCapas.length === 0 ? (
            <div className="bg-white px-3 py-2 rounded-xl border border-gray-200 flex items-center justify-between text-[11px] text-gray-600 shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>All assigned CAPA actions up to date</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                0 Pending
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              {userCapas.slice(0, 2).map((c) => (
                <div
                  key={c.id}
                  onClick={() => setMobileScreen('tasks')}
                  className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-gray-300"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-[10px] text-gray-700">{c.reference}</span>
                    <Badge variant={c.status === 'Closed' ? 'closed' : 'actionPending'} size="sm">
                      {c.status}
                    </Badge>
                  </div>
                  <p className="font-semibold text-gray-900 line-clamp-1">{c.actionDescription}</p>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-gray-500">
                    <span>Due: {c.dueDate}</span>
                    <span>{c.progressPercentage}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
              Recent Submissions
            </h4>
            <button
              onClick={() => setMobileScreen('reports')}
              className="text-[10px] text-[#087F5B] font-semibold flex items-center gap-0.5"
            >
              All reports <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {hazards.slice(0, 3).map((h) => (
              <div
                key={h.id}
                onClick={() => setMobileScreen('reports')}
                className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-[10px] text-gray-700">{h.reference}</span>
                    <span className="text-[10px] text-gray-400">• {h.location}</span>
                  </div>
                  <p className="font-medium text-gray-900 truncate mt-0.5">{h.title}</p>
                </div>
                <Badge
                  variant={
                    h.status === 'Closed'
                      ? 'closed'
                      : h.status === 'Investigation'
                      ? 'investigation'
                      : h.status === 'Submitted'
                      ? 'submitted'
                      : 'underReview'
                  }
                  size="sm"
                >
                  {h.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Assistance Quick Call Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[11px] text-red-900 block">Emergency Response Hotline</span>
              <span className="text-[10px] text-red-700">Hamad / Site Medical & Civil Defence</span>
            </div>
          </div>
          <button
            onClick={() => setMobileScreen('safety')}
            className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold shadow hover:bg-red-700"
          >
            Contacts
          </button>
        </div>
      </div>
    </div>
  );
};
