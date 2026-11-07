import React, { useState } from 'react';
import {
  Shield,
  Mic,
  Camera,
  Monitor,
  Smartphone,
  Zap,
  Scale,
  Thermometer,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  X,
  Users,
} from 'lucide-react';

interface MobileWelcomeSlidesProps {
  onFinish: () => void;
}

export const MobileWelcomeSlides: React.FC<MobileWelcomeSlidesProps> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      badge: 'Hands-Free Voice AI',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: Mic,
      iconColor: 'bg-[#087F5B] text-emerald-200 ring-emerald-500/30',
      headline: 'Speak Your Hazard Observation',
      subtitle: 'Instant AI Voice Reporting & Photo Evidence',
      description:
        'Frontline workers dictate worksite observations using Web Speech AI. Real-time typewriter transcription attaches high-resolution watermarked worksite photos with GPS coordinates.',
      features: [
        'Voice dictation tested for Qatar worksite noise',
        'Auto watermarked photos (date, time & GPS)',
        'Local offline storage when out of cellular range',
      ],
      tagline: 'Qatar Labour Law No. 14/2004 Article 100',
    },
    {
      id: 1,
      badge: 'Dual Device Synchronization',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: Monitor,
      iconColor: 'bg-blue-700 text-blue-200 ring-blue-500/30',
      headline: 'Live Desktop Control Centre Push',
      subtitle: 'Real-Time Supervisory Review & Classification',
      description:
        'Every hazard and near miss submitted on this mobile workforce app triggers an instant notification on the Desktop HSE Control Centre for Nasser Al-Khelaifi and site supervisors.',
      features: [
        'Zero-latency shared local state synchronization',
        'Interactive 5×5 Risk Matrix scoring on desktop',
        'Formal 5-Whys root cause investigation & CAPA',
      ],
      tagline: 'End-to-End Worker to Manager Workflow',
    },
    {
      id: 2,
      badge: 'Statutory Qatar Compliance',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: Scale,
      iconColor: 'bg-amber-700 text-amber-200 ring-amber-500/30',
      headline: 'Universal Stop Work & Heat Alerts',
      subtitle: 'Mandatory Ministerial Decision 17/2021 Ready',
      description:
        'Empower every field worker with Universal Stop Work Authority. Automated alerts notify frontline crews when midday summer work prohibitions take effect or WBGT exceeds 32.1°C.',
      features: [
        '1-tap universal Stop Work Authority triggering',
        'Ministerial Decision 17/2021 summer work ban',
        'Official Al Meezan Qatar legal compliance tags',
      ],
      tagline: 'Ministry of Labour Statutory Protection',
    },
    {
      id: 3,
      badge: 'Frontline Task Execution',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      icon: FileCheck2,
      iconColor: 'bg-teal-700 text-teal-200 ring-teal-500/30',
      headline: 'Permits, Toolboxes & Passports',
      subtitle: 'Assigned Worksite Safety in Your Pocket',
      description:
        'Verify active electronic Permits to Work (PTW) for hot work or excavation, sign off on daily morning toolbox talks, and check your training passport compliance status.',
      features: [
        'Electronic PTW verification and sign-off',
        'Digital toolbox talk attendance records',
        'Live worker safety passport & training tracker',
      ],
      tagline: 'Complete Frontline Operational Readiness',
    },
  ];

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="h-full w-full relative flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-[#07241C] text-white">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#20A887]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#087F5B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Slide Counter & Skip Button */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#20A887] text-white flex items-center justify-center font-bold text-xs shadow">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-bold text-[#DDF5EA] uppercase tracking-wider font-mono">
            Welcome Tour ({currentSlide + 1} of {slides.length})
          </span>
        </div>

        <button
          onClick={onFinish}
          className="text-[11px] font-bold text-[#DDF5EA]/80 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1 active:scale-95"
          title="Skip onboarding tour and proceed directly"
        >
          <span>Skip</span>
          <ChevronRight className="w-3 h-3 text-[#20A887]" />
        </button>
      </div>

      {/* Slide Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto py-2 space-y-3.5">
        {/* Slide Badge */}
        <div className="flex justify-start">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${slide.badgeColor}`}
          >
            {slide.badge}
          </span>
        </div>

        {/* Hero Icon with Ambient Glow */}
        <div className="flex items-center justify-center my-1">
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 ring-4 transition-all duration-300 ${slide.iconColor}`}
          >
            <IconComponent className="w-8 h-8" />
          </div>
        </div>

        {/* Headline & Subtitle */}
        <div className="text-center space-y-1">
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
            {slide.headline}
          </h2>
          <p className="text-[11px] font-semibold text-[#20A887]">
            {slide.subtitle}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-xs text-[#DDF5EA]/90 text-center leading-relaxed px-1">
          {slide.description}
        </p>

        {/* Key Features Bullet List */}
        <div className="bg-black/30 rounded-2xl p-3 border border-white/10 space-y-1.5 shadow-inner">
          {slide.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Qatar Statutory Tagline */}
        <div className="text-center">
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            {slide.tagline}
          </span>
        </div>
      </div>

      {/* Bottom Navigation & Indicator Dots */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex-shrink-0 space-y-2.5">
        {/* Interactive Indicator Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide
                  ? 'w-6 bg-[#20A887] shadow-sm shadow-[#20A887]'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              title={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Action Buttons: Back & Next / Get Started */}
        <div className="flex items-center gap-2">
          {currentSlide > 0 ? (
            <button
              onClick={prevSlide}
              className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95 flex-shrink-0"
              title="Previous slide"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="py-2.5 px-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all active:scale-95 flex-shrink-0"
              title="Skip tour"
            >
              <span>Skip</span>
            </button>
          )}

          <button
            onClick={nextSlide}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#20A887] to-[#087F5B] hover:from-[#1b8c70] hover:to-[#066347] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 group"
          >
            <span>{currentSlide === slides.length - 1 ? 'Get Started & Sign In' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
