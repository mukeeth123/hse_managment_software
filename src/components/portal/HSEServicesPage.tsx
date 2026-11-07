import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Shield,
  Monitor,
  Smartphone,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Users,
  Activity,
  Zap,
  Bot,
  BrainCircuit,
  FileCheck2,
  Flame,
  Leaf,
  Layers,
  PhoneCall,
  Calendar,
  Compass,
  CheckSquare,
  Thermometer,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const HSEServicesPage: React.FC = () => {
  const { setPortalView, setIsEnquiryModalOpen } = useHSE();
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  const services = [
    {
      id: 'digital-transformation',
      title: 'HSE Digital Transformation & Platform Implementation',
      subtitle: 'Modernizing enterprise safety workflows from paper to synchronized digital workspaces.',
      icon: Monitor,
      scope: 'End-to-end design, configuration, and rollout of cloudless in-browser QHSE management systems tailored for Qatar infrastructure, industrial, and contracting firms.',
      deliverables: [
        'Custom Desktop HSE Control Centre deployment',
        'Mobile workforce app rollout for field crews',
        'Shared local state synchronization across devices',
        '40 pre-configured enterprise role-based access control (RBAC) tiers',
        'Migration from legacy spreadsheets into structured local stores',
      ],
      qatarRef: 'Aligned with Qatar National Vision 2030 digital modernization & workforce safety objectives.',
    },
    {
      id: 'regulatory-compliance',
      title: 'Qatar Statutory Compliance & Legal Register Advisory',
      subtitle: 'Authoritative alignment with Qatar Labour Law, Al Meezan portal, and ministerial decrees.',
      icon: Scale,
      scope: 'Comprehensive legal register establishment and compliance auditing to ensure every project site complies with verified Qatar legislation, decrees, and circulars.',
      deliverables: [
        'Law No. 14 of 2004 (Qatar Labour Law) Articles 100–102 verification',
        'Verified citations from official Al Meezan Legal Portal and Official Gazette',
        'Applicability matrices linking legal provisions to required operational controls',
        'Statutory documentary evidence linking (logs, PPE receipts, training certificates)',
        'Clear distinction between Verified Law, Official Guidance, and Org Controls',
      ],
      qatarRef: 'Direct cross-referencing with Qatar Al Meezan portal & Ministry of Labour (MoL) directives.',
    },
    {
      id: 'heat-stress',
      title: 'Ministerial Decision 17/2021 Heat Stress Management Systems',
      subtitle: 'Statutory compliance for outdoor and unventilated workplaces during Qatar summer months.',
      icon: Thermometer,
      scope: 'Implementation of operational regimens, Wet Bulb Globe Temperature (WBGT) telemetry, and work-rest ratios to eliminate heat-related illnesses and ensure statutory compliance.',
      deliverables: [
        'Enforcement of mandatory work stoppage (10:00–15:30, 1 June–15 September)',
        'Hourly site WBGT monitoring and work-rest schedule calculation',
        'Shaded rest area inspection protocols and cold drinking water provision logs',
        'Worker heat stress awareness briefings and emergency treatment kits',
        'Statutory compliance evidence packages for Ministry of Labour site inspectors',
      ],
      qatarRef: 'Statutory enforcement of Qatar Ministerial Decision No. 17 of 2021.',
    },
    {
      id: 'mobile-workforce',
      title: 'Mobile Workforce Safety Enablement & Stop Work Authority',
      subtitle: 'Equipping frontline workers and subcontractors with instant voice and photo reporting.',
      icon: Smartphone,
      scope: 'Empowering the workforce to participate directly in safety culture through native mobile interfaces, speech-to-text hazard logging, and legally protected Stop Work Authority.',
      deliverables: [
        'Bilingual speech recognition hazard logging in field environments',
        'Device photo evidence capture with timestamp and geolocation watermarks',
        '1-tap Stop Work Authority (SWA) activation with executive escalation',
        'Assigned corrective action notifications and personal safety passport',
        'Subcontractor safety observation onboarding without complex accounts',
      ],
      qatarRef: 'Qatar Labour Law Art. 100 requirement for accessible worker safety instructions.',
    },
    {
      id: 'ai-intelligence',
      title: 'AI Safety Intelligence, Computer Vision & Predictive Analytics',
      subtitle: 'Transforming safety data from reactive lagging reports into predictive leading indicators.',
      icon: Sparkles,
      scope: 'Deploying Generative AI assistants, computer vision PPE auditing, and predictive risk scoring to detect hazard trends before incidents occur.',
      deliverables: [
        'AI Safety Copilot for 5x5 hazard severity scoring and control drafting',
        'Computer vision analysis for missing hard hats, vests, and void edges',
        'Leading indicator trend modeling across near-miss and inspection datasets',
        'Automated bilingual (Arabic/English) daily toolbox talk generation',
        'RAG legal search querying Qatar legislation instantly',
      ],
      qatarRef: 'Pioneering intelligent safety technology adhering to Qatar enterprise data privacy standards.',
    },
    {
      id: 'environmental-management',
      title: 'Environmental Protection, Waste & Carbon Governance',
      subtitle: 'Ensuring environmental compliance under Qatar Law No. 30 of 2002.',
      icon: Leaf,
      scope: 'Comprehensive environmental management systems covering hazardous waste handling, spill response, air/water monitoring, and Ministry of Environment permitting.',
      deliverables: [
        'Environmental Aspect & Impact Registers with risk matrices',
        'Hazardous chemical waste tracking and licensed contractor disposal logs',
        'Spill prevention, containment kits, and emergency response procedures',
        'Monthly fuel, water, and electricity consumption greenhouse gas auditing',
        'Ministry of Environment and Climate Change (MECC) permit compliance tracking',
      ],
      qatarRef: 'Qatar Law No. 30 of 2002 on Environmental Protection & Executive Regulations.',
    },
    {
      id: 'incident-investigation',
      title: 'Incident Investigation & Independent Root Cause Analysis',
      subtitle: 'Rigorous 5-Whys, Fishbone diagrams, and statutory regulatory notifications.',
      icon: AlertTriangle,
      scope: 'Structured investigation methodologies for Lost Time Injuries (LTI), Medical Treatment Cases (MTC), and high-potential near misses to determine systemic root causes.',
      deliverables: [
        'Immediate site preservation and initial notification workflows',
        'Interactive 5-Whys and Ishikawa (Fishbone) root cause analysis builders',
        'Corrective and Preventive Action (CAPA) assignment with photographic proof',
        'Statutory injury notification documentation for Ministry of Labour & MoPH',
        'Lessons learned bulletins for company-wide distribution',
      ],
      qatarRef: 'Qatar Labour Law Art. 108 mandatory occupational injury reporting within 24 hours.',
    },
    {
      id: 'ptw-governance',
      title: 'Permit to Work (PTW) & High-Risk Activity Governance',
      subtitle: 'Digital life-safety permits for Hot Work, Confined Space, Work at Height, and Lifting.',
      icon: FileCheck2,
      scope: 'Multi-tier digital permit issuance and verification ensuring pre-task risk assessments, atmospheric gas testing, and electrical/mechanical isolations are verified.',
      deliverables: [
        'Digital permit authorization workflows (Applicant -> Issuer -> Approver)',
        'Atmospheric gas testing logs for confined space entries (O2, LEL, CO, H2S)',
        'Lockout / Tagout (LOTO) isolation verification certificates',
        'Daily permit cancellation, hand-back, and close-out audit trail',
        'Interactive SIMOPs hazard mapping across overlapping project zones',
      ],
      qatarRef: 'Qatar Civil Defence & Labour Law requirements for high-risk industrial operations.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#172B25] font-sans">
      {/* 1. SERVICES HERO */}
      <section className="bg-gradient-to-b from-[#073B2F] via-[#092B24] to-[#073B2F] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#DDF5EA] uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-[#20A887]" />
            <span>Qatar Enterprise Safety Practice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Integrated <span className="text-[#20A887]">HSE Services</span> & Regulatory Solutions
          </h1>
          <p className="text-sm sm:text-base text-[#DDF5EA]/90 max-w-3xl mx-auto leading-relaxed">
            Delivering strategic HSE transformation, statutory Qatar legal alignment, workforce mobile enablement, and advanced AI safety capabilities for large-scale organisations and major capital projects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request HSE Services Consultation</span>
            </button>
            <button
              onClick={() => setPortalView('platform')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-2"
            >
              <Monitor className="w-4 h-4 text-[#20A887]" />
              <span>Launch Live Interactive Platform</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SERVICES INTERACTIVE EXPLORER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B25] tracking-tight">
            Our 8 Core HSE Service Pillars
          </h2>
          <p className="text-xs sm:text-sm text-[#65756D] mt-2">
            Select a service pillar below to review scope, verified Qatar regulatory references, and key deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Tabs */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              const isSelected = selectedServiceIndex === idx;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceIndex(idx)}
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
                      <div className="text-xs font-bold text-gray-900 truncate">{srv.title}</div>
                      <div className="text-[10px] text-gray-500 truncate">{srv.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#087F5B] ml-2">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Service Details Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E3EAE6] shadow-lg space-y-6">
            {(() => {
              const currentSrv = services[selectedServiceIndex];
              const Icon = currentSrv.icon;
              return (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">
                          Service Pillar 0{selectedServiceIndex + 1}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">{currentSrv.title}</h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-[#073B2F] rounded-full text-[10px] font-bold">
                      ENTERPRISE READY
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                      Service Scope & Approach
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {currentSrv.scope}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                      Key Deliverables & Outputs
                    </h4>
                    <div className="space-y-2">
                      {currentSrv.deliverables.map((item) => (
                        <div
                          key={item}
                          className="p-2.5 bg-[#F4F7F5] rounded-lg border border-[#E3EAE6] text-xs text-gray-800 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#087F5B] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Qatar Statutory Alignment Citation */}
                  <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-[#073B2F] flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#087F5B] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Qatar Statutory Citation: </span>
                      <span>{currentSrv.qatarRef}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={() => setIsEnquiryModalOpen(true)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#087F5B] hover:bg-[#073B2F] text-white text-xs font-bold rounded-lg transition-all shadow flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Enquire About This Service</span>
                    </button>
                    <button
                      onClick={() => setPortalView('platform')}
                      className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      <Monitor className="w-3.5 h-3.5 text-[#087F5B]" />
                      <span>Test in Live Platform</span>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 3. SERVICE DELIVERY METHODOLOGY */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-[#E3EAE6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#087F5B]/10 border border-[#087F5B]/20 text-xs font-bold text-[#087F5B] uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Proven Deployment Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B25] tracking-tight">
              Our 4-Stage HSE Delivery Methodology
            </h2>
            <p className="text-xs sm:text-sm text-[#65756D] mt-2">
              Structured deployment framework ensuring rapid operational adoption, high workforce engagement, and zero disruption to ongoing construction or industrial schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F4F7F5] border border-[#E3EAE6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-gray-900">Diagnostic & Statutory Audit</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                In-depth gap analysis against Qatar Labour Law 14/2004, MD 17/2021, and project safety specifications to establish baseline risk profile.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F5] border border-[#E3EAE6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-gray-900">Customization & Legal Mapping</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Configuring site locations, work permit hierarchies, 40 RBAC roles, and linking Qatar statutory articles to specific organizational controls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F5] border border-[#E3EAE6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-gray-900">Workforce Field Enablement</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bilingual onboarding for field workers and subcontractors on mobile speech-to-text reporting, photo capture, and Stop Work Authority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F5] border border-[#E3EAE6] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-white flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-sm font-bold text-gray-900">Continuous AI & Compliance Audit</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ongoing leading indicator analytics, autonomous CAPA escalation, and automated Qatar Official Gazette delta tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#073B2F] rounded-3xl p-8 sm:p-12 text-white shadow-2xl text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule an Enterprise HSE Consultation
          </h2>
          <p className="text-xs sm:text-sm text-[#DDF5EA]/90 max-w-xl mx-auto leading-relaxed">
            Speak directly with our Qatar regulatory and HSE digital specialists. We evaluate your current safety governance and design a tailored implementation roadmap.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white text-[#073B2F] hover:bg-[#DDF5EA] text-xs font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#087F5B]" />
              <span>Request Consultation</span>
            </button>
            <button
              onClick={() => setPortalView('platform')}
              className="px-6 py-3 rounded-xl bg-[#20A887] hover:bg-[#087F5B] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 border border-white/20"
            >
              <Monitor className="w-4 h-4" />
              <span>Launch Live Interactive Platform</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};