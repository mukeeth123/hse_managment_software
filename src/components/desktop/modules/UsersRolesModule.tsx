import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { Users, Search, Filter, UserCheck, Shield, CheckCircle2, XCircle, Edit2, Key } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { User, UserRole, RoleCategory } from '../../../types';

export const UsersRolesModule: React.FC = () => {
  const { users, currentUser, switchUser, switchRole, addToast } = useHSE();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filtered = users.filter((u) => {
    if (categoryFilter !== 'All' && u.roleCategory !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.employeeId.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.project.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleEditUser = (u: User) => {
    setSelectedUser(u);
    setIsEditOpen(true);
  };

  const handleSwitchActive = (u: User) => {
    switchUser(u.id);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">User Directory & Role-Based Access Control (RBAC)</h2>
            <Badge variant="verified" size="sm">{users.length} enterprise users</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Workforce, Supervision, HSE Officers, Leadership & Specialist permission profiles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-gray-500">
            Active Demonstration User: <strong className="text-[#073B2F]">{currentUser.name}</strong> ({currentUser.role})
          </span>
        </div>
      </div>

      {/* RBAC Notice */}
      <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs text-amber-900 leading-relaxed shadow-xs">
        <strong>Demonstration Access Control Architecture:</strong> Access control demonstrates simulated frontend RBAC behaviour. Actions and menus adjust according to the active demonstration role without server-side enforcement.
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search user name, employee ID, role or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Role Categories</option>
            <option value="Workforce">Workforce (Worker, Operator, Technician)</option>
            <option value="Supervision">Supervision (Team Leader, Supervisor, Site Manager)</option>
            <option value="HSE">HSE Department (Officer, Investigator, Manager)</option>
            <option value="Leadership">Leadership (Project Manager, Director)</option>
            <option value="Specialist">Specialist (CAPA Verifier, PTW Issuer)</option>
            <option value="Administration">Administration (System Admin, Auditor)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Employee ID</th>
                <th className="py-2.5 px-3 font-semibold">User Name</th>
                <th className="py-2.5 px-3 font-semibold">Primary Role</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Department</th>
                <th className="py-2.5 px-3 font-semibold">Project Scope</th>
                <th className="py-2.5 px-3 font-semibold">Training Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Simulate Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((u) => {
                const isActiveUser = currentUser.id === u.id;
                return (
                  <tr
                    key={u.id}
                    className={`hover:bg-gray-50/80 transition-colors ${isActiveUser ? 'bg-emerald-50/60 font-semibold' : ''}`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">{u.employeeId}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{u.name}</div>
                      <span className="text-[10px] text-gray-400">{u.email}</span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-800">{u.role}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                        {u.roleCategory}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-600">{u.department}</td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-600">{u.project}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge variant={u.trainingComplianceStatus === 'Compliant' ? 'closed' : 'high'} size="sm">
                        {u.trainingComplianceStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {isActiveUser ? (
                        <span className="px-2.5 py-1 bg-[#087F5B] text-white rounded font-bold text-[10px] shadow-xs">
                          Active Persona
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSwitchActive(u)}
                          className="px-2.5 py-1 bg-white hover:bg-[#073B2F] hover:text-white border border-gray-300 text-gray-700 font-semibold rounded text-[11px] transition-colors"
                        >
                          Switch to User
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
