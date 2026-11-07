import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Shield,
  Bell,
  Search,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Maximize2,
  Minimize2,
  Check,
  Building,
  User as UserIcon,
  AlertTriangle,
  Smartphone,
  Monitor,
  LogOut,
  UserPlus,
  Home,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DesktopTopbar: React.FC = () => {
  const {
    currentUser,
    switchUser,
    users,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetAllData,
    viewMode,
    setViewMode,
    setIsScenarioModalOpen,
    setActiveDesktopModule,
    setSelectedRecordRef,
    logout,
    setIsCreateProfileModalOpen,
    setPortalView,
  } = useHSE();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="min-h-[72px] h-[72px] py-2 px-4 bg-[#073B2F] border-b border-[#092B24] text-white flex items-center justify-between z-30 shadow-md flex-shrink-0 gap-3">
      {/* Left: User Profile Switcher (positioned on the left as requested) & Product Brand */}
      <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
        {/* RBAC Role & User Profile Switcher */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg bg-black/25 hover:bg-black/35 border border-white/15 transition-all text-left shadow-sm group"
            title="Logged In Profile — Click to Switch RBAC Role"
          >
            <div className="w-8 h-8 rounded-full bg-[#20A887] text-white flex items-center justify-center font-bold text-sm uppercase shadow-sm flex-shrink-0 group-hover:ring-2 group-hover:ring-[#DDF5EA]/40 transition-all">
              {currentUser.name.charAt(0)}
            </div>
            <div className="leading-tight whitespace-nowrap">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="font-semibold text-white">{currentUser.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-[#087F5B] text-white rounded font-medium border border-white/10 uppercase tracking-wide">
                  {currentUser.roleCategory}
                </span>
              </div>
              <div className="text-[10px] text-[#DDF5EA]/85 font-medium">{currentUser.role}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#DDF5EA]/80 flex-shrink-0 ml-0.5" />
          </button>

          {isUserDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsUserDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-72 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-800 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-3 bg-[#073B2F] text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#20A887]">
                    Frontend RBAC Role Switcher
                  </div>
                  <div className="text-xs text-[#DDF5EA] mt-0.5">
                    Select any of the 40 seeded enterprise users to test role-based behaviour:
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 p-1">
                  {users.map((u) => {
                    const isSelected = u.id === currentUser.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setIsUserDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 text-left flex items-start gap-2.5 rounded-lg transition-colors ${
                          isSelected ? 'bg-emerald-50 text-emerald-950 font-semibold' : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-900 truncate">{u.name}</span>
                            <span className="text-[10px] text-gray-500 font-mono">{u.employeeId}</span>
                          </div>
                          <div className="text-[11px] text-gray-600 truncate">{u.role}</div>
                          <div className="text-[10px] text-[#087F5B] mt-0.5 flex items-center gap-1">
                            <span>{u.department}</span> • <span>{u.roleCategory}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>

                {/* Profile & Account Actions */}
                <div className="p-2.5 bg-gray-50 border-t border-gray-200 flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      setIsCreateProfileModalOpen(true);
                    }}
                    className="w-full py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-[#073B2F] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-emerald-200"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>+ Create Custom Profile with RBAC</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full py-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-red-200"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600" />
                    <span>Sign Out / Switch Access Gateway</span>
                  </button>
                </div>

                <div className="p-1.5 bg-gray-100 text-[10px] text-gray-500 border-t border-gray-200 text-center">
                  RBAC Access Control — Qatar Demonstration Environment
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-white/20 flex-shrink-0 hidden md:block" />

        {/* Product Name & Neutral Enterprise Identity */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#087F5B] flex items-center justify-center text-white shadow-inner font-bold text-lg flex-shrink-0">
            <Shield className="w-6 h-6 text-[#DDF5EA]" />
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white leading-none">
                QHSE Management Platform
              </h1>
              <span className="text-[10px] font-semibold bg-[#20A887]/30 text-[#DDF5EA] px-2 py-0.5 rounded border border-[#20A887]/40 uppercase tracking-wider">
                Qatar Edition
              </span>
            </div>
            <p className="text-xs text-[#DDF5EA] mt-1 leading-snug font-normal">
              Integrated Health, Safety and Environment Management
            </p>
          </div>
        </div>

        {/* Client Demo Label - Only on extra large screens */}
        <div className="hidden 3xl:flex items-center gap-1.5 ml-2 px-2.5 py-1 bg-black/20 rounded-md border border-white/10 text-xs text-[#DDF5EA]/90 flex-shrink-0">
          <Building className="w-3.5 h-3.5 text-[#20A887]" />
          <span>Client Organisation — Qatar Demonstration Environment</span>
        </div>

        {/* Back to Corporate Website / HSE Services */}
        <button
          onClick={() => setPortalView('homepage')}
          className="hidden sm:flex items-center gap-1.5 ml-1 px-2.5 py-1 bg-[#20A887]/20 hover:bg-[#20A887]/35 rounded-md border border-[#20A887]/40 text-xs font-semibold text-white transition-all flex-shrink-0 shadow-sm"
          title="Return to Corporate Website & HSE Services"
        >
          <Home className="w-3.5 h-3.5 text-[#20A887]" />
          <span className="hidden md:inline">Website & Services</span>
          <span className="md:hidden">Website</span>
        </button>
      </div>

      {/* Center: Demonstration Data & Scenario Quick Access */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => setIsScenarioModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#20A887] to-[#087F5B] hover:from-[#1b8c70] hover:to-[#066347] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all border border-emerald-400/30 group"
          title="Open Complete 6-Phase Client Demonstration Flow (Voice Report → Review → Risk Matrix → Root Cause → CAPA Proof → Sign-off)"
        >
          <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse group-hover:rotate-12 transition-transform" />
          <span className="whitespace-nowrap">Client Demo Flow (HAZ-2026-0042)</span>
        </button>

        <span className="hidden 2xl:inline-block text-[11px] font-mono text-[#DDF5EA]/70 bg-black/30 px-2 py-1 rounded border border-white/5 whitespace-nowrap">
          DEMONSTRATION DATA
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {/* Workspace Display View Controls: Desktop, Side by Side, Mobile */}
        <div className="flex items-center bg-black/25 p-1 rounded-lg border border-white/10 text-xs">
          <button
            onClick={() => setViewMode('desktop-only')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
              viewMode === 'desktop-only'
                ? 'bg-[#20A887] text-white font-bold shadow'
                : 'text-[#DDF5EA]/70 hover:text-white'
            }`}
            title="Desktop Full Screen"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium whitespace-nowrap">Desktop</span>
          </button>

          <button
            onClick={() => setViewMode('both')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
              viewMode === 'both'
                ? 'bg-[#20A887] text-white font-bold shadow'
                : 'text-[#DDF5EA]/70 hover:text-white'
            }`}
            title="Desktop and Mobile Side by Side"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium whitespace-nowrap">Side by Side</span>
          </button>

          <button
            onClick={() => setViewMode('mobile-only')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
              viewMode === 'mobile-only'
                ? 'bg-[#20A887] text-white font-bold shadow'
                : 'text-[#DDF5EA]/70 hover:text-white'
            }`}
            title="Mobile Screen Only"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium whitespace-nowrap">Mobile</span>
          </button>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-lg bg-black/20 hover:bg-black/30 border border-white/10 relative text-[#DDF5EA] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsNotifOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-800 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-3 bg-[#F4F7F5] border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#172B25]">Notifications</span>
                    <Badge variant="low" size="sm">{unreadCount} unread</Badge>
                  </div>
                  <button
                    onClick={() => markAllNotificationsRead()}
                    className="text-xs text-[#087F5B] hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {notifications.slice(0, 10).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkModule) {
                          setActiveDesktopModule(n.linkModule as any);
                          if (n.linkRef) setSelectedRecordRef(n.linkRef);
                        }
                        setIsNotifOpen(false);
                      }}
                      className={`p-3 text-left hover:bg-gray-50 cursor-pointer transition-colors ${
                        !n.read ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold text-gray-900">{n.title}</h5>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.timestamp.substring(11)}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>

                <div className="p-2 bg-gray-50 text-center border-t border-gray-200">
                  <button
                    onClick={() => {
                      setActiveDesktopModule('Notifications and Alerts');
                      setIsNotifOpen(false);
                    }}
                    className="text-xs font-semibold text-[#087F5B] hover:underline"
                  >
                    View All 50 Notifications & Alerts →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Demo Reset Button */}
        <button
          onClick={() => setIsResetConfirmOpen(true)}
          className="p-2 rounded-lg bg-black/20 hover:bg-red-950/40 border border-white/10 text-[#DDF5EA] hover:text-red-300 transition-colors"
          title="Reset Demonstration Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Confirmation Dialog for Reset */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6 text-gray-800">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-gray-900">
              Reset Demonstration Dataset?
            </h3>
            <p className="text-xs text-gray-600 mt-2 text-center leading-relaxed">
              This will reload all 40 users, 25 hazards, 15 incidents, 35 CAPAs, 20 risk assessments, 20 inspections, 15 permits, and Qatar legal compliance register back to their initial seed state.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setIsResetConfirmOpen(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
