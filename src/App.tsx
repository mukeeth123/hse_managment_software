import React from 'react';
import { HSEProvider, useHSE } from './context/HSEContext';
import { WorkspaceContainer } from './components/layout/WorkspaceContainer';
import { PortalNavbar } from './components/portal/PortalNavbar';
import { PortalFooter } from './components/portal/PortalFooter';
import { HomePage } from './components/portal/HomePage';
import { HSEServicesPage } from './components/portal/HSEServicesPage';
import { EnquiryModal } from './components/portal/EnquiryModal';
import { SplashScreen } from './components/common/SplashScreen';
import { ClientFlowModal } from './components/common/ClientFlowModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppContent: React.FC = () => {
  const { portalView, showSplashScreen, setShowSplashScreen } = useHSE();

  if (showSplashScreen) {
    return <SplashScreen onFinish={() => setShowSplashScreen(false)} />;
  }

  if (portalView === 'platform') {
    return <WorkspaceContainer />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F5] selection:bg-[#20A887]/20 selection:text-[#073B2F]">
      <PortalNavbar />
      <main className="flex-1">
        {portalView === 'homepage' && <HomePage />}
        {portalView === 'services' && <HSEServicesPage />}
      </main>
      <PortalFooter />
      <EnquiryModal />
      <ClientFlowModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HSEProvider>
      <MainAppContent />
    </HSEProvider>
  );
};

export default App;
