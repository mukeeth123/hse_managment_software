import React from 'react';
import { useHSE, PortalView } from '../../context/HSEContext';
import {
  Shield,
  Scale,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  Layers,
} from 'lucide-react';

export const PortalFooter: React.FC = () => {
  const { setPortalView, setIsEnquiryModalOpen } = useHSE();

  const navigateTo = (view: PortalView, hash?: string) => {
    setPortalView(view);
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
    <footer className="bg-[#051C16] border-t border-[#092B24] text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] flex items-center justify-center text-white shadow-inner font-bold text-lg">
                <Shield className="w-6 h-6 text-[#DDF5EA]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white tracking-tight leading-none">
                    QHSE Management Platform
                  </span>
                  <span className="text-[10px] font-semibold bg-[#20A887]/30 text-[#DDF5EA] px-2 py-0.5 rounded border border-[#20A887]/40 uppercase tracking-wider">
                    Qatar Edition
                  </span>
                </div>
                <p className="text-xs text-[#DDF5EA]/70 mt-1 leading-snug">
                  Integrated Health, Safety and Environment Management
                </p>
              </div>
            </div>

            <p className="text-xs text-[#DDF5EA]/80 leading-relaxed max-w-sm">
              An enterprise-grade, integrated QHSE platform engineered for Qatar organisations, infrastructure developments, industrial sites, and contractor workforces. Delivers closed-loop safety governance from field hazard observation to executive CAPA closure.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => navigateTo('platform')}
                className="px-3.5 py-1.5 rounded-lg bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Launch Interactive Platform</span>
              </button>
              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#DDF5EA] text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#20A887]" />
                <span>Enquire</span>
              </button>
            </div>
          </div>

          {/* Column 2: HSE Services */}
          <div>
            <h4 className="text-xs font-bold text-[#20A887] uppercase tracking-wider mb-3">
              HSE Services
            </h4>
            <ul className="space-y-2 text-xs text-[#DDF5EA]/80">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Digital Safety Transformation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Qatar Regulatory Register Advisory</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Heat Stress (MD 17/2021) Systems</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>AI Safety & Predictive Analytics</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Permit to Work (PTW) Governance</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Environmental & Waste Compliance</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Experiences */}
          <div>
            <h4 className="text-xs font-bold text-[#20A887] uppercase tracking-wider mb-3">
              Dual Experience
            </h4>
            <ul className="space-y-2 text-xs text-[#DDF5EA]/80">
              <li>
                <button
                  onClick={() => navigateTo('homepage', 'desktop-control-centre')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Desktop HSE Control Centre</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('homepage', 'mobile-workforce-app')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Mobile Workforce App (Smartphone)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('homepage', 'closed-loop-demo')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Field-to-Executive Workflow Demo</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('homepage', 'ai-capabilities')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>8 AI-Powered Safety Capabilities</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('homepage', 'qatar-compliance')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#20A887]" />
                  <span>Qatar Statutory Compliance Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Qatar Regulatory Sources */}
          <div>
            <h4 className="text-xs font-bold text-[#20A887] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Qatar Legal Authorities</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#DDF5EA]/80">
              <li>
                <a
                  href="https://www.almeezan.qa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#DDF5EA]/90"
                >
                  <span>Al Meezan Legal Portal</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.mol.gov.qa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#DDF5EA]/90"
                >
                  <span>Ministry of Labour (MoL)</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.moph.gov.qa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#DDF5EA]/90"
                >
                  <span>Ministry of Public Health</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://portal.moi.gov.qa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#DDF5EA]/90"
                >
                  <span>Qatar Civil Defence (QCDD)</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.mecc.gov.qa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#DDF5EA]/90"
                >
                  <span>Environment & Climate Change</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers and Baseline */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DDF5EA]/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Client Organisation — Qatar Demonstration Environment</span>
            <span>•</span>
            <span className="font-mono text-[#DDF5EA]/80">DEMONSTRATION DATA — NOT ACTUAL CLIENT RECORDS</span>
          </div>

          <div className="text-center md:text-right text-[11px]">
            Statutory Alignment: Qatar Labour Law 14/2004 • MD 17/2021 Heat Stress • Law 30/2002 Environment • QCDD Standards • ISO 45001 / ISO 14001
          </div>
        </div>
      </div>
    </footer>
  );
};