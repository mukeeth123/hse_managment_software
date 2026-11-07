import React from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Home,
  FileText,
  PlusCircle,
  CheckSquare,
  User as UserIcon,
  Wifi,
  Battery,
  Shield,
  Smartphone,
  Maximize2,
  Sparkles,
} from 'lucide-react';

// Mobile Screens
import { MobileHomeScreen } from './MobileHomeScreen';
import { MobileReportHazard } from './MobileReportHazard';
import { MobileReportIncident } from './MobileReportIncident';
import { MobileReportNearMiss } from './MobileReportNearMiss';
import { MobileMyReports } from './MobileMyReports';
import { MobileMyTasks } from './MobileMyTasks';
import { MobileSafetyInfo } from './MobileSafetyInfo';
import { MobileProfile } from './MobileProfile';
import { MobileLoginScreen } from './MobileLoginScreen';
import { MobileSplashScreen } from './MobileSplashScreen';
import { MobileWelcomeSlides } from './MobileWelcomeSlides';

export const SmartphoneFrame: React.FC = () => {
  const {
    mobileScreen,
    setMobileScreen,
    notifications,
    viewMode,
    setViewMode,
    isAuthenticated,
    showMobileSplash,
    setShowMobileSplash,
    showMobileWelcome,
    setShowMobileWelcome,
  } = useHSE();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderScreen = () => {
    if (showMobileSplash) {
      return (
        <MobileSplashScreen
          onFinish={() => {
            setShowMobileSplash(false);
            setShowMobileWelcome(true);
          }}
        />
      );
    }

    if (showMobileWelcome) {
      return (
        <MobileWelcomeSlides
          onFinish={() => setShowMobileWelcome(false)}
        />
      );
    }

    if (!isAuthenticated) {
      return <MobileLoginScreen />;
    }

    switch (mobileScreen) {
      case 'home':
        return <MobileHomeScreen />;
      case 'report-hazard':
        return <MobileReportHazard />;
      case 'report-incident':
        return <MobileReportIncident />;
      case 'report-nearmiss':
        return <MobileReportNearMiss />;
      case 'reports':
        return <MobileMyReports />;
      case 'tasks':
        return <MobileMyTasks />;
      case 'safety':
        return <MobileSafetyInfo />;
      case 'profile':
        return <MobileProfile />;
      default:
        return <MobileHomeScreen />;
    }
  };

  return (
    <div className="relative select-none flex flex-col items-center flex-shrink-0">
      {/* Phone Label */}
      <div className="text-center mb-3 flex items-center justify-center gap-2 flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 text-slate-200 border border-slate-700/80 text-[11px] font-medium shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Mobile HSE App</span>
        </div>
        <button
          onClick={() => {
            setShowMobileWelcome(false);
            setShowMobileSplash(true);
          }}
          className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-[#087F5B] text-slate-200 hover:text-white border border-slate-700/80 text-[10px] font-semibold transition-all shadow-sm flex items-center gap-1 active:scale-95"
          title="Replay 3-Second Mobile Startup Splash Screen"
        >
          <Sparkles className="w-3 h-3 text-[#20A887]" />
          <span>Splash (3s)</span>
        </button>

        <button
          onClick={() => {
            setShowMobileSplash(false);
            setShowMobileWelcome(true);
          }}
          className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-[#20A887] text-slate-200 hover:text-white border border-slate-700/80 text-[10px] font-semibold transition-all shadow-sm flex items-center gap-1 active:scale-95"
          title="Replay Mobile Welcome Onboarding Slides"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Welcome Tour</span>
        </button>
      </div>

      {/* Realistic Titanium Smartphone Chassis */}
      <div
        className={`w-[365px] bg-[#16191D] rounded-[48px] p-2.5 shadow-2xl border-[4px] border-[#2E333D] relative flex flex-col ring-1 ring-white/10 ring-offset-4 ring-offset-black/60 flex-shrink-0 transition-all ${
          viewMode === 'mobile-only'
            ? 'h-[720px] max-h-[calc(100vh-70px)] min-h-[520px]'
            : 'h-[660px] max-h-[calc(100vh-130px)] min-h-[480px]'
        }`}
      >
        {/* Exterior Edge Highlights & Physical Buttons */}
        <div className="absolute -left-[7px] top-24 w-[4px] h-7 bg-[#3A3F45] rounded-l-md"></div>
        <div className="absolute -left-[7px] top-36 w-[4px] h-11 bg-[#3A3F45] rounded-l-md"></div>
        <div className="absolute -left-[7px] top-50 w-[4px] h-11 bg-[#3A3F45] rounded-l-md"></div>
        <div className="absolute -right-[7px] top-32 w-[4px] h-14 bg-[#3A3F45] rounded-r-md"></div>

        {/* Ear Speaker Receiver Slit */}
        <div className="w-12 h-1 bg-black/60 rounded-full mx-auto mb-1.5 flex-shrink-0"></div>

        {/* Inner Screen Display (Curved OLED Bezel) */}
        <div className="w-full h-full bg-[#F4F7F5] rounded-[38px] overflow-hidden flex flex-col relative border border-black/80 shadow-inner">
          {/* iOS / Smartphone Top Status Bar (High-Contrast Jet Black OLED) */}
          <div className="h-10 bg-slate-950 text-white px-5 flex items-center justify-between text-[11px] font-semibold flex-shrink-0 z-30 select-none border-b border-white/10 shadow-xs">
            <span className="font-semibold text-xs tracking-tight text-white/95">09:41</span>

            {/* Dynamic Island Notch */}
            <div
              onClick={() => setShowMobileSplash(true)}
              className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-white/15 cursor-pointer hover:border-emerald-400/80 transition-all active:scale-95 group"
              title="Click to replay Mobile Splash Screen"
            >
              <div className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-900"></div>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[8px] text-emerald-400 font-mono font-bold tracking-wider group-hover:text-white">LIVE</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-white/90">
              <span className="text-[9px] font-mono text-emerald-400 font-bold">5G</span>
              <Wifi className="w-3.5 h-3.5 text-white/90" />
              <Battery className="w-4 h-4 text-white/90 fill-current" />
            </div>
          </div>

          {/* Active Screen Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {renderScreen()}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          {isAuthenticated && (
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 flex items-center justify-around z-20 shadow-lg">
              <button
                onClick={() => setMobileScreen('home')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
                  mobileScreen === 'home' ? 'text-[#087F5B] font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-[10px]">Home</span>
              </button>

              <button
                onClick={() => setMobileScreen('reports')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
                  mobileScreen === 'reports' ? 'text-[#087F5B] font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-[10px]">Reports</span>
              </button>

              {/* Center Quick Create Action */}
              <button
                onClick={() => setMobileScreen('report-hazard')}
                className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-tr from-[#073B2F] to-[#087F5B] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all ring-4 ring-white"
                title="Report New Hazard"
              >
                <PlusCircle className="w-6 h-6" />
              </button>

              <button
                onClick={() => setMobileScreen('tasks')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
                  mobileScreen === 'tasks' ? 'text-[#087F5B] font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span className="text-[10px]">Tasks</span>
              </button>

              <button
                onClick={() => setMobileScreen('profile')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
                  mobileScreen === 'profile' ? 'text-[#087F5B] font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span className="text-[10px]">Profile</span>
              </button>
            </div>
          )}

          {/* Bottom Home Swipe Bar Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/40 rounded-full z-30 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
