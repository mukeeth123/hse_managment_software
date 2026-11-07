import React, { useState } from 'react';
import { useHSE, PortalView } from '../../context/HSEContext';
import {
  Shield,
  Smartphone,
  Monitor,
  Sparkles,
  Scale,
  Menu,
  X,
  ArrowRight,
  PhoneCall,
  Briefcase,
  Layers,
} from 'lucide-react';

export const PortalNavbar: React.FC = () => {
  const { portalView, setPortalView, setIsEnquiryModalOpen } = useHSE();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (view: PortalView, hash?: string) => {
    setPortalView(view);
    setIsMobileMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#073B2F] border-b border-[#092B24] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Product Name */}
          <div
            onClick={() => navigateTo('homepage')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#087F5B] flex items-center justify-center text-white shadow-inner font-bold text-lg group-hover:bg-[#20A887] transition-colors">
              <Shield className="w-6 h-6 text-[#DDF5EA]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white leading-none">
                  QHSE Management Platform
                </span>
                <span className="text-[10px] font-semibold bg-[#20A887]/30 text-[#DDF5EA] px-2 py-0.5 rounded border border-[#20A887]/40 uppercase tracking-wider">
                  Qatar Edition
                </span>
              </div>
              <p className="text-xs text-[#DDF5EA]/80 mt-1 leading-snug font-normal">
                Integrated Health, Safety and Environment Management
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => navigateTo('homepage')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                portalView === 'homepage'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-[#DDF5EA]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('services')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                portalView === 'services'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-[#DDF5EA]/85 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#20A887]" />
              <span>HSE Services</span>
            </button>

            <button
              onClick={() => navigateTo('homepage', 'desktop-control-centre')}
              className="px-3 py-2 rounded-lg text-[#DDF5EA]/85 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <Monitor className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Desktop Control Centre</span>
            </button>

            <button
              onClick={() => navigateTo('homepage', 'mobile-workforce-app')}
              className="px-3 py-2 rounded-lg text-[#DDF5EA]/85 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Mobile Workforce App</span>
            </button>

            <button
              onClick={() => navigateTo('homepage', 'ai-capabilities')}
              className="px-3 py-2 rounded-lg text-[#DDF5EA]/85 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#20A887]" />
              <span>AI Safety Capabilities</span>
            </button>

            <button
              onClick={() => navigateTo('homepage', 'qatar-compliance')}
              className="px-3 py-2 rounded-lg text-[#DDF5EA]/85 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Qatar Compliance</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#DDF5EA] hover:text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Enquire</span>
            </button>

            <button
              onClick={() => navigateTo('platform')}
              className="px-4 py-2 rounded-lg bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Launch Live Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => navigateTo('platform')}
              className="px-3 py-1.5 rounded-lg bg-[#20A887] text-white text-xs font-bold"
            >
              Launch Platform
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#092B24] border-t border-white/10 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => navigateTo('homepage')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('services')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-[#20A887]" />
            <span>HSE Services</span>
          </button>
          <button
            onClick={() => navigateTo('homepage', 'desktop-control-centre')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 flex items-center gap-2"
          >
            <Monitor className="w-4 h-4 text-[#20A887]" />
            <span>Desktop Control Centre</span>
          </button>
          <button
            onClick={() => navigateTo('homepage', 'mobile-workforce-app')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-[#20A887]" />
            <span>Mobile Workforce App</span>
          </button>
          <button
            onClick={() => navigateTo('homepage', 'ai-capabilities')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#20A887]" />
            <span>AI Safety Capabilities</span>
          </button>
          <button
            onClick={() => navigateTo('homepage', 'qatar-compliance')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 flex items-center gap-2"
          >
            <Scale className="w-4 h-4 text-[#20A887]" />
            <span>Qatar Regulatory Compliance</span>
          </button>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsEnquiryModalOpen(true);
              }}
              className="w-full py-2.5 rounded-lg bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#20A887]" />
              <span>Request Consultation / Enquiry</span>
            </button>
            <button
              onClick={() => navigateTo('platform')}
              className="w-full py-2.5 rounded-lg bg-[#20A887] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Open Live Dual-Workspace Platform →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};