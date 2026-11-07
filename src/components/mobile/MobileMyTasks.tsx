import React from 'react';
import { useHSE } from '../../context/HSEContext';
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, ExternalLink, Calendar } from 'lucide-react';
import { Badge } from '../common/Badge';

export const MobileMyTasks: React.FC = () => {
  const { currentUser, setMobileScreen, capas, inspections, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  // Tasks assigned to user or all if admin/supervisor
  const myCapas = capas.filter((c) => c.actionOwnerId === currentUser.id || c.actionOwner === currentUser.name || currentUser.roleCategory === 'HSE');
  const myInspections = inspections.filter((i) => i.inspector === currentUser.name || currentUser.roleCategory === 'HSE');

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7F5] overflow-y-auto pb-16 text-xs">
      <div className="bg-[#073B2F] text-white px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-[#087F5B]/30">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-lg hover:bg-white/10 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="font-bold text-xs">My Assigned Action Tasks</span>
        <div className="w-8"></div>
      </div>

      <div className="p-3 space-y-3 flex-1">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
              Corrective Actions (CAPA)
            </h4>
            <span className="text-[10px] text-gray-500 font-medium">{myCapas.length} tasks</span>
          </div>

          <div className="space-y-2">
            {myCapas.map((capa) => (
              <div
                key={capa.id}
                onClick={() => {
                  setActiveDesktopModule('Corrective and Preventive Actions');
                  setSelectedRecordRef(capa.reference);
                }}
                className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-[#087F5B] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[10px] text-gray-800">{capa.reference}</span>
                  <Badge variant={capa.status === 'Closed' ? 'closed' : 'actionPending'} size="sm">
                    {capa.status}
                  </Badge>
                </div>

                <p className="font-bold text-gray-900 text-xs mb-1">{capa.actionDescription}</p>

                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div
                    className="bg-[#087F5B] h-1.5 rounded-full transition-all"
                    style={{ width: `${capa.progressPercentage}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" /> Due: {capa.dueDate}
                  </span>
                  <span className="font-semibold text-[#087F5B]">{capa.progressPercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 mt-4">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
              Scheduled Inspections
            </h4>
            <span className="text-[10px] text-gray-500 font-medium">{myInspections.length} total</span>
          </div>

          <div className="space-y-2">
            {myInspections.slice(0, 3).map((ins) => (
              <div
                key={ins.id}
                onClick={() => {
                  setActiveDesktopModule('Inspections and Audits');
                  setSelectedRecordRef(ins.reference);
                }}
                className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-[10px] text-gray-800">{ins.reference}</span>
                  <Badge variant={ins.status === 'Completed' ? 'closed' : 'underReview'} size="sm">
                    {ins.status}
                  </Badge>
                </div>
                <p className="font-semibold text-gray-900 line-clamp-1">{ins.title}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2">
                  <span>📍 {ins.location}</span>
                  <span className="font-semibold text-emerald-700">{ins.scorePercentage}% score</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
