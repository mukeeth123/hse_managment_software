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
            <span className="text-[9px] bg-[#087F5B] text-white px-2 py-0.5 rounded font-medium border border-white/10">
              Demo Site 01
            </span>
          </div>
        </div>

        {/* Heat Stress Alert Card (Aligned with Qatar MD 17/2021) */}
        <div className="mt-3.5 bg-gradient-to-r from-amber-900/60 to-orange-800/60 p-3 rounded-xl border border-amber-400/30 flex items-start gap-2.5">
          <ThermometerSun className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[11px] text-amber-200">Qatar MD 17/2021 Heat Index</span>
              <span className="text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded">WBGT 30.2°C</span>
            </div>
            <p className="text-[10px] text-amber-100/90 mt-1 leading-snug">
              Work-Rest Regimen: 45 min work / 15 min shaded rest. Drink 500ml cold water hourly. Outdoor stoppage threshold is 32.1°C.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Reporting Actions */}
      <div className="p-4 space-y-4">
        <div>
          <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Instant Safety Actions</span>
            <span className="text-[10px] text-emerald-700 font-normal">Stop Work Authority</span>
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

        {/* Demo Walkthrough Trigger Card */}
        <div className="bg-[#087F5B]/10 border border-[#087F5B]/30 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="font-bold text-[11px] text-[#073B2F] block">Connected Case: HAZ-2026-0042</span>
            <span className="text-[10px] text-gray-600">Uncovered opening reported by Ahmed Hassan</span>
          </div>
          <button
            onClick={() => setIsScenarioModalOpen(true)}
            className="px-2.5 py-1 bg-[#073B2F] text-white rounded-lg text-[10px] font-bold shadow hover:bg-[#092B24]"
          >
            Walkthrough
          </button>
        </div>

        {/* Assigned Tasks for User */}
        <div>
          <div className="flex items-center justify-between mb-2">
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
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center text-gray-500 text-[11px]">
              No pending CAPA actions currently assigned to your account.
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
