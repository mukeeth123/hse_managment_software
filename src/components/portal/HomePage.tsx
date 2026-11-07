import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Shield,
  Monitor,
  Smartphone,
  Sparkles,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Users,
  Activity,
  Zap,
  Eye,
  Bot,
  BrainCircuit,
  FileCheck2,
  Cpu,
  Flame,
  Camera,
  Mic,
  Lock,
  Layers,
  ChevronRight,
  ExternalLink,
  PhoneCall,
  BarChart3,
  CheckSquare,
  Thermometer,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setPortalView, setIsEnquiryModalOpen, setIsScenarioModalOpen } = useHSE();

  const [activeExperienceTab, setActiveExperienceTab] = useState<'desktop' | 'mobile'>('desktop');
  const [activeAiCapability, setActiveAiCapability] = useState<number>(0);

  const aiCapabilities = [
    {
      title: 'Generative AI Safety Briefings',
      badge: 'Generative AI',
      icon: Sparkles,
      desc: 'Automatically drafts bilingual (Arabic & English) daily toolbox talks, pre-task safety briefings, and hazard alerts based on real-time site conditions and high-risk work scheduled for the shift.',
      features: ['Automated multilingual generation', 'Tailored to daily site permits (PTW)', 'Safety alert distribution via mobile push'],
      quote: 'Reduces daily briefing preparation time by 80% while ensuring 100% Qatar Labour Law Art. 100 bilingual compliance.',
    },
    {
      title: 'AI Safety Copilot & Risk Scoring',
      badge: 'AI Copilot',
      icon: Bot,
      desc: 'Provides frontline workers and safety officers with interactive conversational guidance. Analyses reported hazards and recommends classification, initial severity rating, and hierarchy of controls.',
      features: ['Real-time 5x5 risk rating assistance', 'Hierarchy of controls guidance', 'Instant incident classification'],
      quote: 'Assists junior inspectors and site engineers with standardized Qatar hazard classification within seconds.',
    },
    {
      title: 'Computer Vision & PPE Analytics',
      badge: 'Computer Vision',
      icon: Eye,
      desc: 'Analyzes mobile inspection photographs and site CCTV streams to automatically detect missing PPE (hard hats, high-vis vests, harnesses), open excavations, and unauthorized exclusion zone entry.',
      features: ['Automated PPE non-compliance detection', 'Trench and void perimeter verification', 'Vehicle-pedestrian proximity alerts'],
      quote: 'Eliminates blind spots across sprawling construction and industrial plots in Qatar.',
    },
    {
      title: 'Predictive Safety & Heat Stress Analytics',
      badge: 'Predictive Analytics',
      icon: Activity,
      desc: 'Integrates weather telemetry, Wet Bulb Globe Temperature (WBGT), and historical near-miss data to forecast incident likelihood and enforce seasonal heat stress work-rest regimens (MD 17/2021).',
      features: ['Hourly WBGT threshold forecasting', 'Leading indicator trend modeling', 'Proactive work-rest regimen alerts'],
      quote: 'Enforces statutory outdoor stoppage thresholds at WBGT 32.1°C with zero guesswork.',
    },
    {
      title: 'RAG Regulatory Intelligence Engine',
      badge: 'RAG & Legal Search',
      icon: Scale,
      desc: 'Retrieval-Augmented Generation across the official Qatar Al Meezan portal, Qatar Labour Law No. 14/2004, MD 17/2021, and Ministry of Environment directives to answer complex legal compliance queries instantly.',
      features: ['Verified Al Meezan article citations', 'Unofficial English translations clearly labelled', 'Legal applicability cross-referencing'],
      quote: 'Instantly surfaces exact statutory requirements, issuing authorities, and required organizational controls.',
    },
    {
      title: 'Autonomous HSE Compliance Agents',
      badge: 'AI Agents',
      icon: BrainCircuit,
      desc: 'Autonomous background agents that continuously monitor open CAPAs, expiring work permits, overdue inspection checklists, and mandatory workforce training certifications, executing proactive escalations.',
      features: ['Automated CAPA escalation to Project Directors', 'Expiring permit warning triggers', 'Continuous gap analysis across 20 modules'],
      quote: 'Maintains organizational accountability and prevents safety tasks from lapsing.',
    },
    {
      title: 'Intelligent Document Processing (IDP)',
      badge: 'Intelligent OCR',
      icon: FileCheck2,
      desc: 'Digitizes and validates physical contractor safety passports, third-party crane inspection certificates, Safety Data Sheets (SDS), and equipment calibration logs using intelligent OCR and schema extraction.',
      features: ['Subcontractor compliance validation', 'Automated document expiry tracking', 'Instant SDS chemical hazard parsing'],
      quote: 'Cuts contractor onboarding paperwork from days to under 5 minutes.',
    },
    {
      title: 'Qatar Official Gazette Delta Tracker',
      badge: 'Regulatory Intelligence',
      icon: Cpu,
      desc: 'Monitors the Qatar Official Gazette and ministerial announcements to detect new decrees or amendments, notifying corporate legal and safety teams of regulatory changes affecting operations.',
      features: ['Official Gazette amendment logging', 'Ministry of Labour circular tracking', 'Automatic compliance register delta audits'],
      quote: 'Ensures the enterprise legal register is continuously verified and audit-ready.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#172B25] font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#073B2F] via-[#092B24] to-[#073B2F] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#20A887_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Badges */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#DDF5EA]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">QATAR STATUTORY EDITION</span>
              <span className="text-white/40">•</span>
              <span>MD 17/2021 Heat Stress Regimen</span>
              <span className="text-white/40">•</span>
              <span>Al Meezan Verified Register</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Next-Generation <span className="text-[#20A887]">QHSE Management</span> for Qatar Enterprises
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#DDF5EA]/90 max-w-3xl mx-auto leading-relaxed font-normal">
              Seamlessly connect frontline workforce hazard reporting on mobile with executive compliance governance on desktop. Built specifically for Qatar infrastructure developments, energy projects, industrial facilities, and large-scale contractor workforces.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setPortalView('platform')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#20A887] hover:bg-[#087F5B] text-white text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 hover:shadow-2xl hover:scale-105 active:scale-95 group"
              >
                <Layers className="w-4 h-4" />
                <span>Launch Interactive HSE Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setPortalView('services')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore HSE Services</span>
                <ChevronRight className="w-4 h-4 text-[#20A887]" />
              </button>

              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-black/30 hover:bg-black/50 text-[#DDF5EA] text-sm font-medium border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#20A887]" />
                <span>Request Consultation</span>
              </button>
            </div>

            {/* Live Operational Metrics Ribbon */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-black/25 backdrop-blur-sm border border-white/10 text-left">
                <div className="text-2xl lg:text-3xl font-extrabold text-[#20A887]">40 Roles</div>
                <div className="text-xs text-[#DDF5EA]/80 mt-1">Pre-Seeded Enterprise RBAC Personas</div>
              </div>
              <div className="p-4 rounded-xl bg-black/25 backdrop-blur-sm border border-white/10 text-left">
                <div className="text-2xl lg:text-3xl font-extrabold text-[#20A887]">20 Modules</div>
                <div className="text-xs text-[#DDF5EA]/80 mt-1">Fully Functional Operations & Governance</div>
              </div>
              <div className="p-4 rounded-xl bg-black/25 backdrop-blur-sm border border-white/10 text-left">
                <div className="text-2xl lg:text-3xl font-extrabold text-[#20A887]">100% Qatar</div>
                <div className="text-xs text-[#DDF5EA]/80 mt-1">Labour Law 14/2004 & MD 17/2021 Alignment</div>
              </div>
              <div className="p-4 rounded-xl bg-black/25 backdrop-blur-sm border border-white/10 text-left">
                <div className="text-2xl lg:text-3xl font-extrabold text-[#20A887]">Zero Backend</div>
                <div className="text-xs text-[#DDF5EA]/80 mt-1">Strict Frontend-Only In-Browser State</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM HSE SERVICES SECTION */}
      <section id="hse-services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#087F5B]/10 border border-[#087F5B]/20 text-xs font-bold text-[#087F5B] uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B25] tracking-tight">
            Enterprise HSE Services & Regulatory Advisory
          </h2>
          <p className="text-sm sm:text-base text-[#65756D] mt-3 leading-relaxed">
            From digital safety transformation to statutory Qatar compliance audits, we deliver integrated health, safety, environmental, and risk engineering services for complex operations.
          </p>
        </div>

        {/* 6 Key Service Offering Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3EAE6] shadow-sm hover:shadow-md transition-all hover:border-[#087F5B]/40 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center mb-4 group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                <Monitor className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Service Pillar 01</span>
              <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">
                HSE Digital Transformation & Platform Implementation
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Full-scale deployment of custom digital HSE Control Centres, mobile workforce applications, and automated safety workflows designed to replace fragmented spreadsheets and manual paper logs.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Custom enterprise dashboard configuration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Dual desktop & mobile synchronization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>40 pre-configured enterprise RBAC roles</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setPortalView('services')}
              className="text-xs font-bold text-[#087F5B] hover:text-[#073B2F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
            >
              <span>Learn about digital implementation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3EAE6] shadow-sm hover:shadow-md transition-all hover:border-[#087F5B]/40 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center mb-4 group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Service Pillar 02</span>
              <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">
                Qatar Statutory Compliance & Legal Register Advisory
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Rigorous regulatory auditing against official Qatar legislation sourced directly from Al Meezan, Ministry of Labour (MoL), Ministry of Public Health, and Qatar Civil Defence.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Qatar Labour Law No. 14/2004 compliance mapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Verified articles & evidence cross-referencing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Official Arabic legal text & verified references</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setPortalView('services')}
              className="text-xs font-bold text-[#087F5B] hover:text-[#073B2F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
            >
              <span>Explore regulatory register advisory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3EAE6] shadow-sm hover:shadow-md transition-all hover:border-[#087F5B]/40 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center mb-4 group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                <Thermometer className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Service Pillar 03</span>
              <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">
                Ministerial Decision 17/2021 Heat Stress Management
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Implementation of automated Wet Bulb Globe Temperature (WBGT) monitoring, outdoor work stoppage schedules (10:00–15:30, 1 June–15 September), and worker hydration regimens.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Automated summer working-hour enforcement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Site WBGT index telemetry and work-rest ratios</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Heat illness emergency response & worker welfare</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setPortalView('services')}
              className="text-xs font-bold text-[#087F5B] hover:text-[#073B2F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
            >
              <span>View heat stress management</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3EAE6] shadow-sm hover:shadow-md transition-all hover:border-[#087F5B]/40 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center mb-4 group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Service Pillar 04</span>
              <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">
                Mobile Workforce Safety & Stop Work Authority (SWA)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Empowering every field employee and contractor with instant hazard observation tools, voice dictation, camera photo evidence, and legally backed Stop Work Authority.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Speech-to-text voice reporting in the field</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Device photo capture with timestamp watermarks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Immediate Stop Work Authority escalation</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setPortalView('services')}
              className="text-xs font-bold text-[#087F5B] hover:text-[#073B2F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
            >
              <span>Explore mobile safety enablement</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3EAE6] shadow-sm hover:shadow-md transition-all hover:border-[#087F5B]/40 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center mb-4 group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Service Pillar 05</span>
              <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">
                AI Safety Intelligence & Predictive Incident Prevention
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Leveraging machine learning, computer vision, and generative safety assistants to transform raw safety records into proactive leading indicators before incidents occur.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>AI Copilot for risk scoring and control drafting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Computer vision PPE & exclusion zone analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Leading indicator trend & recurrence modeling</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setPortalView('services')}
              className="text-xs font-bold text-[#087F5B] hover:text-[#073B2F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
            >
              <span>Learn about AI safety intelligence</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3EAE6] shadow-sm hover:shadow-md transition-all hover:border-[#087F5B]/40 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center mb-4 group-hover:bg-[#087F5B] group-hover:text-white transition-colors">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Service Pillar 06</span>
              <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">
                Permit to Work (PTW) & High-Risk Activity Governance
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                End-to-end digital governance for Hot Work, Confined Space Entry, Work at Height, Lifting Operations, and Excavations, ensuring verified isolation and atmospheric gas testing.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Multi-tier approval (Applicant, Issuer, Approver)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>Atmospheric gas monitoring & isolation certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] flex-shrink-0" />
                  <span>SIMOPs clash detection across overlapping zones</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setPortalView('services')}
              className="text-xs font-bold text-[#087F5B] hover:text-[#073B2F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
            >
              <span>Explore high-risk PTW governance</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Link to Full Dedicated Services Page */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setPortalView('services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#087F5B] hover:bg-[#073B2F] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
          >
            <span>View All 8 Core HSE Services & Delivery Methodology</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. TWO CONNECTED EXPERIENCES SHOWCASE */}
      <section id="desktop-control-centre" className="py-20 bg-[#073B2F] text-white px-4 sm:px-6 lg:px-8 border-y border-[#092B24]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#DDF5EA] uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Unified Safety Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Two Connected Experiences. One Shared Local State.
            </h2>
            <p className="text-xs sm:text-sm text-[#DDF5EA]/85 mt-2 leading-relaxed">
              Experience the power of dual-workspace synchronization. When a field worker submits a hazard observation on the smartphone app, the desktop control centre receives the alert and statutory compliance tags instantly.
            </p>

            {/* Experience Switcher Tabs */}
            <div className="inline-flex p-1.5 bg-black/30 rounded-xl border border-white/10 mt-6 gap-2">
              <button
                onClick={() => setActiveExperienceTab('desktop')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeExperienceTab === 'desktop'
                    ? 'bg-[#20A887] text-white shadow-md'
                    : 'text-[#DDF5EA]/80 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Experience 1: Desktop HSE Control Centre</span>
              </button>
              <button
                onClick={() => setActiveExperienceTab('mobile')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeExperienceTab === 'mobile'
                    ? 'bg-[#20A887] text-white shadow-md'
                    : 'text-[#DDF5EA]/80 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Experience 2: Mobile Workforce App</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Desktop HSE Control Centre Showcase */}
          {activeExperienceTab === 'desktop' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#092B24] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl animate-in fade-in">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#20A887]/20 border border-[#20A887]/30 text-xs font-bold text-[#DDF5EA]">
                  <Monitor className="w-3.5 h-3.5 text-[#20A887]" />
                  <span>Executive Operations Hub</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Desktop HSE Control Centre
                </h3>
                <p className="text-xs text-[#DDF5EA]/80 leading-relaxed">
                  Engineered for HSE Directors, Senior Safety Managers, and Compliance Auditors. Consolidates multi-site telemetry, incident investigations, risk registers, and statutory Qatar legal obligations into an intuitive desktop command center.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/25 border border-white/5 flex items-start gap-3">
                    <Activity className="w-4 h-4 text-[#20A887] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Executive KPIs & Heat Index</h4>
                      <p className="text-[11px] text-[#DDF5EA]/70 mt-0.5">
                        Live lost time injury frequency rate (LTIFR), TRIFR, open CAPAs, and real-time WBGT heat stress regimen monitoring.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/25 border border-white/5 flex items-start gap-3">
                    <Scale className="w-4 h-4 text-[#20A887] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Qatar Legal Compliance Centre</h4>
                      <p className="text-[11px] text-[#DDF5EA]/70 mt-0.5">
                        Verified statutory registers cross-referencing Qatar Labour Law 14/2004, MD 17/2021, and Law 30/2002 via official Al Meezan portals.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/25 border border-white/5 flex items-start gap-3">
                    <CheckSquare className="w-4 h-4 text-[#20A887] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Investigation & CAPA Lifecycle</h4>
                      <p className="text-[11px] text-[#DDF5EA]/70 mt-0.5">
                        Rigorous 5-Whys, Fishbone root cause analysis, photographic evidence verification, and immutable audit trails.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setPortalView('platform')}
                    className="px-5 py-2.5 rounded-xl bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Open Live Desktop Control Centre</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Desktop Interface Visual Mockup Card */}
              <div className="lg:col-span-7 bg-[#051C16] rounded-2xl p-4 border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="text-[11px] font-mono text-[#DDF5EA]/60 ml-2">QHSE Control Centre — Qatar Site 01</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    LIVE SYSTEM STATE
                  </span>
                </div>

                <div className="pt-4 space-y-4">
                  {/* Metric Tiles */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-[10px] text-gray-400">Total Hazards</span>
                      <div className="text-lg font-bold text-white">25 Active</div>
                    </div>
                    <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-[10px] text-gray-400">Heat Regimen (MD 17/2021)</span>
                      <div className="text-lg font-bold text-amber-400">WBGT 30.2°C</div>
                    </div>
                    <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-[10px] text-gray-400">Qatar Compliance Rate</span>
                      <div className="text-lg font-bold text-emerald-400">94.8%</div>
                    </div>
                  </div>

                  {/* Simulated Table Snippet */}
                  <div className="bg-black/30 rounded-lg border border-white/5 overflow-hidden text-[11px]">
                    <div className="p-2 bg-black/60 font-semibold text-gray-300 flex items-center justify-between border-b border-white/10">
                      <span>Recent Priority Observations</span>
                      <span className="text-[10px] text-[#20A887]">Synced with Mobile</span>
                    </div>
                    <div className="divide-y divide-white/5 p-2 space-y-2">
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span className="text-amber-400 font-mono text-[10px]">HAZ-2026-0042</span>
                            <span>Uncovered Floor Opening Without Edge Protection</span>
                          </div>
                          <span className="text-[10px] text-gray-400">Building Zone 01 • Ahmed Hassan (Worker) • MD 17/2021 Ref</span>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] rounded bg-red-950 text-red-300 font-bold border border-red-800">
                          High Severity
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span className="text-emerald-400 font-mono text-[10px]">HAZ-2026-0038</span>
                            <span>Missing Toe-board on Mobile Scaffold Tower</span>
                          </div>
                          <span className="text-[10px] text-gray-400">Work Area A • Rajesh Kumar (Contractor)</span>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                          Action Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#20A887]/10 rounded-lg border border-[#20A887]/20 flex items-center justify-between text-xs text-[#DDF5EA]">
                    <span>Full suite of 20 modules available in live application</span>
                    <button
                      onClick={() => setPortalView('platform')}
                      className="text-xs font-bold text-white hover:underline flex items-center gap-1"
                    >
                      <span>Launch Desktop →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Mobile Workforce App Showcase */}
          {activeExperienceTab === 'mobile' && (
            <div id="mobile-workforce-app" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#092B24] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl animate-in fade-in">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#20A887]/20 border border-[#20A887]/30 text-xs font-bold text-[#DDF5EA]">
                  <Smartphone className="w-3.5 h-3.5 text-[#20A887]" />
                  <span>Frontline Field Enablement</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Mobile HSE Workforce Application
                </h3>
                <p className="text-xs text-[#DDF5EA]/80 leading-relaxed">
                  Engineered specifically for field workers, scaffolders, crane operators, and site supervisors. Renders inside an authentic smartphone frame with native mobile gestures, instant voice dictation, camera photo capture, and Stop Work Authority.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/25 border border-white/5 flex items-start gap-3">
                    <Mic className="w-4 h-4 text-[#20A887] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Voice-Based Hazard & Incident Reporting</h4>
                      <p className="text-[11px] text-[#DDF5EA]/70 mt-0.5">
                        Interactive Web Speech API speech-to-text with animated oscillating audio soundwave and 1-tap voice scenario templates.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/25 border border-white/5 flex items-start gap-3">
                    <Camera className="w-4 h-4 text-[#20A887] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Device Photo Upload & Watermarked Evidence</h4>
                      <p className="text-[11px] text-[#DDF5EA]/70 mt-0.5">
                        Direct local device file upload (`FileReader` base64 data) or Qatar worksite photo presets with interactive zoom inspection modal.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/25 border border-white/5 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-[#20A887] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">1-Tap Stop Work Authority (SWA)</h4>
                      <p className="text-[11px] text-[#DDF5EA]/70 mt-0.5">
                        Legally mandated authority allowing any field worker to halt unsafe tasks immediately, triggering priority alerts to HSE management.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setPortalView('platform')}
                    className="px-5 py-2.5 rounded-xl bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Test Mobile Experience Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Realistic Smartphone Frame Mockup Preview */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-[300px] h-[520px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col overflow-hidden">
                  {/* Dynamic Island Notch */}
                  <div className="h-6 w-24 bg-black rounded-full mx-auto mb-2 flex items-center justify-between px-2 text-[9px] text-white">
                    <span className="text-[9px] text-emerald-400 font-mono">09:41</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>

                  {/* Simulated Mobile App Screen */}
                  <div className="flex-1 bg-[#F4F7F5] rounded-[32px] overflow-hidden flex flex-col text-gray-800 text-xs">
                    {/* In-app Header */}
                    <div className="bg-[#073B2F] p-3 text-white">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px]">QHSE Mobile</span>
                        <span className="text-[9px] bg-[#20A887] px-1.5 py-0.2 rounded font-mono">MD 17/2021</span>
                      </div>
                      <div className="mt-2 p-1.5 bg-black/30 rounded border border-white/10 text-[10px]">
                        <span className="text-amber-400 font-bold">WBGT 30.2°C:</span> 45m work / 15m rest
                      </div>
                    </div>

                    {/* Quick Buttons */}
                    <div className="p-3 grid grid-cols-3 gap-1.5 text-center">
                      <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="text-[9px] font-bold">Hazard</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                        <Flame className="w-4 h-4 text-red-500 mb-1" />
                        <span className="text-[9px] font-bold">Incident</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                        <Shield className="w-4 h-4 text-[#087F5B] mb-1" />
                        <span className="text-[9px] font-bold">Passport</span>
                      </div>
                    </div>

                    {/* Case Preview */}
                    <div className="px-3 pb-2 flex-1">
                      <div className="p-2 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-[#087F5B]">HAZ-2026-0042</span>
                          <span className="text-red-600 font-bold">Submitted</span>
                        </div>
                        <p className="text-[10px] text-gray-700 font-semibold line-clamp-1">
                          Uncovered Floor Opening Without Edge Protection
                        </p>
                        <div className="flex items-center gap-1 text-[9px] text-gray-500">
                          <Camera className="w-3 h-3 text-emerald-600" />
                          <span>Photo Attached • Voice Logged</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="bg-white border-t border-gray-200 p-2 flex items-center justify-around text-[9px] text-gray-500">
                      <span className="font-bold text-[#087F5B]">Home</span>
                      <span>Reports</span>
                      <span>Tasks</span>
                      <span>Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. VISUAL CLOSED-LOOP WORKFLOW DEMONSTRATION */}
      <section id="closed-loop-demo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#087F5B]/10 border border-[#087F5B]/20 text-xs font-bold text-[#087F5B] uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Workflow Demonstration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B25] tracking-tight">
            From Field Observation to Executive Resolution
          </h2>
          <p className="text-sm sm:text-base text-[#65756D] mt-3 leading-relaxed">
            Follow the live lifecycle of a real Qatar worksite safety hazard as it flows seamlessly across the mobile workforce application and the desktop control centre.
          </p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E3EAE6] shadow-sm relative space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F5B] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Mobile App</span>
            <h4 className="text-xs font-bold text-gray-900">Hazard Identified on Site</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Worker <span className="font-semibold text-gray-900">Ahmed Hassan</span> spots an uncovered floor opening at Building Zone 01 on Qatar Site 01.
            </p>
            <div className="p-2 bg-emerald-50 rounded-lg text-[10px] text-[#073B2F] border border-emerald-100 font-mono">
              Work at Height • Fall Hazard
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E3EAE6] shadow-sm relative space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F5B] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Voice & Photo</span>
            <h4 className="text-xs font-bold text-gray-900">Instant Mobile Logging</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Ahmed dictates the hazard using Web Speech AI and attaches a live worksite photo with a timestamp. Generates <span className="font-semibold text-[#087F5B]">HAZ-2026-0042</span>.
            </p>
            <div className="p-2 bg-emerald-50 rounded-lg text-[10px] text-[#073B2F] border border-emerald-100 font-mono">
              Speech-to-Text • Base64 Evidence
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E3EAE6] shadow-sm relative space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F5B] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Shared State</span>
            <h4 className="text-xs font-bold text-gray-900">Desktop Push Alert</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Desktop Control Centre receives priority notification instantly. Qatar Labour Law Art. 100 compliance requirements are automatically cross-referenced.
            </p>
            <div className="p-2 bg-emerald-50 rounded-lg text-[10px] text-[#073B2F] border border-emerald-100 font-mono">
              Labour Law 14/2004 Tagged
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E3EAE6] shadow-sm relative space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F5B] flex items-center justify-center font-bold text-xs">
              04
            </div>
            <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Desktop Review</span>
            <h4 className="text-xs font-bold text-gray-900">HSE Manager CAPA Issue</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Senior HSE Manager <span className="font-semibold text-gray-900">Nasser Al-Khelaifi</span> inspects the photo, assigns immediate CAPA to Site Supervisor <span className="font-semibold text-gray-900">Fahad Al-Kuwari</span>.
            </p>
            <div className="p-2 bg-emerald-50 rounded-lg text-[10px] text-[#073B2F] border border-emerald-100 font-mono">
              CAPA Assigned • 4h Deadline
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E3EAE6] shadow-sm relative space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F5B] flex items-center justify-center font-bold text-xs">
              05
            </div>
            <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">Verification</span>
            <h4 className="text-xs font-bold text-gray-900">Rectification & Audit Log</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Supervisor installs reinforced guardrails, uploads verification photo, and incident closes with an immutable audit entry.
            </p>
            <div className="p-2 bg-emerald-50 rounded-lg text-[10px] text-[#073B2F] border border-emerald-100 font-mono">
              Status: Closed & Compliant
            </div>
          </div>
        </div>

        {/* Interactive Scenario Launch Banner */}
        <div className="mt-10 p-6 bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#073B2F] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#20A887]" />
              <span>Experience This Exact Demonstration Case Live</span>
            </h4>
            <p className="text-xs text-[#DDF5EA]/90">
              Launch the interactive scenario stepper to step through Ahmed Hassan's report and Nasser Al-Khelaifi's review in the dual workspace.
            </p>
          </div>

          <button
            onClick={() => {
              setPortalView('platform');
              setIsScenarioModalOpen(true);
            }}
            className="px-6 py-3 rounded-xl bg-[#20A887] hover:bg-white hover:text-[#073B2F] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <span>Run Scenario HAZ-2026-0042</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. AI-POWERED HSE CAPABILITIES SECTION */}
      <section id="ai-capabilities" className="py-20 bg-[#F4F7F5] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E3EAE6]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#087F5B]/10 border border-[#087F5B]/20 text-xs font-bold text-[#087F5B] uppercase tracking-wider mb-3">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Intelligent Safety Technology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B25] tracking-tight">
            AI-Powered HSE Capabilities
          </h2>
          <p className="text-sm sm:text-base text-[#65756D] mt-3 leading-relaxed">
            Harnessing Generative AI, Computer Vision, Predictive Analytics, and Retrieval-Augmented Generation (RAG) to protect workforce lives and ensure statutory Qatar compliance.
          </p>
        </div>

        {/* Interactive AI Capabilities Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Capability Selector List */}
          <div className="lg:col-span-5 space-y-2">
            {aiCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              const isSelected = activeAiCapability === idx;
              return (
                <button
                  key={cap.title}
                  onClick={() => setActiveAiCapability(idx)}
                  className={`w-full p-3.5 rounded-xl text-left transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white border-[#087F5B] shadow-md ring-1 ring-[#087F5B]/30'
                      : 'bg-white/60 hover:bg-white border-transparent hover:border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-[#087F5B] text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-gray-900 truncate">{cap.title}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{cap.badge}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 ${
                      isSelected ? 'text-[#087F5B]' : 'text-gray-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Capability Spotlight Display */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E3EAE6] shadow-lg space-y-6">
            {(() => {
              const currentCap = aiCapabilities[activeAiCapability];
              const Icon = currentCap.icon;
              return (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">
                          {currentCap.badge}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">{currentCap.title}</h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-[#073B2F] rounded-full text-[10px] font-bold">
                      ACTIVE AI CAPABILITY
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {currentCap.desc}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Key Capabilities & Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentCap.features.map((feat) => (
                        <div
                          key={feat}
                          className="p-2.5 bg-[#F4F7F5] rounded-lg border border-[#E3EAE6] text-xs text-gray-800 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#087F5B] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Quote */}
                  <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-xs text-[#073B2F] italic">
                    "{currentCap.quote}"
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 font-mono">
                      Integrated into QHSE Platform • Qatar Edition
                    </span>
                    <button
                      onClick={() => setPortalView('platform')}
                      className="px-4 py-2 bg-[#087F5B] hover:bg-[#073B2F] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow"
                    >
                      <span>Try AI Search in Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 6. QATAR STATUTORY REGULATORY FRAMEWORK */}
      <section id="qatar-compliance" className="py-20 bg-[#073B2F] text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#DDF5EA] uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Statutory Compliance Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Verified Against Official Qatar Legislation
            </h2>
            <p className="text-xs sm:text-sm text-[#DDF5EA]/85 mt-3 leading-relaxed">
              Every compliance rule, article reference, and control requirement in our register is sourced directly from authoritative Qatar legal databases.
            </p>
          </div>

          {/* Statutory Authority Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-center">
              <Scale className="w-5 h-5 text-[#20A887] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Al Meezan</div>
              <div className="text-[10px] text-[#DDF5EA]/70 mt-0.5">Legal Portal of Qatar</div>
            </div>
            <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-center">
              <Users className="w-5 h-5 text-[#20A887] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Ministry of Labour</div>
              <div className="text-[10px] text-[#DDF5EA]/70 mt-0.5">Law No. 14 of 2004</div>
            </div>
            <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-center">
              <Thermometer className="w-5 h-5 text-[#20A887] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">MD 17/2021</div>
              <div className="text-[10px] text-[#DDF5EA]/70 mt-0.5">Heat Stress Precautions</div>
            </div>
            <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-center">
              <Flame className="w-5 h-5 text-[#20A887] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Civil Defence</div>
              <div className="text-[10px] text-[#DDF5EA]/70 mt-0.5">QCDD Fire & Life Safety</div>
            </div>
            <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-center">
              <Shield className="w-5 h-5 text-[#20A887] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">MECC</div>
              <div className="text-[10px] text-[#DDF5EA]/70 mt-0.5">Environment Law 30/2002</div>
            </div>
            <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-center">
              <Activity className="w-5 h-5 text-[#20A887] mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">MoPH</div>
              <div className="text-[10px] text-[#DDF5EA]/70 mt-0.5">Occupational Health</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setPortalView('platform')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Explore Qatar Legal Compliance Register in Live Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. ENTERPRISE CONSULTATION & ENQUIRY CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#073B2F] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#DDF5EA]">
              <span>Enterprise HSE Engagement</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Safety Governance?
            </h2>
            <p className="text-xs sm:text-sm text-[#DDF5EA]/90 leading-relaxed">
              Schedule an in-depth consultation with our Qatar HSE specialists or request a dedicated dual-workspace platform demonstration for your organisation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#073B2F] hover:bg-[#DDF5EA] text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#087F5B]" />
              <span>Schedule Enterprise Consultation</span>
            </button>
            <button
              onClick={() => setPortalView('platform')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 border border-white/20"
            >
              <Layers className="w-4 h-4" />
              <span>Launch Live Platform Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};