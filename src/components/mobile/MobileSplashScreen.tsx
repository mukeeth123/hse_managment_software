import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Building, CheckCircle2, ArrowRight, Zap, Thermometer, Clock } from 'lucide-react';
import { IMAGE_FLOOR_OPENING } from '../../data/imageAssets';

interface MobileSplashScreenProps {
  onFinish: () => void;
}

export const MobileSplashScreen: React.FC<MobileSplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing Qatar Enterprise Mobile Environment...');
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  useEffect(() => {
    // 3-second countdown ticker
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    const timer1 = setTimeout(() => {
      setProgress(35);
      setStatusText('Mounting Qatar Labour Law No. 14/2004 Registers...');
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(65);
      setStatusText('Checking MD 17/2021 Heat Stress Index (WBGT)...');
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgress(88);
      setStatusText('Connecting Web Speech AI Dictation Engine...');
    }, 2000);

    const timer4 = setTimeout(() => {
      setProgress(98);
      setStatusText('Workforce Safety Portal Ready...');
    }, 2700);

    // Exactly 3.0 seconds (3000ms) completion
    const timer5 = setTimeout(() => {
      setProgress(100);
      onFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onFinish]);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-between p-5 select-none overflow-hidden bg-[#041712] text-white">
      {/* Background Worksite Image with Qatar Green Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-3000 ease-out"
        style={{
          backgroundImage: `url("${IMAGE_FLOOR_OPENING}")`,
          filter: 'brightness(0.65) contrast(1.15)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041712]/92 via-[#073B2F]/88 to-[#041712]/96" />

      {/* Top Client Pill & 3s Indicator */}
      <div className="relative z-10 pt-2 w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] text-[#DDF5EA] shadow-sm animate-in fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>State of Qatar Enterprise</span>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>{secondsRemaining}s</span>
        </div>
      </div>

      {/* Center Logo & Branding */}
      <div className="relative z-10 flex flex-col items-center text-center px-2 my-auto">
        {/* Shield Icon Emblem with Pulse Ring */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#073B2F] via-[#087F5B] to-[#20A887] text-white flex items-center justify-center shadow-2xl border border-white/20 ring-4 ring-emerald-500/30 animate-pulse">
            <Shield className="w-9 h-9 text-white" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#20A887] border-2 border-[#041712] flex items-center justify-center text-white text-[9px] font-bold shadow">
            QA
          </span>
        </div>

        <h1 className="text-xl font-black tracking-tight text-white uppercase">
          QHSE Mobile Platform
        </h1>

        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-[9px] font-bold bg-[#20A887] text-[#041712] px-2 py-0.5 rounded uppercase tracking-wider font-mono shadow">
            Workforce Edition
          </span>
        </div>

        <p className="text-xs text-[#DDF5EA]/90 mt-2 font-medium max-w-[240px] leading-tight">
          Field Safety Observations, Speech AI Dictation & Stop Work Authority
        </p>

        {/* Regulatory Badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-[9px] text-[#20A887] font-mono">
          <span className="px-2 py-0.5 bg-black/40 rounded border border-white/10 flex items-center gap-1">
            <Thermometer className="w-2.5 h-2.5 text-amber-400" />
            <span>MD 17/2021 Heat Ready</span>
          </span>
          <span className="px-2 py-0.5 bg-black/40 rounded border border-white/10">
            Law 14/2004 Art. 100
          </span>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="w-full max-w-[260px] mt-6 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-[#DDF5EA]/80 font-mono">
            <span className="truncate pr-2">{statusText}</span>
            <span className="font-bold text-[#20A887]">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#087F5B] via-[#20A887] to-emerald-400 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action CTA & Skip */}
      <div className="relative z-10 pb-3 w-full flex flex-col items-center gap-2">
        <button
          onClick={onFinish}
          className="w-full max-w-[260px] py-2.5 px-4 bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 group"
        >
          <span>Continue to Welcome Tour</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-[9px] text-[#DDF5EA]/60 font-mono">
          Startup Splash Screen • Auto-advancing in 3 seconds
        </span>
      </div>
    </div>
  );
};
