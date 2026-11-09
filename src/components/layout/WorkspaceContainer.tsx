import React from 'react';
import { useHSE, WorkspaceViewMode } from '../../context/HSEContext';
import { Monitor, Maximize2, Home, Smartphone, Sparkles } from 'lucide-react';
import { DesktopTopbar } from './DesktopTopbar';
import { DesktopSidebar } from './DesktopSidebar';
import { SmartphoneFrame } from '../mobile/SmartphoneFrame';
import { ToastContainer } from '../common/ToastContainer';
import { ClientFlowModal } from '../common/ClientFlowModal';
import { SplashScreen } from '../common/SplashScreen';
import { LoginPage } from '../auth/LoginPage';
import { CreateProfileModal } from '../auth/CreateProfileModal';

// Desktop Modules
import { ExecutiveDashboardModule } from '../desktop/modules/ExecutiveDashboardModule';
import { IncidentManagementModule } from '../desktop/modules/IncidentManagementModule';
import { NearMissManagementModule } from '../desktop/modules/NearMissManagementModule';
import { HazardReportingModule } from '../desktop/modules/HazardReportingModule';
import { InvestigationManagementModule } from '../desktop/modules/InvestigationManagementModule';
import { CAPAModule } from '../desktop/modules/CAPAModule';
import { RiskRegisterModule } from '../desktop/modules/RiskRegisterModule';
import { InspectionsModule } from '../desktop/modules/InspectionsModule';
import { PermitToWorkModule } from '../desktop/modules/PermitToWorkModule';
import { TrainingModule } from '../desktop/modules/TrainingModule';
import { EmergencyPreparednessModule } from '../desktop/modules/EmergencyPreparednessModule';
import { EnvironmentalManagementModule } from '../desktop/modules/EnvironmentalManagementModule';
import { QatarLegalComplianceModule } from '../desktop/modules/QatarLegalComplianceModule';
import { DocumentControlModule } from '../desktop/modules/DocumentControlModule';
import { AnalyticsReportsModule } from '../desktop/modules/AnalyticsReportsModule';
import { AISearchModule } from '../desktop/modules/AISearchModule';
import { AIChatModule } from '../desktop/modules/AIChatModule';
import { NotificationsModule } from '../desktop/modules/NotificationsModule';
import { UsersRolesModule } from '../desktop/modules/UsersRolesModule';
import { AuditTrailModule } from '../desktop/modules/AuditTrailModule';
import { SettingsModule } from '../desktop/modules/SettingsModule';

