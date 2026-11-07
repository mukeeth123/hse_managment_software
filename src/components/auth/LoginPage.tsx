import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Shield,
  Lock,
  Building,
  Key,
  Users,
  CheckCircle2,
  ArrowRight,
  UserPlus,
  Table,
  Monitor,
  Smartphone,
  Sparkles,
  FileText,
  AlertTriangle,
  RotateCcw,
  Check,
  CheckSquare,
  Briefcase,
  Mail,
  Fingerprint,
  Mic,
  Cpu,
  Layers,
} from 'lucide-react';
import { RoleCategory, UserRole, UserPermissions } from '../../types';
import { getDefaultPermissionsForRole } from '../../services/dataService';

export const LoginPage: React.FC = () => {
  const {
    login,
    users,
    projects,
    setIsCreateProfileModalOpen,
    createUserAndLogin,
    setViewMode,
    setMobileScreen,
    setActiveDesktopModule,
    setSelectedRecordRef,
    resetAllData,
    addToast,
  } = useHSE();

  // Tab: 'signin' (credentials) | 'signup' (create account) | 'quick' (1-click personas) | 'matrix' (RBAC permissions)
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'quick' | 'matrix'>('quick');

  // Credentials form state
  const [selectedUserId, setSelectedUserId] = useState<string>('USR-019'); // Nasser Al-Khelaifi
  const [password, setPassword] = useState('qhse@2026');
  const [selectedProject, setSelectedProject] = useState<string>(projects[0] || 'Commercial Tower Lusail');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpEmpId, setSignUpEmpId] = useState(`EMP-${Math.floor(2000 + Math.random() * 8000)}`);
  const [signUpCompany, setSignUpCompany] = useState('Client Organisation / Subcontractor Q-Safety');
  const [signUpDept, setSignUpDept] = useState('HSE & Compliance');
  const [signUpRoleCategory, setSignUpRoleCategory] = useState<RoleCategory>('HSE');
  const [signUpRole, setSignUpRole] = useState<UserRole>('HSE Officer');
  const [signUpProject, setSignUpProject] = useState(projects[0] || 'Commercial Tower Lusail');

  // Key Quick Personas
  const keyPersonas = [
    {
      id: 'USR-035', // Khalid Al-Sulaiti
      title: 'Platform Administrator',
      category: 'Administration' as RoleCategory,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
      description: 'Full administrative governance, security rules, audit logs, and user management.',
      keyPermissions: ['All Modules', 'User Admin', 'Security Settings', 'Audit Logs'],
    },
    {
      id: 'USR-019', // Nasser Al-Khelaifi
      title: 'Senior HSE Manager',
      category: 'HSE' as RoleCategory,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      description: 'Incident approvals, statutory Qatar compliance, CAPA sign-off, and executive dashboards.',
      keyPermissions: ['Incident Approval', 'Qatar Compliance', 'CAPA Sign-off', 'Executive KPIs'],
    },
    {
      id: 'USR-010', // Tariq Al-Mansoor
      title: 'Site Safety Supervisor',
      category: 'Supervision' as RoleCategory,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      description: 'Hazard classification, permit authorization, site inspections, and supervisor actions.',
      keyPermissions: ['Hazard Review', 'PTW Issuance', 'Toolbox Talks', 'Area Inspections'],
    },
    {
      id: 'USR-025', // Fatima Al-Kuwari
      title: 'HSE Inspector & Auditor',
      category: 'Specialist' as RoleCategory,
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-200',
      description: 'Field compliance audits, near miss investigations, and environmental monitoring.',
      keyPermissions: ['Audit Checklists', 'Near Miss Review', 'Environmental Checks', 'Risk Assessment'],
    },
    {
      id: 'USR-001', // Ahmed Hassan
      title: 'Field Construction Worker',
      category: 'Workforce' as RoleCategory,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      description: 'Instant mobile hazard reporting, voice observations, and Stop Work Authority.',
      keyPermissions: ['Stop Work Authority', 'Voice Reporting', 'Safety Passport', 'Assigned Tasks'],
    },
    {
      id: 'USR-002', // Rajesh Kumar
      title: 'Contractor Specialist Worker',
      category: 'Workforce' as RoleCategory,
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200',
      description: 'Subcontractor operations, hot work permit receiver, and worker welfare tracking.',
      keyPermissions: ['Permit Receiver', 'Hazard Logging', 'Heat Stress Alerts', 'Task Updates'],
    },
  ];

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedUserId);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim()) {
      addToast('error', 'Missing Information', 'Please enter your Full Name.');
      return;
    }

    const defaultPerms = getDefaultPermissionsForRole(signUpRoleCategory, signUpRole);
    createUserAndLogin({
      name: signUpName.trim(),
      email: signUpEmail.trim() || `${signUpName.toLowerCase().replace(/\s+/g, '.')}@client-org.qa`,
      employeeId: signUpEmpId,
      department: signUpDept,
      role: signUpRole,
      roleCategory: signUpRoleCategory,
      project: signUpProject,
      supervisorName: 'Tariq Al-Mansoor',
      contractorCompany: signUpCompany || 'Client Organisation',
      phone: '+974 4400 1234',
      active: true,
      trainingComplianceStatus: 'Compliant',
      permissions: defaultPerms,
    });
  };

  const applySignUpPreset = (preset: 'worker' | 'supervisor' | 'hse' | 'admin') => {
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
    } else if (preset === 'hse') {
      setSignUpRoleCategory('HSE');
      setSignUpRole('HSE Manager');
      setSignUpDept('HSE & Compliance');
      if (!signUpName) setSignUpName('Reem Al-Mahmoud');
    } else {
      setSignUpRoleCategory('Administration');
      setSignUpRole('System Administrator');
      setSignUpDept('IT & Digital Systems');
      if (!signUpName) setSignUpName('Zaid Al-Thani');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto p-3 sm:p-5 select-none space-y-6">
      {/* Main Authentication Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-900/20 max-w-4xl xl:max-w-5xl w-full overflow-hidden flex flex-col flex-shrink-0">
        {/* Top Banner inside card */}
        <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#0A4D3C] text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] text-[#DDF5EA] mb-1.5 font-medium">
                <Building className="w-3.5 h-3.5 text-[#20A887]" />
                <span>Client Organisation — Qatar Demonstration Environment</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#20A887]" />
                <span>QHSE Enterprise Access Gateway & Authentication</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#DDF5EA]/90 mt-0.5 max-w-2xl leading-relaxed">
                Log in with existing enterprise credentials, register a new user profile with custom role-based permissions, or test 1-click personas across Desktop & Mobile.
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-1.5 flex-shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/15 text-[10px] text-emerald-300 font-mono font-bold">
                40 Seeded Enterprise Users
              </span>
              <span className="text-[10px] text-[#DDF5EA]/70">Zero Backend Required</span>
            </div>
          </div>
        </div>

        {/* Mode Switcher: Navigation Tabs + Dropdown for Quick Switching */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 bg-[#F4F7F5] px-3 sm:px-5 gap-2 py-2 sm:py-0">
          {/* Desktop Tabs */}
          <div className="flex overflow-x-auto gap-1">
            <button
              onClick={() => setActiveTab('quick')}
              className={`py-3 px-3 sm:px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'quick'
                  ? 'border-[#087F5B] text-[#073B2F] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 text-[#087F5B]" />
              <span>1-Click Personas (6 Roles)</span>
            </button>

            <button
              onClick={() => setActiveTab('signin')}
              className={`py-3 px-3 sm:px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'signin'
                  ? 'border-[#087F5B] text-[#073B2F] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Key className="w-4 h-4 text-[#087F5B]" />
              <span>Sign In / Login</span>
            </button>

            <button
              onClick={() => setActiveTab('signup')}
              className={`py-3 px-3 sm:px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'signup'
                  ? 'border-[#087F5B] text-[#073B2F] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-4 h-4 text-[#087F5B]" />
              <span>Sign Up / Create Account</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold ml-0.5">
                New
              </span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`py-3 px-3 sm:px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'matrix'
                  ? 'border-[#087F5B] text-[#073B2F] bg-white shadow-xs'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Table className="w-4 h-4 text-[#087F5B]" />
              <span>RBAC Matrix</span>
            </button>
          </div>

          {/* Quick Dropdown Selector for Screen Mode */}
          <div className="flex items-center gap-2 py-1.5 flex-shrink-0">
            <span className="text-[11px] font-bold text-gray-600 whitespace-nowrap hidden md:inline">
              Screen Mode:
            </span>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as 'signin' | 'signup' | 'quick' | 'matrix')}
              className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-[#073B2F] outline-none shadow-xs cursor-pointer focus:border-[#087F5B]"
            >
              <option value="quick">⚡ 1-Click Role Personas</option>
              <option value="signin">🔑 Sign In / Login (Credentials)</option>
              <option value="signup">📝 Sign Up (Register New Profile)</option>
              <option value="matrix">📊 RBAC Permissions Matrix</option>
            </select>
          </div>
        </div>

        {/* Tab 1: 1-Click Role Logins */}
        {activeTab === 'quick' && (
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {keyPersonas.map((p) => {
                const targetUser = users.find((u) => u.id === p.id) || users[0];
                return (
                  <div
                    key={p.id}
                    className="bg-white p-3.5 rounded-xl border border-gray-200 hover:border-[#087F5B] hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#073B2F] to-[#087F5B] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            {targetUser.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-gray-900 leading-tight">
                              {targetUser.name}
                            </h4>
                            <span className="text-[10px] text-gray-500 font-mono">
                              {targetUser.employeeId}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>
                          {p.category}
                        </span>
                      </div>

                      <div className="text-[11px] font-bold text-[#073B2F] mb-0.5">
                        {p.title}
                      </div>
                      <p className="text-[10px] text-gray-600 leading-snug mb-2.5 line-clamp-2">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {p.keyPermissions.map((perm, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded font-medium"
                          >
                            ✓ {perm}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => login(targetUser.id)}
                      className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#073B2F] to-[#087F5B] group-hover:from-[#092B24] group-hover:to-[#073B2F] text-white font-bold text-[11px] shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      <span>Sign In as {p.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Switch to Sign Up */}
            <div className="mt-4 p-3 bg-[#F4F7F5] rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-[11px]">
                  Want to register a brand new user profile with custom role permissions?
                </span>
              </div>
              <button
                onClick={() => setActiveTab('signup')}
                className="font-bold text-[#087F5B] hover:text-[#073B2F] hover:underline whitespace-nowrap text-xs flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Go to Sign Up Form →</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Sign In / Enterprise Credentials */}
        {activeTab === 'signin' && (
          <div className="p-5 max-w-xl mx-auto w-full">
            <div className="mb-4 text-center">
              <h3 className="text-sm font-bold text-gray-900">Sign In to Your Enterprise Account</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Select your employee identity or enter enterprise single sign-on credentials.
              </p>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Enterprise User Account (Select from 40 Seeded Profiles)
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium outline-none focus:border-[#087F5B]"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — {u.role} ({u.roleCategory}) • {u.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>Password / Passcode</span>
                  <span className="text-[10px] text-emerald-700 font-normal">Pre-filled for Demo</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono outline-none focus:border-[#087F5B]"
                />
                <span className="text-[10px] text-gray-500 mt-0.5 block">
                  Demonstration mode: any password is accepted (default: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">qhse@2026</code>).
                </span>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Active Project Context (Qatar)
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium outline-none focus:border-[#087F5B]"
                >
                  {projects.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#087F5B] focus:ring-0"
                  />
                  <span className="text-gray-700 font-medium">Keep session active in browser storage</span>
                </label>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-[#087F5B] hover:underline font-bold text-xs"
                >
                  Need an account? Sign Up
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:from-[#092B24] hover:to-[#073B2F] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In to QHSE Control Centre</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-[10px] uppercase font-semibold text-gray-400">
                  National Digital Identity
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                onClick={() => login('USR-019')}
                className="w-full py-2 border border-emerald-600/30 hover:bg-emerald-50/50 rounded-xl font-semibold text-xs text-[#073B2F] flex items-center justify-center gap-2 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#20A887]" />
                <span>Sign In with Qatar National Auth (NAS / Tawtheeq Demo)</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Sign Up / Register Account */}
        {activeTab === 'signup' && (
          <div className="p-5 max-w-2xl mx-auto w-full">
            <div className="mb-4 text-center">
              <h3 className="text-sm font-bold text-gray-900 flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4 text-[#087F5B]" />
                <span>Create New User Profile & Register Access</span>
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Register a new employee or subcontractor with custom role permissions and instantly sign in.
              </p>
            </div>

            {/* Quick 1-Tap Presets */}
            <div className="mb-4 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
              <span className="text-[11px] font-bold text-[#073B2F] block mb-1.5">
                ⚡ Fast Fill Presets (Click to autofill role):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => applySignUpPreset('worker')}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 font-semibold text-gray-800 transition-colors text-center"
                >
                  👷 Field Worker
                </button>
                <button
                  type="button"
                  onClick={() => applySignUpPreset('supervisor')}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 font-semibold text-gray-800 transition-colors text-center"
                >
                  📋 Site Supervisor
                </button>
                <button
                  type="button"
                  onClick={() => applySignUpPreset('hse')}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 font-semibold text-gray-800 transition-colors text-center"
                >
                  🛡️ HSE Manager
                </button>
                <button
                  type="button"
                  onClick={() => applySignUpPreset('admin')}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 font-semibold text-gray-800 transition-colors text-center"
                >
                  ⚙️ System Admin
                </button>
              </div>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohammed Al-Ansari"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. m.alansari@client-org.qa"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={signUpEmpId}
                    onChange={(e) => setSignUpEmpId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono outline-none focus:border-[#087F5B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
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
                      else if (cat === 'Leadership') setSignUpRole('Project Manager');
                      else if (cat === 'Specialist') setSignUpRole('HSE Inspector');
                      else setSignUpRole('System Administrator');
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                  >
                    <option value="Workforce">Workforce</option>
                    <option value="Supervision">Supervision</option>
                    <option value="HSE">HSE Specialist / Manager</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Specialist">Specialist / Auditor</option>
                    <option value="Administration">Platform Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={signUpRole}
                    onChange={(e) => setSignUpRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={signUpDept}
                    onChange={(e) => setSignUpDept(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Assigned Project Location
                  </label>
                  <select
                    value={signUpProject}
                    onChange={(e) => setSignUpProject(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                  >
                    {projects.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Contractor / Organisation Entity
                </label>
                <input
                  type="text"
                  value={signUpCompany}
                  onChange={(e) => setSignUpCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600">
                <span className="font-bold text-gray-900 block mb-0.5">Permissions Granted Automatically:</span>
                Universal Stop Work Authority, Incident / Hazard Reporting, AI Voice Dictation, and relevant category permissions based on Qatar HSE Governance Matrix.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:from-[#092B24] hover:to-[#073B2F] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Profile & Sign In Immediately</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="text-gray-500 hover:text-gray-900 text-[11px]"
                >
                  Already have an account? <span className="font-bold text-[#087F5B]">Sign In here</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: RBAC Permissions Matrix */}
        {activeTab === 'matrix' && (
          <div className="p-4 sm:p-5 overflow-x-auto text-xs">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#073B2F] text-white text-[11px]">
                  <th className="p-2 rounded-tl-lg font-bold">Platform Capability / Module</th>
                  <th className="p-2 text-center font-bold">Workforce</th>
                  <th className="p-2 text-center font-bold">Supervision</th>
                  <th className="p-2 text-center font-bold">HSE Specialist</th>
                  <th className="p-2 text-center font-bold">HSE Manager</th>
                  <th className="p-2 text-center font-bold">Leadership</th>
                  <th className="p-2 rounded-tr-lg text-center font-bold">Administrator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-[10px]">
                {[
                  { feature: 'Universal Stop Work Authority', wf: true, sup: true, spec: true, mgr: true, ldr: true, adm: true },
                  { feature: 'Instant Hazard & Near Miss Reporting', wf: true, sup: true, spec: true, mgr: true, ldr: true, adm: true },
                  { feature: 'AI-Voice Assisted Field Observations', wf: true, sup: true, spec: true, mgr: true, ldr: true, adm: true },
                  { feature: 'Executive Dashboard & KPI Analytics', wf: false, sup: true, spec: true, mgr: true, ldr: true, adm: true },
                  { feature: 'Incident Classification & Investigation', wf: false, sup: true, spec: true, mgr: true, ldr: false, adm: true },
                  { feature: '5-Whys & Root Cause Sign-Off', wf: false, sup: false, spec: true, mgr: true, ldr: false, adm: true },
                  { feature: 'Permit to Work (PTW) Issuance & Sign-off', wf: false, sup: true, spec: false, mgr: true, ldr: false, adm: true },
                  { feature: 'Qatar Legal Register & Compliance Audit', wf: false, sup: false, spec: true, mgr: true, ldr: true, adm: true },
                  { feature: 'Controlled Document Approval & Archival', wf: false, sup: false, spec: true, mgr: true, ldr: true, adm: true },
                  { feature: 'Export Browser-Generated PDF & Excel', wf: false, sup: true, spec: true, mgr: true, ldr: true, adm: true },
                  { feature: 'User Management & Custom Permissions', wf: false, sup: false, spec: false, mgr: false, ldr: false, adm: true },
                  { feature: 'System Audit Trail & Security Config', wf: false, sup: false, spec: false, mgr: false, ldr: false, adm: true },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F4F7F5]'}>
                    <td className="p-2 font-semibold text-gray-900">{row.feature}</td>
                    <td className="p-2 text-center">{row.wf ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                    <td className="p-2 text-center">{row.sup ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                    <td className="p-2 text-center">{row.spec ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                    <td className="p-2 text-center">{row.mgr ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                    <td className="p-2 text-center">{row.ldr ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                    <td className="p-2 text-center">{row.adm ? <span className="text-purple-700 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3.5 text-center">
              <button
                onClick={() => setActiveTab('signup')}
                className="px-3.5 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-bold text-xs rounded-xl shadow transition-colors inline-flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register User Profile with Custom Permissions</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-[10px] text-gray-500">
          DEMONSTRATION DATA ENVIRONMENT — STRICT FRONTEND ARCHITECTURE WITH LOCAL BROWSER PERSISTENCE
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BELOW: DEDICATED MOCK DATA DIRECTORY FOR BOTH CONTROLLED DESKTOP & MOBILE */}
      {/* ========================================================================= */}
      <div className="max-w-4xl xl:max-w-5xl w-full flex flex-col gap-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#06241D] text-white p-4 rounded-2xl border border-white/10 shadow-lg gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#20A887] text-white flex items-center justify-center font-bold shadow-md">
              <Cpu className="w-5 h-5 text-[#DDF5EA]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">
                  Seeded Demonstration Mock Data & Controlled Environments
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded-full font-mono uppercase">
                  Zero Backend
                </span>
              </div>
              <p className="text-[11px] text-[#DDF5EA]/80 mt-0.5">
                Pre-configured records, speech scenarios, and sample credentials for both Desktop Control Centre and Mobile Workforce App.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              resetAllData();
              addToast('info', 'Demo Data Reset', 'All mock data restored to clean demonstration baseline.');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15 transition-all self-start sm:self-auto"
            title="Reset demonstration records to baseline"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Reset Baseline Data</span>
          </button>
        </div>

        {/* Two-Column Mock Data Grid: Desktop Control Centre vs Mobile Workforce App */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ========================================= */}
          {/* CARD 1: CONTROLLED DESKTOP HSE CONTROL CENTRE */}
          {/* ========================================= */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#073B2F] text-white flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">Desktop HSE Control Centre</h4>
                    <span className="text-[10px] text-gray-500">Executive & Management Workstation</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Full Width / Dual
                </span>
              </div>

              {/* Controlled Desktop Personas */}
              <div className="space-y-2 mb-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Controlled Personas & Credentials
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-[11px]">Nasser Al-Khelaifi</div>
                      <div className="text-[10px] text-gray-500 font-mono">EMP-1019 • Senior HSE Manager</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-semibold">
                      Full Approvals & Sign-off
                    </span>
                  </div>

                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-[11px]">Tariq Al-Mansoor</div>
                      <div className="text-[10px] text-gray-500 font-mono">EMP-1010 • Site Safety Supervisor</div>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-semibold">
                      PTW & Hazard Review
                    </span>
                  </div>

                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-[11px]">Khalid Al-Sulaiti</div>
                      <div className="text-[10px] text-gray-500 font-mono">EMP-1035 • Platform Administrator</div>
                    </div>
                    <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-semibold">
                      Security & Governance
                    </span>
                  </div>
                </div>
              </div>

              {/* Seeded Records Overview */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Seeded Records Ready on Desktop
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="p-1.5 rounded bg-emerald-50/70 border border-emerald-200">
                    <span className="font-bold text-emerald-950 block">HAZ-2026-0042</span>
                    <span className="text-gray-600">Slab void (High Risk 16)</span>
                  </div>
                  <div className="p-1.5 rounded bg-blue-50/70 border border-blue-200">
                    <span className="font-bold text-blue-950 block">INV-2026-0042</span>
                    <span className="text-gray-600">5-Whys root cause study</span>
                  </div>
                  <div className="p-1.5 rounded bg-teal-50/70 border border-teal-200">
                    <span className="font-bold text-teal-950 block">CAPA-2026-0095</span>
                    <span className="text-gray-600">Steel mesh bolted proof</span>
                  </div>
                  <div className="p-1.5 rounded bg-amber-50/70 border border-amber-200">
                    <span className="font-bold text-amber-950 block">PTW-2026-0088</span>
                    <span className="text-gray-600">Hot Work gas cutting permit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Desktop Button */}
            <button
              onClick={() => {
                login('USR-019'); // Nasser Al-Khelaifi
                setActiveDesktopModule('Executive Dashboard');
                setViewMode('desktop-only');
                addToast('success', 'Desktop Control Centre Active', 'Logged in as Senior HSE Manager Nasser Al-Khelaifi');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:from-[#092B24] hover:to-[#073B2F] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Launch Desktop HSE Control Centre →</span>
            </button>
          </div>

          {/* ========================================= */}
          {/* CARD 2: CONTROLLED MOBILE WORKFORCE APP */}
          {/* ========================================= */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#087F5B] text-white flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-[#DDF5EA]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">Mobile HSE Workforce App</h4>
                    <span className="text-[10px] text-gray-500">Frontline Field Observation & Speech AI</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Shared Sync State
                </span>
              </div>

              {/* Controlled Mobile Personas */}
              <div className="space-y-2 mb-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Controlled Personas & Field Passports
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-[11px]">Ahmed Hassan</div>
                      <div className="text-[10px] text-gray-500 font-mono">EMP-1045 • Field Construction Worker</div>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">
                      Voice AI & Stop Work
                    </span>
                  </div>

                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-[11px]">Rajesh Kumar</div>
                      <div className="text-[10px] text-gray-500 font-mono">EMP-1046 • Contractor Specialist</div>
                    </div>
                    <span className="text-[10px] bg-orange-100 text-orange-900 px-2 py-0.5 rounded font-semibold">
                      Hot Work Receiver
                    </span>
                  </div>

                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-[11px]">Waleed Al-Ghanim</div>
                      <div className="text-[10px] text-gray-500 font-mono">EMP-1036 • Action Owner & Supervisor</div>
                    </div>
                    <span className="text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-semibold">
                      Mobile Rectification Photo
                    </span>
                  </div>
                </div>
              </div>

              {/* Pre-loaded Speech Scenarios on Mobile */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block flex items-center justify-between">
                  <span>5 Preloaded Speech AI Scenarios</span>
                  <span className="text-emerald-700 font-semibold lowercase">typewriter + audio ready</span>
                </span>
                <div className="grid grid-cols-1 gap-1 text-[10px]">
                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <span className="font-medium text-gray-800">1. Uncovered Level 2 Floor Penetration (HAZ-0042)</span>
                    <span className="font-mono text-[9px] text-[#087F5B]">Art. 100</span>
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <span className="font-medium text-gray-800">2. Midday Outdoor Work Ban Violation (WBGT 33.2°C)</span>
                    <span className="font-mono text-[9px] text-amber-700">MD 17/2021</span>
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <span className="font-medium text-gray-800">3. Facade Scaffold Missing Mid-Rail & Toe-board</span>
                    <span className="font-mono text-[9px] text-blue-700">QCS Standard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Mobile Button */}
            <button
              onClick={() => {
                login('USR-001'); // Ahmed Hassan
                setMobileScreen('report-hazard');
                setViewMode('both');
                addToast('success', 'Mobile Workforce App Active', 'Logged in as Field Worker Ahmed Hassan (Speech AI Reporting Ready)');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#20A887] hover:from-[#073B2F] hover:to-[#087F5B] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Launch Mobile App (Ahmed Hassan) →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
