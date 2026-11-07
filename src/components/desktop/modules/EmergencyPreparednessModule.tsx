import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { Ambulance, Search, Filter, Plus, Download, ShieldAlert, PhoneCall, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { exportToExcel } from '../../../utils/exportUtils';

export const EmergencyPreparednessModule: React.FC = () => {
  const { emergencyPlans, emergencyDrills, currentUser } = useHSE();
  const [activeTab, setActiveTab] = useState<'plans' | 'drills' | 'contacts'>('plans');

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Emergency Preparedness & Response</h2>
            <Badge variant="closed" size="sm">5 ERP Plans Active</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Civil Defence fire evacuation plans, drill evaluations, assembly mustering and crisis coordination protocols
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel('QHSE_Emergency_Drills_Register', 'Drills', emergencyDrills)}
            className="px-3 py-1.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Drill Log</span>
          </button>
        </div>
      </div>

      {/* Demo Warning Notice */}
      <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-blue-900 text-[11px]">
        <strong>Demonstration Protocol Notice:</strong> Contact details and simulated response plans are provided for enterprise workflow verification and do not replace official Qatar Civil Defence approvals.
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3EAE6] bg-white px-4 rounded-t-xl gap-2 font-bold">
        <button
          onClick={() => setActiveTab('plans')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'plans' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Ambulance className="w-4 h-4" />
          <span>Emergency Response Plans (ERP) ({emergencyPlans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('drills')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'drills' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Evacuation & Drill History ({emergencyDrills.length})</span>
        </button>
      </div>

      {activeTab === 'plans' ? (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyPlans.map((plan) => (
            <div key={plan.id} className="p-4 bg-[#F4F7F5] rounded-xl border border-[#E3EAE6] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#073B2F] bg-white px-2.5 py-0.5 rounded border border-[#E3EAE6]">
                  {plan.code}
                </span>
                <Badge variant="verified" size="sm">{plan.version}</Badge>
              </div>

              <h4 className="font-bold text-sm text-gray-900">{plan.title}</h4>
              <p className="text-[11px] text-gray-600">
                <strong>Evacuation Routes:</strong> {plan.evacuationRoutes}
              </p>

              <div className="p-2 bg-white rounded-lg border border-gray-200 text-[11px] space-y-1">
                <div>Lead Coordinator: <strong>{plan.leadCoordinator}</strong></div>
                <div>Designated Assembly Points: <strong>{plan.assemblyPoints.join(', ')}</strong></div>
                <div>Equipment: {plan.equipmentRequired.join(', ')}</div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 pt-1 border-t border-gray-200">
                <span>Last Drill: {plan.lastDrillDate}</span>
                <span>Next Drill Due: {plan.nextDrillDate}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Drill Ref</th>
                  <th className="py-2.5 px-3 font-semibold">Plan Link</th>
                  <th className="py-2.5 px-3 font-semibold">Scenario Title</th>
                  <th className="py-2.5 px-3 font-semibold">Conducted Date</th>
                  <th className="py-2.5 px-3 font-semibold">Muster Time</th>
                  <th className="py-2.5 px-3 font-semibold">Participants</th>
                  <th className="py-2.5 px-3 font-semibold">Score</th>
                  <th className="py-2.5 px-3 font-semibold">Evaluator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAE6]">
                {emergencyDrills.map((drill) => (
                  <tr key={drill.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3 font-mono font-bold text-[#073B2F]">{drill.reference}</td>
                    <td className="py-3 px-3 font-mono text-gray-600">{drill.planRef}</td>
                    <td className="py-3 px-3 max-w-sm">
                      <div className="font-bold text-gray-900">{drill.title}</div>
                      <div className="text-[10px] text-gray-500 line-clamp-1">{drill.keyObservations}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{drill.conductedDate}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-emerald-700">
                        {drill.evacuationTimeMinutes}m / target {drill.targetTimeMinutes}m
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-bold">{drill.participantCount} workers</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-bold text-xs bg-emerald-100 text-emerald-800">
                        {drill.evaluationScore}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700">{drill.evaluator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