export const WorkspaceContainer: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    activeDesktopModule,
    isAuthenticated,
    showSplashScreen,
    setShowSplashScreen,
    setPortalView,
    setIsScenarioModalOpen,
  } = useHSE();

  if (showSplashScreen) {
    return <SplashScreen onFinish={() => setShowSplashScreen(false)} />;
  }

  const renderActiveModule = () => {
    switch (activeDesktopModule) {
      case 'Executive Dashboard':
        return <ExecutiveDashboardModule />;
      case 'Incident Management':
        return <IncidentManagementModule />;
      case 'Near Miss Management':
        return <NearMissManagementModule />;
      case 'Hazard Reporting':
        return <HazardReportingModule />;
      case 'Investigation Management':
        return <InvestigationManagementModule />;
      case 'Corrective and Preventive Actions':
        return <CAPAModule />;
      case 'Risk Register':
        return <RiskRegisterModule />;
      case 'Inspections and Audits':
        return <InspectionsModule />;
      case 'Permit to Work':
        return <PermitToWorkModule />;
      case 'Training and Competency':
        return <TrainingModule />;
      case 'Emergency Preparedness':
        return <EmergencyPreparednessModule />;
      case 'Environmental Management':
        return <EnvironmentalManagementModule />;
      case 'Qatar Legal Compliance':
        return <QatarLegalComplianceModule />;
      case 'Document Control':
        return <DocumentControlModule />;
      case 'Analytics and Reports':
        return <AnalyticsReportsModule />;
      case 'AI-Assisted HSE Search':
        return <AISearchModule />;
      case 'HSE AI Chat Copilot':
        return <AIChatModule />;
      case 'Notifications and Alerts':
        return <NotificationsModule />;
      case 'Users and Roles':
        return <UsersRolesModule />;
      case 'Audit Trail':
        return <AuditTrailModule />;
      case 'Settings':
        return <SettingsModule />;
      default:
        return <ExecutiveDashboardModule />;
    }
  };

  // Dedicated Pure Mobile View: Shows ONLY the mobile screen without any desktop topbar or sidebars
  if (viewMode === 'mobile-only') {
    return (
      <div className="h-screen w-screen bg-[#071612] flex flex-col items-center justify-center relative overflow-hidden select-none">
        {/* Floating Quick Switcher to return to Side by Side or Desktop */}
        <div className="fixed top-3 right-4 z-50 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white p-1.5 px-3 rounded-full border border-white/20 shadow-2xl text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold mr-1">MOBILE ONLY</span>
          <button
            onClick={() => setIsScenarioModalOpen(true)}
            className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#20A887] to-[#087F5B] hover:opacity-90 text-white text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
            title="Open Complete Client Demonstration Flow"
          >
            <Sparkles className="w-3 h-3 text-emerald-200" />
            <span>Demo Flow</span>
          </button>
          <button
            onClick={() => setViewMode('both')}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all flex items-center gap-1.5"
            title="Switch to Side by Side View"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Side by Side</span>
          </button>
          <button
            onClick={() => setViewMode('desktop-only')}
            className="px-2.5 py-1 rounded-full bg-[#087F5B] hover:bg-[#20A887] text-white text-[11px] font-semibold transition-all flex items-center gap-1.5"
            title="Switch to Desktop Full View"
          >
            <Monitor className="w-3 h-3" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setPortalView('homepage')}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all flex items-center gap-1.5"
            title="Return to Corporate Website & HSE Services"
          >
            <Home className="w-3 h-3 text-[#20A887]" />
            <span>Website</span>
          </button>
        </div>

        {/* Smartphone Frame displayed cleanly without any desktop interference */}
        <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <SmartphoneFrame />
        </div>

        {/* Global Modals & Toasts */}
        <CreateProfileModal />
        <ClientFlowModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F4F7F5] font-sans">
      {/* Top Navigation Bar with Product Branding & Workspace Switchers */}
      <DesktopTopbar />

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Workspace A — Desktop HSE Control Centre or Enterprise Access Gateway */}
        <div className="flex h-full overflow-hidden transition-all duration-300 flex-1">
          {isAuthenticated ? (
            <>
              {/* Desktop Left Sidebar */}
              <DesktopSidebar />

              {/* Desktop Content Screen Area */}
              <main className="flex-1 overflow-y-auto bg-[#F4F7F5] p-5">
                {renderActiveModule()}
              </main>
            </>
          ) : (
            /* Desktop Access Gateway & RBAC Portal */
            <main className="flex-1 overflow-y-auto bg-[#07241C] flex items-center justify-center p-3 sm:p-5">
              <LoginPage />
            </main>
          )}
        </div>

        {/* Workspace B — Mobile HSE Application in Smartphone Frame (Shown in Side by Side mode) */}
        <div
          className={`transition-all duration-300 ${
            viewMode === 'desktop-only'
              ? 'hidden'
              : 'w-[390px] xl:w-[410px] 2xl:w-[430px] border-l border-[#0B352A] bg-[#0E1520] flex flex-col items-center justify-start overflow-y-auto pt-4 pb-8 px-2.5 flex-shrink-0'
          }`}
        >
          <SmartphoneFrame />
        </div>
      </div>

      {/* Global Interactive Modals & Toast alerts */}
      <CreateProfileModal />
      <ClientFlowModal />
      <ToastContainer />
    </div>
  );
};
