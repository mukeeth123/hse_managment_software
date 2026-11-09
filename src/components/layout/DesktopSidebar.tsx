import React from 'react';
import { useHSE, DesktopModule } from '../../context/HSEContext';
import {
  LayoutDashboard,
  AlertOctagon,
  Eye,
  AlertTriangle,
  SearchCheck,
  CheckSquare,
  ShieldAlert,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  Ambulance,
  Leaf,
  Scale,
  FolderLock,
  BarChart3,
  Sparkles,
  MessageSquare,
  Bell,
  Users,
  History,
  Settings,
} from 'lucide-react';

interface NavItem {
  id: DesktopModule;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: (ctx: any) => number | undefined;
  badgeVariant?: string;
  category: 'Overview' | 'Operations' | 'Safety Systems' | 'Compliance & Governance' | 'Administration';
}

const navItems: NavItem[] = [
  { id: 'Executive Dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, category: 'Overview' },
  { id: 'HSE AI Chat Copilot', label: 'HSE AI Chat Copilot', icon: MessageSquare, category: 'Overview' },
  { id: 'AI-Assisted HSE Search', label: 'AI-Assisted HSE Search', icon: Sparkles, category: 'Overview' },
  { id: 'Analytics and Reports', label: 'Analytics and Reports', icon: BarChart3, category: 'Overview' },

  {
    id: 'Hazard Reporting',
    label: 'Hazard Reporting',
    icon: AlertTriangle,
    category: 'Operations',
    badgeCount: (ctx) => ctx.hazards.filter((h: any) => h.status === 'Submitted' || h.status === 'Under Review').length,
    badgeVariant: 'high',
  },
  {
    id: 'Incident Management',
    label: 'Incident Management',
    icon: AlertOctagon,
    category: 'Operations',
    badgeCount: (ctx) => ctx.incidents.filter((i: any) => i.status !== 'Closed').length,
    badgeVariant: 'critical',
  },
  { id: 'Near Miss Management', label: 'Near Miss Management', icon: Eye, category: 'Operations' },
  {
    id: 'Investigation Management',
    label: 'Investigation Management',
    icon: SearchCheck,
    category: 'Operations',
    badgeCount: (ctx) => ctx.investigations.filter((inv: any) => inv.status !== 'Completed').length,
  },
  {
    id: 'Corrective and Preventive Actions',
    label: 'CAPA Action Tracker',
    icon: CheckSquare,
    category: 'Operations',
    badgeCount: (ctx) => ctx.capas.filter((c: any) => c.status !== 'Closed').length,
    badgeVariant: 'actionPending',
  },

  { id: 'Risk Register', label: 'Risk Register (5x5 Matrix)', icon: ShieldAlert, category: 'Safety Systems' },
  { id: 'Inspections and Audits', label: 'Inspections & Audits', icon: ClipboardList, category: 'Safety Systems' },
  {
    id: 'Permit to Work',
    label: 'Permit to Work (PTW)',
    icon: FileCheck2,
    category: 'Safety Systems',
    badgeCount: (ctx) => ctx.permits.filter((p: any) => p.status === 'Active').length,
  },
  { id: 'Training and Competency', label: 'Training & Competency', icon: GraduationCap, category: 'Safety Systems' },
  { id: 'Emergency Preparedness', label: 'Emergency Preparedness', icon: Ambulance, category: 'Safety Systems' },
  { id: 'Environmental Management', label: 'Environmental Management', icon: Leaf, category: 'Safety Systems' },

  {
    id: 'Qatar Legal Compliance',
    label: 'Qatar Legal Compliance',
    icon: Scale,
    category: 'Compliance & Governance',
    badgeCount: (ctx) => ctx.legalRegister.filter((l: any) => l.complianceStatus !== 'Compliant').length,
    badgeVariant: 'high',
  },
  { id: 'Document Control', label: 'Document Control', icon: FolderLock, category: 'Compliance & Governance' },
  { id: 'Audit Trail', label: 'Audit Trail & Compliance Log', icon: History, category: 'Compliance & Governance' },

  {
    id: 'Notifications and Alerts',
    label: 'Notifications & Alerts',
    icon: Bell,
    category: 'Administration',
    badgeCount: (ctx) => ctx.notifications.filter((n: any) => !n.read).length,
    badgeVariant: 'high',
  },
  { id: 'Users and Roles', label: 'Users & RBAC Roles', icon: Users, category: 'Administration' },
  { id: 'Settings', label: 'Settings & Architecture', icon: Settings, category: 'Administration' },
];

export const DesktopSidebar: React.FC = () => {
  const hse = useHSE();
  const { activeDesktopModule, setActiveDesktopModule, setSelectedRecordRef } = hse;

  const categories = [
    'Overview',
    'Operations',
    'Safety Systems',
    'Compliance & Governance',
    'Administration',
  ] as const;

  return (
    <aside className="w-64 bg-[#092B24] border-r border-[#073B2F] text-[#DDF5EA] flex flex-col flex-shrink-0 select-none shadow-lg">
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 text-xs">
        {categories.map((cat) => {
          const items = navItems.filter((item) => item.category === cat);
          return (
            <div key={cat}>
              <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#20A887]">
                {cat}
              </div>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive = activeDesktopModule === item.id;
                  const Icon = item.icon;
                  const count = item.badgeCount ? item.badgeCount(hse) : undefined;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveDesktopModule(item.id);
                        setSelectedRecordRef(undefined);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-[#087F5B] text-white font-semibold shadow-sm'
                          : 'hover:bg-white/5 text-[#DDF5EA]/90 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 ${
                            isActive ? 'text-white' : 'text-[#20A887]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.id === 'HSE AI Chat Copilot' && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                          isActive ? 'bg-white text-[#073B2F]' : 'bg-[#20A887]/30 text-[#DDF5EA] border border-[#20A887]/50'
                        }`}>
                          LIVE
                        </span>
                      )}

                      {count !== undefined && count > 0 && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            isActive ? 'bg-white text-[#073B2F]' : 'bg-[#20A887] text-white'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Qatar Legal Disclaimer Footer */}
      <div className="p-3 border-t border-white/10 bg-black/20 text-[10px] text-[#DDF5EA]/60 leading-normal">
        <p className="font-semibold text-[#DDF5EA]/80 mb-0.5">Qatar Legal Framework</p>
        <p>Al Meezan • Labour Law 14/2004 • Heat Stress MD 17/2021 • Environment Law 30/2002 • QCDD</p>
      </div>
    </aside>
  );
};
