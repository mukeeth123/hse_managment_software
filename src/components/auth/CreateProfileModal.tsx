import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  UserPlus,
  Shield,
  CheckCircle,
  X,
  Lock,
  Building,
  Briefcase,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { RoleCategory, UserRole, UserPermissions } from '../../types';
import { getDefaultPermissionsForRole } from '../../services/dataService';

export const CreateProfileModal: React.FC = () => {
  const {
    isCreateProfileModalOpen,
    setIsCreateProfileModalOpen,
    createUserAndLogin,
    projects,
  } = useHSE();

  // Form State
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState(`EMP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+974 ');
  const [project, setProject] = useState(projects[0] || 'Commercial Tower Lusail');
  const [department, setDepartment] = useState('HSE & Compliance');
  const [roleCategory, setRoleCategory] = useState<RoleCategory>('HSE');
  const [role, setRole] = useState<UserRole>('HSE Officer');
  const [contractorCompany, setContractorCompany] = useState('');

  // Granular Permissions State
  const [permissions, setPermissions] = useState<UserPermissions>(
    getDefaultPermissionsForRole('HSE', 'HSE Officer')
  );

  if (!isCreateProfileModalOpen) return null;

  const handleRoleCategoryChange = (cat: RoleCategory) => {
    setRoleCategory(cat);
    let defaultRole: UserRole = 'HSE Officer';
    if (cat === 'Workforce') defaultRole = 'Worker';
    if (cat === 'Supervision') defaultRole = 'Site Supervisor';
    if (cat === 'HSE') defaultRole = 'HSE Manager';
    if (cat === 'Leadership') defaultRole = 'Project Manager';
    if (cat === 'Specialist') defaultRole = 'HSE Inspector';
    if (cat === 'Administration') defaultRole = 'System Administrator';

    setRole(defaultRole);
    setPermissions(getDefaultPermissionsForRole(cat, defaultRole));
  };

  const applyPreset = (presetRole: 'admin' | 'hse' | 'supervisor' | 'worker') => {
    if (presetRole === 'admin') {
      setRoleCategory('Administration');
      setRole('System Administrator');
      setDepartment('IT & Digital Systems');
      setPermissions(getDefaultPermissionsForRole('Administration', 'System Administrator'));
    } else if (presetRole === 'hse') {
      setRoleCategory('HSE');
      setRole('HSE Manager');
      setDepartment('HSE & Compliance');
      setPermissions(getDefaultPermissionsForRole('HSE', 'HSE Manager'));
    } else if (presetRole === 'supervisor') {
      setRoleCategory('Supervision');
      setRole('Site Supervisor');
      setDepartment('Site Operations');
      setPermissions(getDefaultPermissionsForRole('Supervision', 'Site Supervisor'));
    } else {
      setRoleCategory('Workforce');
      setRole('Worker');
      setDepartment('Civil Construction');
      setPermissions(getDefaultPermissionsForRole('Workforce', 'Worker'));
    }
  };

  const togglePermission = (key: keyof UserPermissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createUserAndLogin({
      name,
      employeeId,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@qhse-client.qa`,
      phone: phone || '+974 4400 0000',
      role,
      roleCategory,
      department,
      project,
      supervisorName: 'Khalid Al-Sulaiti',
      contractorCompany: contractorCompany || undefined,
      active: true,
      trainingComplianceStatus: 'Compliant',
      permissions,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full overflow-hidden my-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#073B2F] to-[#0A4D3C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#20A887] text-white flex items-center justify-center shadow">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Create Enterprise Profile & RBAC Permissions</span>
                <span className="text-[10px] bg-white/20 text-[#DDF5EA] px-2 py-0.5 rounded font-mono font-medium">
                  DEMO PORTAL
                </span>
              </h3>
              <p className="text-xs text-[#DDF5EA]/80 mt-0.5">
                Register a new user profile with custom role category and granular access controls
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateProfileModalOpen(false)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Role Templates */}
        <div className="bg-[#F4F7F5] p-3 px-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-gray-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#087F5B]" />
            <span>Fast Role Presets:</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => applyPreset('admin')}
              className="px-2.5 py-1 rounded bg-purple-100 hover:bg-purple-200 text-purple-900 font-semibold text-[11px] transition-colors"
            >
              System Admin
            </button>
            <button
              type="button"
              onClick={() => applyPreset('hse')}
              className="px-2.5 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-[11px] transition-colors"
            >
              HSE Manager
            </button>
            <button
              type="button"
              onClick={() => applyPreset('supervisor')}
              className="px-2.5 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-[11px] transition-colors"
            >
              Site Supervisor
            </button>
            <button
              type="button"
              onClick={() => applyPreset('worker')}
              className="px-2.5 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-[11px] transition-colors"
            >
              Field Worker
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Basic Identity */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>1. User Identity & Project Assignment</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mariam Al-Kuwari"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Assigned Project</label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                >
                  {projects.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Role Category & Title */}
          <div className="pt-2 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>2. Role Tier & Classification</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Role Category</label>
                <select
                  value={roleCategory}
                  onChange={(e) => handleRoleCategoryChange(e.target.value as RoleCategory)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                >
                  <option value="Administration">Administration (Full Access)</option>
                  <option value="HSE">HSE & Safety Governance</option>
                  <option value="Supervision">Site Supervision</option>
                  <option value="Specialist">Specialist / Inspector</option>
                  <option value="Leadership">Leadership & Project Management</option>
                  <option value="Workforce">Workforce / Field Personnel</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Role Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Granular Permissions Matrix */}
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>3. Granular RBAC Permissions</span>
              </h4>
              <span className="text-[10px] text-gray-500">Toggle permissions as required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#F4F7F5] p-3 rounded-xl border border-gray-200 text-xs">
              {[
                { key: 'canViewDashboards', label: 'View Executive Dashboard & Analytics' },
                { key: 'canReportHazards', label: 'Report Hazards & Stop Work Authority' },
                { key: 'canManageIncidents', label: 'Manage & Review Incidents' },
                { key: 'canConductInvestigations', label: 'Lead Root-Cause Investigations' },
                { key: 'canManageCAPA', label: 'Assign & Verify CAPA Actions' },
                { key: 'canManageRiskRegister', label: 'Update Project Risk Register' },
                { key: 'canConductInspections', label: 'Perform Inspections & Audits' },
                { key: 'canIssuePermits', label: 'Issue & Authorise Work Permits (PTW)' },
                { key: 'canVerifyLegalCompliance', label: 'Verify Qatar Statutory Compliance' },
                { key: 'canControlDocuments', label: 'Manage Controlled Policies & SOPs' },
                { key: 'canExportReports', label: 'Export PDF & Excel Compliance Reports' },
                { key: 'canAdministerUsers', label: 'Administer Users & Access Rights' },
                { key: 'canAccessSystemSettings', label: 'Access System Security Settings' },
              ].map((item) => {
                const isChecked = !!permissions[item.key as keyof UserPermissions];
                return (
                  <label
                    key={item.key}
                    onClick={() => togglePermission(item.key as keyof UserPermissions)}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all border ${
                      isChecked
                        ? 'bg-white border-[#087F5B] text-gray-900 shadow-xs'
                        : 'bg-white/50 border-gray-200 text-gray-500 hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent onClick
                      className="rounded text-[#087F5B] focus:ring-0"
                    />
                    <span className="text-[11px] font-medium leading-tight select-none">
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsCreateProfileModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:from-[#092B24] hover:to-[#073B2F] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Profile & Start Session</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
