import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Shield,
  Lock,
  UserCheck,
  Building,
  Key,
  Users,
  CheckCircle2,
  ArrowRight,
  UserPlus,
  Sparkles,
  Mic,
  Monitor,
  Smartphone,
  Cpu,
  FileText,
  ChevronDown,
  LogIn,
  Check,
} from 'lucide-react';
import { RoleCategory, UserRole } from '../../types';
import { getDefaultPermissionsForRole } from '../../services/dataService';

export const MobileLoginScreen: React.FC = () => {
  const {
    login,
    users,
    createUserAndLogin,
    projects,
    setMobileScreen,
    setShowMobileSplash,
    setShowMobileWelcome,
    setViewMode,
    addToast,
  } = useHSE();

  // Mode: 'quick' (1-Tap Role Personas - Recommended for Demos) | 'signin' (Credentials) | 'signup' (Register Account)
  const [screenMode, setScreenMode] = useState<'quick' | 'signin' | 'signup'>('quick');

  // Selected persona state
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('USR-001'); // Default to Ahmed Hassan
  const [loginPassword, setLoginPassword] = useState('qhse@2026');
  const [loginProject, setLoginProject] = useState(projects[0] || 'Commercial Tower Lusail');

  // Mobile Sign Up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmpId, setSignUpEmpId] = useState(`EMP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [signUpRoleCategory, setSignUpRoleCategory] = useState<RoleCategory>('Workforce');
  const [signUpRole, setSignUpRole] = useState<UserRole>('Worker');
  const [signUpDept, setSignUpDept] = useState('Civil Construction');

  const selectedUser = users.find((u) => u.id === selectedPersonaId) || users[0];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedPersonaId);
    setMobileScreen('home');
  };

  const handleMobileSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim()) {
      addToast('error', 'Missing Information', 'Please enter your Full Name.');
      return;
    }

    const defaultPerms = getDefaultPermissionsForRole(signUpRoleCategory, signUpRole);
    createUserAndLogin({
      name: signUpName.trim(),
      email: `${signUpName.toLowerCase().replace(/\s+/g, '.')}@client-org.qa`,
      employeeId: signUpEmpId,
      department: signUpDept,
      role: signUpRole,
      roleCategory: signUpRoleCategory,
      project: projects[0] || 'Commercial Tower Lusail',
      supervisorName: 'Tariq Al-Mansoor',
      phone: '+974 5500 1234',
      active: true,
      trainingComplianceStatus: 'Compliant',
      permissions: defaultPerms,
    });
    setMobileScreen('home');
  };

  const applyPreset = (preset: 'worker' | 'supervisor' | 'hse') => {
    if (preset === 'worker') {
      setSignUpRoleCategory('Workforce');
      setSignUpRole('Worker');
      setSignUpDept('Civil Construction');
      if (!signUpName) setSignUpName('Hamad Al-Kuwari');
    } else if (preset === 'supervisor') {
      setSignUpRoleCategory('Supervision');
      setSignUpRole('Site Supervisor');
      setSignUpDept('Site Operations');
      if (!signUpName) setSignUpName('Sultan Al-Marri');
    } else {
      setSignUpRoleCategory('HSE');
      setSignUpRole('HSE Officer');
      setSignUpDept('HSE & Compliance');
      if (!signUpName) setSignUpName('Reem Al-Mahmoud');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7F5] overflow-y-auto text-xs select-none">
      {/* Compact Mobile Top Branding Header */}
      <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#0A4D3C] text-white py-3 px-4 shadow-md border-b border-[#087F5B]/30 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#20A887] text-white flex items-center justify-center shadow-md flex-shrink-0">
            <Shield className="w-4 h-4 text-[#DDF5EA]" />
          </div>
          <div className="leading-tight">
            <h3 className="font-bold text-xs text-white">QHSE Mobile Platform</h3>
            <p className="text-[10px] text-[#20A887] font-medium">State of Qatar Enterprise Workforce</p>
          </div>
        </div>

        <span className="text-[9px] bg-black/30 text-emerald-300 px-2 py-0.5 rounded-full border border-white/10 font-mono uppercase tracking-wider">
          Qatar Edition
        </span>
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* Sleek Segmented Control for Authentication Mode */}
        <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setScreenMode('quick')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              screenMode === 'quick'
                ? 'bg-[#073B2F] text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>⚡ 1-Tap Personas</span>
          </button>
          <button
            type="button"
            onClick={() => setScreenMode('signin')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              screenMode === 'signin'
                ? 'bg-[#073B2F] text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>🔑 Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setScreenMode('signup')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              screenMode === 'signup'
                ? 'bg-[#073B2F] text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>📝 Sign Up</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* SCREEN 1: SIGN IN / LOG IN SCREEN                         */}
        {/* ========================================================= */}
        {screenMode === 'signin' && (
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#073B2F] text-white flex items-center justify-center">
                  <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Sign In to Mobile Session</h4>
                  <p className="text-[10px] text-gray-500">Enter enterprise credentials</p>
                </div>
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded">
                Active
              </span>
            </div>

            <form onSubmit={handleSignIn} className="space-y-2.5">
              <div>
                <label className="block font-bold text-[11px] text-gray-700 mb-1">
                  Select User Account (Dropdown):
                </label>
                <div className="relative">
                  <select
                    value={selectedPersonaId}
                    onChange={(e) => setSelectedPersonaId(e.target.value)}
                    className="w-full px-2.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium outline-none pr-8 focus:border-[#087F5B]"
                  >
                    <optgroup label="Workforce Frontline">
                      <option value="USR-001">Ahmed Hassan (Field Worker • EMP-1045)</option>
                      <option value="USR-002">Rajesh Kumar (Contractor Specialist • EMP-1046)</option>
                    </optgroup>
                    <optgroup label="Supervision & Management">
                      <option value="USR-010">Tariq Al-Mansoor (Site Supervisor • EMP-1010)</option>
                      <option value="USR-019">Nasser Al-Khelaifi (Senior HSE Manager • EMP-1019)</option>
                      <option value="USR-035">Khalid Al-Sulaiti (System Admin • EMP-1035)</option>
                      <option value="USR-025">Fatima Al-Kuwari (HSE Inspector • EMP-1014)</option>
                    </optgroup>
                    <optgroup label="All 40 Seeded Profiles">
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} — {u.role} ({u.employeeId})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[11px] text-gray-700 mb-1 flex items-center justify-between">
                  <span>Passcode / Password:</span>
                  <span className="text-[9px] text-emerald-700 font-normal">Pre-filled</span>
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono outline-none focus:border-[#087F5B]"
                />
              </div>

              <div>
                <label className="block font-bold text-[11px] text-gray-700 mb-1">
                  Assigned Project Location:
                </label>
                <select
                  value={loginProject}
                  onChange={(e) => setLoginProject(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                >
                  {projects.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-1 py-2.5 bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In as {selectedUser.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  login('USR-001');
                  setMobileScreen('report-hazard');
                }}
                className="w-full py-1.5 border border-emerald-600/30 hover:bg-emerald-50 rounded-lg font-semibold text-[11px] text-[#073B2F] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#20A887]" />
                <span>1-Tap Instant Worker Demo (Ahmed Hassan)</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 2: SIGN UP / REGISTER ACCOUNT SCREEN               */}
        {/* ========================================================= */}
        {screenMode === 'signup' && (
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#087F5B] text-white flex items-center justify-center">
                  <UserPlus className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Sign Up / New Profile</h4>
                  <p className="text-[10px] text-gray-500">Register employee identity</p>
                </div>
              </div>
              <span className="text-[9px] bg-purple-100 text-purple-900 font-semibold px-2 py-0.5 rounded">
                Registration
              </span>
            </div>

            {/* Fast Autofill Presets */}
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold text-[#073B2F] block mb-1">
                Fast Fill Presets:
              </span>
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => applyPreset('worker')}
                  className="px-1.5 py-1 bg-white hover:bg-emerald-100 rounded border border-emerald-300 font-semibold text-gray-800 text-center"
                >
                  👷 Worker
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('supervisor')}
                  className="px-1.5 py-1 bg-white hover:bg-emerald-100 rounded border border-emerald-300 font-semibold text-gray-800 text-center"
                >
                  📋 Supervisor
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('hse')}
                  className="px-1.5 py-1 bg-white hover:bg-emerald-100 rounded border border-emerald-300 font-semibold text-gray-800 text-center"
                >
                  🛡️ HSE Officer
                </button>
              </div>
            </div>

            <form onSubmit={handleMobileSignUp} className="space-y-2.5">
              <div>
                <label className="block font-bold text-[11px] text-gray-700 mb-0.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hamad Al-Kuwari"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[11px] text-gray-700 mb-0.5">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={signUpEmpId}
                    onChange={(e) => setSignUpEmpId(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[11px] text-gray-700 mb-0.5">
                    Role Category
                  </label>
                  <select
                    value={signUpRoleCategory}
                    onChange={(e) => {
                      const cat = e.target.value as RoleCategory;
                      setSignUpRoleCategory(cat);
                      if (cat === 'Workforce') setSignUpRole('Worker');
                      else if (cat === 'Supervision') setSignUpRole('Site Supervisor');
                      else if (cat === 'HSE') setSignUpRole('HSE Officer');
                      else setSignUpRole('Worker');
                    }}
                    className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none"
                  >
                    <option value="Workforce">Workforce</option>
                    <option value="Supervision">Supervision</option>
                    <option value="HSE">HSE Specialist</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[11px] text-gray-700 mb-0.5">
                  Designation / Trade
                </label>
                <input
                  type="text"
                  value={signUpRole}
                  onChange={(e) => setSignUpRole(e.target.value as UserRole)}
                  className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[11px] text-gray-700 mb-0.5">
                  Department
                </label>
                <input
                  type="text"
                  value={signUpDept}
                  onChange={(e) => setSignUpDept(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none"
                />
              </div>

              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-[10px] text-emerald-900 leading-snug">
                ✓ Includes Stop Work Authority & Mobile Speech AI dictation rights.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-98"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Profile & Launch Mobile</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 3: 1-TAP ROLE PERSONAS - STREAMLINED & ELEGANT    */}
        {/* ========================================================= */}
        {screenMode === 'quick' && (
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3.5 animate-in fade-in">
            {/* Persona Selector Dropdown */}
            <div>
              <label className="block font-bold text-[11px] text-gray-700 mb-1.5 flex items-center justify-between">
                <span>Select Workforce Identity:</span>
                <span className="text-[10px] text-emerald-700 font-semibold">1-Tap Switch</span>
              </label>
              <div className="relative">
                <select
                  value={selectedPersonaId}
                  onChange={(e) => setSelectedPersonaId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F4F7F5] border border-emerald-300 rounded-xl text-xs font-bold text-[#073B2F] outline-none pr-8 appearance-none cursor-pointer focus:ring-2 focus:ring-[#087F5B]"
                >
                  <optgroup label="Frontline Workforce">
                    <option value="USR-001">👷 Ahmed Hassan (Field Worker • EMP-1045)</option>
                    <option value="USR-002">🛠️ Rajesh Kumar (Contractor Specialist • EMP-1046)</option>
                  </optgroup>
                  <optgroup label="Supervision & Management">
                    <option value="USR-010">📋 Tariq Al-Mansoor (Site Supervisor • EMP-1010)</option>
                    <option value="USR-019">🛡️ Nasser Al-Khelaifi (Senior HSE Manager • EMP-1019)</option>
                    <option value="USR-025">🔍 Fatima Al-Kuwari (HSE Inspector • EMP-1014)</option>
                    <option value="USR-035">⚙️ Khalid Al-Sulaiti (Platform Admin • EMP-1035)</option>
                  </optgroup>
                  <optgroup label="All 40 Seeded Profiles">
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.role} ({u.employeeId})
                      </option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown className="w-4 h-4 text-[#087F5B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Unified Persona Identity Card */}
            <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/60 p-3 rounded-xl border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#073B2F] to-[#087F5B] text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                  {selectedUser.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{selectedUser.name}</h4>
                    <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.2 rounded border border-emerald-300">
                      {selectedUser.roleCategory}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 truncate mt-0.5">
                    {selectedUser.role} • <span className="font-mono">{selectedUser.employeeId}</span>
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[10px] text-gray-600">
                <span className="truncate max-w-[180px]">📍 {selectedUser.project || 'Lusail Commercial Tower'}</span>
                <span className="text-emerald-700 font-medium">✓ Stop Work Ready</span>
              </div>
            </div>

            {/* Direct 1-Tap Entry Button */}
            <button
              onClick={() => {
                login(selectedPersonaId);
                setMobileScreen('home');
              }}
              className="w-full py-2.5 bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:brightness-105 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Enter App as {selectedUser.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Subtle, Compact Statutory Footer (Clean & Fitted) */}
        <div className="pt-3 text-center space-y-1">
          <span className="text-[10px] font-semibold text-slate-700 block">
            Qatar Labour Law No. 14/2004 • MD 17/2021
          </span>
          <span className="text-[9px] text-slate-400 block">
            Unified Workforce Safety Portal (Zero Backend)
          </span>
        </div>
      </div>
    </div>
  );
};
