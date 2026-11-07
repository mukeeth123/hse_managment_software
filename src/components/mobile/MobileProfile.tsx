import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  ArrowLeft,
  Award,
  QrCode,
  CheckCircle2,
  UserCheck,
  Shield,
  ChevronRight,
  LogOut,
  UserPlus,
  Lock,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const MobileProfile: React.FC = () => {
  const {
    currentUser,
    setMobileScreen,
    trainingRecords,
    switchUser,
    users,
    logout,
    setIsCreateProfileModalOpen,
    setShowMobileSplash,
  } = useHSE();

  const [isSwitchUserOpen, setIsSwitchUserOpen] = useState(false);

  const userTraining = trainingRecords.filter(
    (t) => t.employeeId === currentUser.employeeId || t.employeeName === currentUser.name
  );

  const permissionsList = [
    { label: 'Stop Work Authority', active: true },
    { label: 'Hazard & Voice Reporting', active: currentUser.permissions?.canReportHazards ?? true },
    { label: 'Incident Review', active: currentUser.permissions?.canManageIncidents ?? false },
    { label: 'Investigation Lead', active: currentUser.permissions?.canConductInvestigations ?? false },
    { label: 'CAPA Action Owner', active: currentUser.permissions?.canManageCAPA ?? false },
    { label: 'PTW Permit Sign-off', active: currentUser.permissions?.canIssuePermits ?? false },
    { label: 'Site Inspections', active: currentUser.permissions?.canConductInspections ?? false },
    { label: 'Legal Compliance', active: currentUser.permissions?.canVerifyLegalCompliance ?? false },
    { label: 'User Admin', active: currentUser.permissions?.canAdministerUsers ?? false },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7F5] overflow-y-auto pb-16 text-xs select-none">
      {/* Screen Header */}
      <div className="bg-[#073B2F] text-white px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-[#087F5B]/30">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-lg hover:bg-white/10 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="font-bold text-xs">Digital Passport & RBAC</span>
        <button
          onClick={logout}
          className="p-1 rounded-lg hover:bg-white/10 text-red-200 hover:text-white flex items-center gap-1 text-[10px]"
          title="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="p-3.5 space-y-4 flex-1">
        {/* Digital ID Card */}
        <div className="bg-gradient-to-br from-[#073B2F] to-[#092B24] text-white p-4 rounded-2xl shadow-lg border border-[#20A887]/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#20A887] text-white font-bold text-lg flex items-center justify-center shadow">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{currentUser.name}</h3>
                <span className="text-[10px] text-[#20A887] font-mono">{currentUser.employeeId}</span>
                <p className="text-[11px] text-[#DDF5EA]/90 mt-0.5">{currentUser.role}</p>
              </div>
            </div>
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <QrCode className="w-7 h-7 text-gray-900" />
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-[#DDF5EA]/60 block">Project:</span>
              <span className="font-medium text-white truncate block">{currentUser.project}</span>
            </div>
            <div>
              <span className="text-[#DDF5EA]/60 block">Role Tier:</span>
              <span className="font-semibold text-[#20A887] block">{currentUser.roleCategory}</span>
            </div>
            <div>
              <span className="text-[#DDF5EA]/60 block">Department:</span>
              <span className="font-medium text-white truncate block">{currentUser.department}</span>
            </div>
            <div>
              <span className="text-[#DDF5EA]/60 block">Safety Passport:</span>
              <span className="font-bold text-emerald-400">ACTIVE & VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Assigned RBAC Permissions Card */}
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>Assigned Permissions</span>
            </h4>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
              {currentUser.roleCategory}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {permissionsList.map((p, idx) => (
              <span
                key={idx}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium border flex items-center gap-1 ${
                  p.active
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}
              >
                <span>{p.active ? '✓' : '—'}</span>
                <span>{p.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Mobile Switch Account & Role Controls */}
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>Mobile User Management</span>
            </h4>
            <button
              onClick={() => setIsSwitchUserOpen(!isSwitchUserOpen)}
              className="text-[10px] font-bold text-[#087F5B] hover:underline"
            >
              {isSwitchUserOpen ? 'Hide' : 'Quick Switch'}
            </button>
          </div>

          {isSwitchUserOpen && (
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
              {[
                { id: 'USR-001', name: 'Ahmed Hassan', role: 'Worker (EMP-1045)', tier: 'Workforce' },
                { id: 'USR-010', name: 'Tariq Al-Mansoor', role: 'Site Supervisor', tier: 'Supervision' },
                { id: 'USR-019', name: 'Nasser Al-Khelaifi', role: 'Senior HSE Manager', tier: 'HSE' },
                { id: 'USR-025', name: 'Fatima Al-Kuwari', role: 'HSE Inspector', tier: 'Specialist' },
                { id: 'USR-035', name: 'Khalid Al-Sulaiti', role: 'Platform Admin', tier: 'Admin' },
              ].map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    setIsSwitchUserOpen(false);
                  }}
                  className={`w-full p-2 text-left flex items-center justify-between transition-colors ${
                    currentUser.id === u.id ? 'bg-emerald-50 text-emerald-950 font-bold' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div>
                    <span className="font-bold block text-xs">{u.name}</span>
                    <span className="text-[10px] text-gray-500">{u.role}</span>
                  </div>
                  {currentUser.id === u.id ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowMobileSplash(true)}
            className="w-full py-2 px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1.5"
            title="Replay native mobile startup splash screen animation"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#087F5B]" />
            <span>Replay Mobile Splash Screen</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setIsCreateProfileModalOpen(true)}
              className="py-2 px-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-[#073B2F] font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>Create Profile</span>
            </button>

            <button
              onClick={logout}
              className="py-2 px-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-700 border border-gray-200 text-gray-700 font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Competency Certifications */}
        <div>
          <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Verified Safety Certifications</span>
            <span className="text-[10px] text-emerald-700 font-semibold">{userTraining.length} valid</span>
          </h4>

          {userTraining.length === 0 ? (
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center text-gray-500 text-[11px]">
              No active training certifications mapped. Please consult Training Coordinator.
            </div>
          ) : (
            <div className="space-y-2">
              {userTraining.map((tr) => (
                <div
                  key={tr.id}
                  className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-xs flex items-start gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 truncate text-[11px]">{tr.courseTitle}</span>
                      <Badge variant={tr.status === 'Valid' ? 'low' : 'high'} size="sm">
                        {tr.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                      <span className="font-mono">{tr.certificateRef}</span>
                      <span>Expires: {tr.expiryDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
