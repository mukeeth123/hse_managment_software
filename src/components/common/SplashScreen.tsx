import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Building, CheckCircle2, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing Qatar Statutory Compliance Engine...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Mounting 40 Enterprise User Profiles & RBAC Permissions...');
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStatusText('Connecting Dual Desktop & Mobile Smartphone Workspaces...');
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('QHSE Platform Demonstration Environment Ready.');
    }, 2000);

    const timer4 = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden bg-[#041712]">
      {/* Background Worksite / Architecture Image with Rich Qatar Green Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 animate-pulse"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=1600&q=80')`,
          filter: 'brightness(0.7) contrast(1.1)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041712]/90 via-[#072E24]/85 to-[#051C16]/95" />

      {/* Top Client Badge */}
      <div className="relative z-10 mb-8 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#DDF5EA] shadow-lg animate-in fade-in duration-500">
        <Building className="w-3.5 h-3.5 text-[#20A887]" />
        <span>Client Organisation — Qatar Demonstration Environment</span>
      </div>

      {/* Center Shield & Logo */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl">
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#073B2F] via-[#087F5B] to-[#20A887] text-white flex items-center justify-center shadow-2xl border border-white/20 ring-8 ring-emerald-500/10 animate-bounce">
            <Shield className="w-11 h-11 text-white" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#20A887] border-2 border-[#041712] flex items-center justify-center text-white text-[10px] font-bold shadow">
            QA
          </span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
            QHSE Management Platform
          </h1>
          <span className="text-[10px] font-bold bg-[#20A887] text-[#041712] px-2 py-0.5 rounded uppercase tracking-wider shadow">
            Qatar Edition
          </span>
        </div>

        <p className="text-sm font-medium text-[#DDF5EA]/90 max-w-md leading-relaxed">
          Integrated Health, Safety and Environment Enterprise Management
        </p>

        <p className="text-[11px] text-[#20A887] font-mono mt-2 tracking-wide">
          State of Qatar Statutory Compliance • Law No. 14/2004 • MD 17/2021
        </p>

        {/* Loading Progress Bar */}
        <div className="w-full max-w-sm mt-8 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#DDF5EA]/80 font-mono">
            <span className="truncate pr-2">{statusText}</span>
            <span className="font-bold text-[#20A887]">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#087F5B] via-[#20A887] to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Instant Skip / Enter Button */}
        <button
          onClick={onFinish}
          className="mt-7 px-5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-md transition-all flex items-center gap-2 active:scale-95 hover:border-emerald-400"
        >
          <span>Enter Platform</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#20A887]" />
        </button>
      </div>

      {/* Bottom Footer Note */}
      <div className="absolute bottom-5 text-center text-[10px] text-[#DDF5EA]/60 font-mono">
        STRICT FRONTEND ARCHITECTURE — NO EXTERNAL SERVER OR DATABASE DEPENDENCY
      </div>
    </div>
  );
};
