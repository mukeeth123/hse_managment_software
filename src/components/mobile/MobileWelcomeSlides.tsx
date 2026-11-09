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
      description:
        'Frontline workers dictate safety observations hands-free using Voice AI, with instant live transcription and GPS-stamped photo evidence.',
      tagline: 'Qatar Labour Law 14/2004 Art. 100',
    },
    {
      id: 1,
      badge: 'Real-Time Sync',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: Monitor,
      iconColor: 'bg-blue-700 text-blue-200 ring-blue-500/30',
      headline: 'Live Desktop Control Push',
      description:
        'Observations submitted on mobile synchronize instantly to the central Desktop Control Centre for 5×5 risk rating and supervisory action.',
      tagline: 'Instant Field-to-Desk Handshake',
    },
    {
      id: 2,
      badge: 'Statutory Qatar Compliance',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: Scale,
      iconColor: 'bg-amber-700 text-amber-200 ring-amber-500/30',
      headline: 'Universal Stop Work & Heat Alerts',
      description:
        'Empowers any worker to halt unsafe tasks immediately, with automated alerts during midday summer work ban hours (WBGT > 32.1°C).',
      tagline: 'Ministerial Decision No. 17 of 2021',
    },
    {
      id: 3,
      badge: 'Frontline Safety',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      icon: FileCheck2,
      iconColor: 'bg-teal-700 text-teal-200 ring-teal-500/30',
      headline: 'Permits, Toolboxes & Passports',
      description:
        'Verify electronic Permits to Work (PTW), sign off morning toolbox talks, and check training passport compliance directly on-site.',
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
    <div className="h-full w-full relative flex flex-col justify-between p-3.5 sm:p-4 select-none overflow-hidden bg-[#07241C] text-white">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#20A887]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#087F5B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Slide Counter & Skip Button */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#20A887] text-white flex items-center justify-center font-bold text-xs shadow">
            <Shield className="w-3 h-3" />
          </div>
          <span className="text-[10px] font-bold text-[#DDF5EA] uppercase tracking-wider font-mono">
            Welcome Tour ({currentSlide + 1} of {slides.length})
          </span>
        </div>

        <button
          onClick={onFinish}
          className="text-[10px] font-bold text-[#DDF5EA]/90 hover:text-white px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1 active:scale-95 border border-white/10"
          title="Skip onboarding tour and proceed directly"
        >
          <span>Skip Tour</span>
          <ChevronRight className="w-3 h-3 text-[#20A887]" />
        </button>
      </div>

      {/* Slide Middle Content Area - Clean, Spacious & Focused */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-4 space-y-4 text-center my-auto">
        {/* Category Badge */}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${slide.badgeColor}`}
        >
          {slide.badge}
        </span>

        {/* Hero Icon with Ambient Glow */}
        <div className="my-1">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 ring-4 transition-all duration-300 ${slide.iconColor}`}
          >
            <IconComponent className="w-10 h-10" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug px-2">
          {slide.headline}
        </h2>

        {/* Narrative Description - Crisp & Easy to Read */}
        <p className="text-xs text-[#DDF5EA]/90 leading-relaxed max-w-[280px] px-1 font-normal">
          {slide.description}
        </p>

        {/* Qatar Statutory Tagline Pill */}
        <div className="pt-1">
          <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/30 shadow-xs">
            {slide.tagline}
          </span>
        </div>
      </div>

      {/* Permanently Pinned Bottom Navigation & Next Button */}
      <div className="relative z-30 pt-2 border-t border-white/15 flex-shrink-0 space-y-2 bg-[#07241C]/95">
        {/* Interactive Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5">
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

        {/* Action Buttons: Back & NEXT BUTTON */}
        <div className="flex items-center gap-2">
          {currentSlide > 0 ? (
            <button
              onClick={prevSlide}
              className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95 flex-shrink-0 border border-white/10"
              title="Previous slide"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="py-2 px-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all active:scale-95 flex-shrink-0 border border-white/10"
              title="Skip tour"
            >
              <span>Skip</span>
            </button>
          )}

          {/* High-Visibility Next / Get Started Action Button */}
          <button
            onClick={nextSlide}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#20A887] via-[#087F5B] to-[#20A887] hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 group border border-emerald-400/40"
          >
            <span>{currentSlide === slides.length - 1 ? 'Get Started & Enter App' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-1 transition-transform animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};
