import React, { useState, useRef, useEffect } from 'react';
import { useHSE, DesktopModule } from '../../../context/HSEContext';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  User,
  Scale,
  AlertTriangle,
  CheckCircle2,
  CheckSquare,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  ThermometerSun,
  ChevronRight,
  ArrowRight,
  Info,
  Clock,
  Layers,
  Search,
  Zap,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  Building,
  X,
} from 'lucide-react';
import { Badge } from '../../common/Badge';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  timestamp: string;
  text: string;
  statutoryReference?: string;
  structuredCard?: {
    type: 'hazard-capa' | 'heat-ban' | 'scaffold' | 'permit' | 'capa-velocity' | 'general' | 'ppe' | 'reporting' | 'emergency' | 'kpis';
    title: string;
    subtitle?: string;
    pillars?: Array<{
      label: string;
      value: string;
      sub: string;
      color: string;
    }>;
    recordLinks?: Array<{
      module: DesktopModule;
      recordRef?: string;
      label: string;
    }>;
    recommendation?: string;
  };
}

export interface DemoQA {
  id: string;
  category: 'Statutory' | 'Hazards' | 'High-Risk' | 'Governance';
  icon: string;
  title: string;
  question: string;
  statutoryRef: string;
  summaryAnswer: string;
}

export const AIChatModule: React.FC = () => {
  const { currentUser, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  // 8 Curated Client Demo Questions & Answers
  const demoQABank: DemoQA[] = [
    {
      id: 'demo-1',
      category: 'Statutory',
      icon: '🌡️',
      title: 'MD 17/2021 Summer Heat Work Stoppage',
      question: 'What are the mandatory work stoppage hours and WBGT threshold under Qatar MD 17/2021?',
      statutoryRef: 'Ministerial Decision 17/2021 • Art. 2 & 3',
      summaryAnswer: 'Prohibited outdoor work: 10:00–15:30 (1 June–15 Sept). Universal stoppage when WBGT exceeds 32.1°C.',
    },
    {
      id: 'demo-2',
      category: 'Hazards',
      icon: '🏗️',
      title: 'Work Area A Floor Opening Hazard',
      question: 'What is the status and mitigation of the floor opening in Work Area A (HAZ-2026-0042)?',
      statutoryRef: 'Qatar Law 14/2004 Art. 100',
      summaryAnswer: 'Risk score 16 (High). Mitigated by CAPA-2026-0095 steel mesh bolted to slab. Awaiting supervisor torque check.',
    },
    {
      id: 'demo-3',
      category: 'High-Risk',
      icon: '🪜',
      title: 'Scaffolding Guardrail Standards (QCS 2014)',
      question: 'What are the statutory guardrail and toe-board height requirements under QCS 2014 Section 11?',
      statutoryRef: 'QCS 2014 Section 11',
      summaryAnswer: 'Top rail 950–1150mm, mid-rail required, toe-board ≥ 150mm. Green Scafftag inspection every 7 days.',
    },
    {
      id: 'demo-4',
      category: 'High-Risk',
      icon: '🔥',
      title: 'Hot Work & Confined Space PTW Prerequisites',
      question: 'What atmospheric gas tests and fire-watch precautions are mandatory for Hot Work PTW?',
      statutoryRef: 'QCDD Fire Code & PTW Standard',
      summaryAnswer: 'O₂ 19.5%–23.5%, LEL < 10%, H₂S < 10ppm. 60-min fire watch post-welding, 2× 9kg QCDD extinguishers.',
    },
    {
      id: 'demo-5',
      category: 'Governance',
      icon: '📋',
      title: 'CAPA Resolution Velocity & SLA Tracking',
      question: 'Which CAPA corrective actions are pending verification and what is our closure velocity?',
      statutoryRef: 'ISO 45001 & Corporate SLA',
      summaryAnswer: '7 active actions in Zone 4, 92% on-time resolution, 1 item pending sign-off (CAPA-2026-0095), 0 overdue.',
    },
    {
      id: 'demo-6',
      category: 'Statutory',
      icon: '⚖️',
      title: 'Qatar Labour Law Art. 100 Employer Obligations',
      question: 'What employer safety obligations are mandated under Qatar Labour Law No. 14/2004 Article 100?',
      statutoryRef: 'Qatar Labour Law 14/2004 Art. 100',
      summaryAnswer: 'Employers must supply free certified PPE, clear safety signage in primary workforce languages, and free chilled water.',
    },
    {
      id: 'demo-7',
      category: 'Statutory',
      icon: '🚨',
      title: 'Mandatory Incident Reporting to Ministry of Labour',
      question: 'When must an occupational accident or injury be reported to the Qatar Ministry of Labour?',
      statutoryRef: 'Qatar Labour Law 14/2004 Art. 108',
      summaryAnswer: 'Any serious accident, hospitalization, or lost-time injury (>3 days) must be notified within 24 hours pursuant to Article 108.',
    },
    {
      id: 'demo-8',
      category: 'Governance',
      icon: '🏥',
      title: 'Emergency Assembly & Lusail Zone 4 First Aid',
      question: 'Where is the designated emergency assembly point and clinic for Lusail Tower Zone 4?',
      statutoryRef: 'Lusail Tower Zone 4 ERP',
      summaryAnswer: 'Assembly Point C (North Perimeter Gate 2); Ground Mezzanine on-site clinic; emergency hotline 999.',
    },
  ];

  // Preloaded rich conversation demonstrating full multi-turn capabilities
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      timestamp: '10:14 AM',
      text: `Marhaban, ${currentUser.name}! I am your Antigravity QHSE Safety Copilot for Lusail Commercial Tower Zone 4.

I maintain continuous real-time indexing across Qatar Labour Law No. 14/2004, Ministerial Decision 17/2021 (Heat Stress Orders), Qatar Construction Specifications (QCS 2014), and active project hazard registers.

You can ask me any statutory question, query recurring hazards, or click any of the curated Demo Questions on the right.`,
    },
    {
      id: 'm2',
      sender: 'user',
      timestamp: '10:15 AM',
      text: 'What are the mandatory work stoppage hours and WBGT threshold under Qatar MD 17/2021?',
    },
    {
      id: 'm3',
      sender: 'ai',
      timestamp: '10:15 AM',
      text: 'Under Qatar Ministerial Decision No. 17 of 2021 (Ministry of Labour), all outdoor construction operations are governed by seasonal prohibited hours and real-time thermal monitoring thresholds:',
      statutoryReference: 'Ministerial Decision No. 17 of 2021 • Art. 2 & Art. 3',
      structuredCard: {
        type: 'heat-ban',
        title: 'Qatar MD 17/2021 Mandatory Heat Stress Orders',
        subtitle: 'State of Qatar Ministry of Labour Compliance Directives',
        pillars: [
          {
            label: 'Prohibited Hours',
            value: '10:00 – 15:30',
            sub: 'Seasonal outdoor ban: 1 June to 15 Sept',
            color: 'text-amber-800 bg-amber-50 border-amber-200',
          },
          {
            label: 'Universal Stoppage',
            value: 'WBGT > 32.1°C',
            sub: 'Mandatory work halt regardless of hour',
            color: 'text-red-800 bg-red-50 border-red-200',
          },
          {
            label: 'Current Site Status',
            value: 'WBGT 30.2°C',
            sub: 'Orange Advisory: 45m work / 15m rest',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
          },
        ],
        recommendation:
          'Enforce shaded break rotations every 45 minutes, verify shaded resting stations have cooled drinking water (500ml/hr quota), and log hourly wet-bulb psychrometer readings.',
        recordLinks: [
          {
            module: 'Qatar Legal Compliance',
            label: 'Inspect MD 17/2021 in Legal Register →',
          },
        ],
      },
    },
    {
      id: 'm4',
      sender: 'user',
      timestamp: '10:18 AM',
      text: 'What is the status and mitigation of the floor opening in Work Area A (HAZ-2026-0042)?',
    },
    {
      id: 'm5',
      sender: 'ai',
      timestamp: '10:18 AM',
      text: 'Cross-record indexing identified 1 active High-Risk hazard currently recorded in Work Area A on Level 2:',
      statutoryReference: 'Qatar Labour Law No. 14/2004 • Art. 100 Precautionary Controls',
      structuredCard: {
        type: 'hazard-capa',
        title: 'HAZ-2026-0042 • Uncovered Mechanical Floor Opening',
        subtitle: 'Location: Work Area A (Level 2 Slab) • Severity: 4 × Likelihood: 4 = Score 16',
        pillars: [
          {
            label: 'Hazard State',
            value: 'Level 2 Void',
            sub: '1.2m × 0.9m mechanical riser opening',
            color: 'text-amber-800 bg-amber-50 border-amber-200',
          },
          {
            label: 'Mitigating Control',
            value: 'CAPA-2026-0095',
            sub: 'Steel mesh bolted to slab anchors',
            color: 'text-blue-800 bg-blue-50 border-blue-200',
          },
          {
            label: 'Action Owner',
            value: 'Tariq Al-Mansoor',
            sub: 'Pending final supervisor torque verification',
            color: 'text-purple-800 bg-purple-50 border-purple-200',
          },
        ],
        recommendation:
          'Physical torque verification of anchor bolts must be completed and photo evidence uploaded before removing perimeter exclusion tape.',
        recordLinks: [
          {
            module: 'Hazard Reporting',
            recordRef: 'HAZ-2026-0042',
            label: 'Inspect HAZ-2026-0042 Dossier →',
          },
          {
            module: 'Corrective and Preventive Actions',
            recordRef: 'CAPA-2026-0095',
            label: 'Open CAPA-2026-0095 Action Item →',
          },
        ],
      },
    },
    {
      id: 'm6',
      sender: 'user',
      timestamp: '10:20 AM',
      text: 'What are the statutory guardrail and toe-board height requirements under QCS 2014 Section 11?',
    },
    {
      id: 'm7',
      sender: 'ai',
      timestamp: '10:20 AM',
      text: 'Under Qatar Construction Specifications (QCS 2014) Section 11, working at height and perimeter scaffolding require continuous physical edge containment:',
      statutoryReference: 'QCS 2014 Section 11 • Edge Protection & Access',
      structuredCard: {
        type: 'scaffold',
        title: 'QCS 2014 Scaffolding & Edge Protection Standards',
        subtitle: 'State of Qatar Building Specifications • Structural Fall Safeguards',
        pillars: [
          {
            label: 'Top Guardrail',
            value: '950 – 1150 mm',
            sub: 'Rigid tubing tested to withstand 200kg point load',
            color: 'text-blue-800 bg-blue-50 border-blue-200',
          },
          {
            label: 'Toe-Board Height',
            value: '≥ 150 mm',
            sub: 'Solid kickboard preventing tool drops to lower levels',
            color: 'text-purple-800 bg-purple-50 border-purple-200',
          },
          {
            label: 'Inspection Cycle',
            value: '7-Day Scafftag',
            sub: 'Certified third-party inspection sign-off tag',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
          },
        ],
        recommendation:
          'Ensure all access scaffold platforms on Level 4 have green Scafftags displayed at the access ladder. Any tag dated older than 7 days must be quarantined.',
        recordLinks: [
          {
            module: 'Inspections and Audits',
            label: 'Open Scaffolding Inspection Log →',
          },
        ],
      },
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Demo Q&A Controls (Right Side Panel)
  const [showDemoQABank, setShowDemoQABank] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Statutory' | 'Hazards' | 'High-Risk' | 'Governance'>('All');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const filteredDemoQA =
    selectedCategory === 'All' ? demoQABank : demoQABank.filter((item) => item.category === selectedCategory);

  // Intelligent mock response generator
  const generateMockReply = (queryText: string): ChatMessage => {
    const q = queryText.toLowerCase();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('heat') || q.includes('ban') || q.includes('17/2021') || q.includes('wbgt') || q.includes('summer')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Detailed synthesis of Qatar Ministerial Decision No. 17 of 2021 regarding occupational heat stress prevention:',
        statutoryReference: 'Ministerial Decision 17/2021 • Articles 1, 2, 3 & 5',
        structuredCard: {
          type: 'heat-ban',
          title: 'Qatar MD 17/2021 Thermal Stress Protection Directives',
          subtitle: 'Mandatory Enforcement for all outdoor worksites in Qatar',
          pillars: [
            {
              label: 'Seasonal Ban',
              value: '10:00 – 15:30',
              sub: 'Enforced June 1 to Sept 15 annually',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
            {
              label: 'Emergency Cut-Off',
              value: 'WBGT ≥ 32.1°C',
              sub: 'Cease work immediately, shade mandatory',
              color: 'text-red-800 bg-red-50 border-red-200',
            },
            {
              label: 'Hydration Mandate',
              value: '500ml / Hour',
              sub: 'Free cooled potable electrolyte water',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Conduct continuous calibrated WBGT readings at the workface. When index exceeds 30.0°C, adjust work-rest cycle to 45m work / 15m rest under shaded shelters with misting fans.',
          recordLinks: [
            {
              module: 'Qatar Legal Compliance',
              label: 'View Qatar Legal Compliance Register →',
            },
          ],
        },
      };
    }

    if (q.includes('area a') || q.includes('void') || q.includes('floor') || q.includes('0042') || q.includes('opening')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Dossier report for Work Area A floor penetration hazard:',
        statutoryReference: 'Qatar Labour Law 14/2004 Art. 100 & QCS 2014 Sec. 11',
        structuredCard: {
          type: 'hazard-capa',
          title: 'HAZ-2026-0042 • Level 2 Floor Slab Opening',
          subtitle: 'Work Area A Mechanical Shaft Void (1.2m × 0.9m)',
          pillars: [
            {
              label: 'Initial Risk',
              value: 'Risk Score 16',
              sub: 'High Severity (Fall from height)',
              color: 'text-red-800 bg-red-50 border-red-200',
            },
            {
              label: 'Mitigating Control',
              value: 'CAPA-2026-0095',
              sub: 'Galvanized steel mesh secured with Hilti bolts',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'Sign-off State',
              value: 'Under Verification',
              sub: 'Supervisory torque check required',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Do not strike physical barricade tape until Site Supervisor (Tariq Al-Mansoor) conducts bolt torque testing and signs off verification photographic evidence.',
          recordLinks: [
            {
              module: 'Hazard Reporting',
              recordRef: 'HAZ-2026-0042',
              label: 'Open HAZ-2026-0042 Case File →',
            },
            {
              module: 'Corrective and Preventive Actions',
              recordRef: 'CAPA-2026-0095',
              label: 'Open CAPA-2026-0095 Verification →',
            },
          ],
        },
      };
    }

    if (q.includes('scaffold') || q.includes('height') || q.includes('fall') || q.includes('guardrail')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Statutory work-at-height and scaffolding compliance requirements for Qatar construction worksites:',
        statutoryReference: 'Qatar Construction Specifications (QCS 2014) • Section 11',
        structuredCard: {
          type: 'scaffold',
          title: 'QCS 2014 Scaffolding & Edge Protection Standards',
          subtitle: 'Mandatory structural fall prevention safeguards',
          pillars: [
            {
              label: 'Top Guardrail',
              value: '950 – 1150 mm',
              sub: 'Rigid scaffold tubing with 200kg load rating',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
            {
              label: 'Toe-Board Height',
              value: '≥ 150 mm',
              sub: 'Secured to prevent tool drop below',
              color: 'text-purple-800 bg-purple-50 border-purple-200',
            },
            {
              label: 'Scaffold Tag',
              value: 'Green Scafftag',
              sub: 'Inspected every 7 days by competent scaffolder',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
          ],
          recommendation:
            'Inspect mobile access towers on Level 4. Ensure yellow caution tags are removed only when outriggers and double guardrails are locked in position.',
          recordLinks: [
            {
              module: 'Inspections and Audits',
              label: 'Log New Scaffolding Checklist →',
            },
          ],
        },
      };
    }

    if (q.includes('permit') || q.includes('ptw') || q.includes('hot work') || q.includes('gas test') || q.includes('confined')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Qatar Civil Defence (QCDD) and high-risk Permit to Work (PTW) statutory prerequisites:',
        statutoryReference: 'QCDD Fire Protection Code & Qatar Labour Law 14/2004',
        structuredCard: {
          type: 'permit',
          title: 'High-Risk Permit to Work (PTW) Verification',
          subtitle: 'Mandatory checks for Hot Work and Confined Space Entry',
          pillars: [
            {
              label: 'Atmospheric Gas Check',
              value: 'O₂ 19.5% – 23.5%',
              sub: 'LEL < 10% • H₂S < 10ppm • CO < 25ppm',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'Fire Watch Duration',
              value: '60 Minutes',
              sub: 'Dedicated fire watch post-welding cessation',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
            {
              label: 'QCDD Equipment',
              value: '2× 9kg Dry Powder',
              sub: 'Inspected within 30 days with valid seal',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Verify active PTW-2026-0018 before authorizing spark-generating grinding near Zone 4 mechanical risers.',
          recordLinks: [
            {
              module: 'Permit to Work',
              label: 'Open Permit to Work Register →',
            },
          ],
        },
      };
    }

    if (q.includes('capa') || q.includes('overdue') || q.includes('velocity') || q.includes('action')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Summary of active Corrective and Preventive Actions (CAPA) across Lusail Commercial Tower Zone 4:',
        statutoryReference: 'ISO 45001:2018 Cl. 10.2 & Enterprise Safety Governance',
        structuredCard: {
          type: 'capa-velocity',
          title: 'Active CAPA Trajectories & Resolution Velocity',
          subtitle: 'Tracking 7 active corrective measures across Zone 4',
          pillars: [
            {
              label: 'On-Time Velocity',
              value: '92% On-Time',
              sub: 'Average close-out SLA: 4.8 days',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'Pending Verification',
              value: '1 Action Item',
              sub: 'CAPA-2026-0095 (Steel mesh installation)',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
            {
              label: 'Overdue Trajectory',
              value: '0 Overdue',
              sub: 'All mandatory milestones within SLA target',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Expedite photographic verification for CAPA-2026-0095 to achieve 100% resolution for Level 2 Work Area A.',
          recordLinks: [
            {
              module: 'Corrective and Preventive Actions',
              label: 'Open Full CAPA Action Tracker →',
            },
          ],
        },
      };
    }

    if (q.includes('article 100') || q.includes('art. 100') || q.includes('ppe') || q.includes('employer obligation')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Legal breakdown of Employer Safety Obligations pursuant to Qatar Labour Law No. 14 of 2004 Article 100:',
        statutoryReference: 'Qatar Labour Law No. 14 of 2004 • Article 100 (Occupational Safety)',
        structuredCard: {
          type: 'ppe',
          title: 'Article 100 • Employer Occupational Protection Mandates',
          subtitle: 'State of Qatar Statutory Workforce Safeguards',
          pillars: [
            {
              label: 'Free Certified PPE',
              value: 'EN / ANSI Standard',
              sub: 'No payroll deduction permitted for safety gear',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'Multilingual Notice',
              value: 'Arabic / English / Hindi',
              sub: 'Hazard instruction boards at all site gates',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
            {
              label: 'Hydration & Rest',
              value: 'Potable Chilled Water',
              sub: 'Shaded resting stations within 50m of workface',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
          ],
          recommendation:
            'Ensure all newly onboarded sub-contractor tradesmen receive certified safety footwear, high-visibility vests, and eye protection before receiving site access badges.',
          recordLinks: [
            {
              module: 'Qatar Legal Compliance',
              label: 'Inspect Law 14/2004 in Legal Register →',
            },
          ],
        },
      };
    }

    if (q.includes('article 108') || q.includes('art. 108') || q.includes('report') || q.includes('injury') || q.includes('24 hour') || q.includes('notification')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Qatar statutory incident notification timelines under Labour Law No. 14/2004 Article 108:',
        statutoryReference: 'Qatar Labour Law No. 14 of 2004 • Article 108',
        structuredCard: {
          type: 'reporting',
          title: 'Article 108 • Mandatory Incident Notification Timelines',
          subtitle: 'Ministry of Labour & Capital Police Statutory Notification',
          pillars: [
            {
              label: 'Reporting Window',
              value: 'Within 24 Hours',
              sub: 'Formal submission to Ministry Labour Inspection',
              color: 'text-red-800 bg-red-50 border-red-200',
            },
            {
              label: 'Threshold Event',
              value: 'Hospitalization / >3 Days LTI',
              sub: 'Any fracture, concussion, or serious injury',
              color: 'text-amber-800 bg-amber-50 border-amber-200',
            },
            {
              label: 'Police Liaison',
              value: 'Capital Police',
              sub: 'Immediate phone notification for severe incidents',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
          ],
          recommendation:
            'Use the Incident Management module to generate a pre-formatted Ministry of Labour digital accident report within the 24-hour window.',
          recordLinks: [
            {
              module: 'Incident Management',
              label: 'Open Incident Management Module →',
            },
          ],
        },
      };
    }

    if (q.includes('emergency') || q.includes('assembly') || q.includes('clinic') || q.includes('first aid')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Lusail Commercial Tower Zone 4 Emergency Response & On-Site Medical Protocol:',
        statutoryReference: 'Lusail Tower Zone 4 Emergency Response Plan (ERP-2026)',
        structuredCard: {
          type: 'emergency',
          title: 'Emergency Assembly & Zone 4 Medical Infrastructure',
          subtitle: 'Licensed On-Site Clinic and Evacuation Master Plan',
          pillars: [
            {
              label: 'Assembly Point',
              value: 'Assembly Point C',
              sub: 'North Perimeter Gate 2 (Clear of overhead cranes)',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'On-Site Clinic',
              value: 'Ground Mezzanine',
              sub: 'Licensed Nurse EMP-2041 with oxygen resuscitation',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
            {
              label: 'Emergency Hotline',
              value: 'Dial 999 / Radio Ch. 1',
              sub: 'Internal Security Control Room direct line',
              color: 'text-red-800 bg-red-50 border-red-200',
            },
          ],
          recommendation:
            'Verify all 12 floor wardens have active VHF radios set to Channel 1 and conduct monthly emergency roll-call drill at Assembly Point C.',
          recordLinks: [
            {
              module: 'Emergency Preparedness',
              label: 'Inspect Emergency Preparedness Plan →',
            },
          ],
        },
      };
    }

    if (q.includes('man-hour') || q.includes('safe') || q.includes('ltifr') || q.includes('kpi') || q.includes('milestone')) {
      return {
        id: `m-${Date.now()}`,
        sender: 'ai',
        timestamp: timeNow,
        text: 'Lusail Commercial Tower Zone 4 Executive Safety Scorecard & Milestone Verification:',
        statutoryReference: 'Enterprise Safety Governance & Ministry of Labour Audit',
        structuredCard: {
          type: 'kpis',
          title: 'Executive Safety Performance & Governance Metrics',
          subtitle: 'Certified statistics for Lusail Commercial Tower Zone 4',
          pillars: [
            {
              label: 'Safe Man-Hours',
              value: '1,250,000 Hours',
              sub: 'Zero lost time injuries logged to date',
              color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
            },
            {
              label: 'LTIFR Rate',
              value: '0.00 LTIFR',
              sub: 'Industry benchmark: < 0.15 across GCC',
              color: 'text-blue-800 bg-blue-50 border-blue-200',
            },
            {
              label: 'Qatar Statutory Audit',
              value: '100% Compliant',
              sub: 'Full compliance across Law 14/2004 & MD 17/2021',
              color: 'text-purple-800 bg-purple-50 border-purple-200',
            },
          ],
          recommendation:
            'Present these metrics to client stakeholders during the upcoming quarterly executive safety review.',
          recordLinks: [
            {
              module: 'Executive Dashboard',
              label: 'Return to Executive Dashboard →',
            },
          ],
        },
      };
    }

    // Default intelligent response
    return {
      id: `m-${Date.now()}`,
      sender: 'ai',
      timestamp: timeNow,
      text: `Cross-indexing analysis completed for: "${queryText}". The platform has correlated your query with current site observations and Qatar safety standards:`,
      statutoryReference: 'Qatar Labour Law No. 14 of 2004 • General Occupational Safety',
      structuredCard: {
        type: 'general',
        title: 'QHSE Safety & Compliance Intelligence',
        subtitle: `Project: Lusail Commercial Tower Zone 4 • Query: ${queryText.slice(0, 40)}...`,
        pillars: [
          {
            label: 'Indexed Records',
            value: '40 Hazards • 25 Incidents',
            sub: 'Zero discrepancies identified',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
          },
          {
            label: 'Statutory Alignment',
            value: '100% Compliant',
            sub: 'Aligned with Al-Meezan legal articles',
            color: 'text-blue-800 bg-blue-50 border-blue-200',
          },
          {
            label: 'Next Operational Step',
            value: 'Supervisory Review',
            sub: 'Logged in digital HSE compliance ledger',
            color: 'text-purple-800 bg-purple-50 border-purple-200',
          },
        ],
        recommendation:
          'Maintain daily tool-box talks and verify physical control measures before commencing high-risk shift works.',
        recordLinks: [
          {
            module: 'Executive Dashboard',
            label: 'Return to Executive Dashboard →',
          },
        ],
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isTyping) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: timeNow,
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Realistic typing delay (650ms) to impress client
    setTimeout(() => {
      const aiReply = generateMockReply(text);
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 650);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'm-reset',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Conversation thread cleared. Antigravity QHSE Copilot is standing by. Ask any question regarding Qatar safety regulations or site operations.`,
      },
    ]);
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate voice transcription after 1.8 seconds
      setTimeout(() => {
        setIsListening(false);
        setInputQuery('What is the heat index and WBGT reading right now?');
      }, 1800);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[620px] bg-white rounded-2xl border border-[#E3EAE6] shadow-sm overflow-hidden text-xs animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#0A4537] text-white flex items-center justify-between flex-shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight truncate">
                Antigravity HSE AI Safety Copilot
              </h2>
              <span className="text-[10px] font-semibold bg-white/15 text-emerald-200 px-2.5 py-0.5 rounded-full border border-white/20 hidden sm:inline-block">
                Qatar Statutory AI
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80 truncate mt-0.5">
              Live Indexing: Qatar Labour Law 14/2004 • MD 17/2021 Heat Orders • Lusail Tower Zone 4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Toggle Button for Right-Side Demo Q&A Sidebar */}
          <button
            onClick={() => setShowDemoQABank(!showDemoQABank)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all border shadow-xs active:scale-95 ${
              showDemoQABank
                ? 'bg-amber-400 text-gray-950 border-amber-300 shadow-md ring-2 ring-amber-300/40'
                : 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 hover:bg-emerald-500/40 text-emerald-100 hover:text-white border-emerald-400/40'
            }`}
            title="Toggle Right-Side Client Demo Questions & Answers Panel"
          >
            <Zap className={`w-3.5 h-3.5 ${showDemoQABank ? 'text-gray-950' : 'text-amber-300 animate-pulse'}`} />
            <span>{showDemoQABank ? 'Hide Demo Q&A' : 'Show Demo Q&A (8)'}</span>
          </button>

          <button
            onClick={() => setActiveDesktopModule('AI-Assisted HSE Search')}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/15"
            title="Open Structured Semantic Search Dossier"
          >
            <Search className="w-3.5 h-3.5 text-emerald-200" />
            <span>Search Dossier</span>
          </button>

          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-black/20 hover:bg-black/35 text-white/90 hover:text-white font-medium text-xs transition-colors border border-white/10"
            title="Reset conversation thread"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* 2-Column Main Workspace: Left = Full-Height Live Chat, Right = Demo Q&A Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN: Main Conversational Chat (Full Height & Maximum Visibility) */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Top Quick Prompt Pills (Single Slim Row) */}
          <div className="bg-[#F8FAF9] px-4 py-2 border-b border-gray-200 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#087F5B]" />
              Quick Prompts:
            </span>
            {demoQABank.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSendMessage(p.question)}
                className="flex-shrink-0 px-2.5 py-1 bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#073B2F] rounded-lg border border-gray-200 hover:border-[#087F5B] text-[11px] font-medium transition-all shadow-2xs active:scale-95 whitespace-nowrap flex items-center gap-1"
                title={p.question}
              >
                <span>{p.icon}</span>
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          {/* Message History Thread - Generous Full Height Space */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-[#F8FAF9]">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[90%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs ${
                      isAi
                        ? 'bg-gradient-to-tr from-[#073B2F] to-[#20A887] text-white'
                        : 'bg-[#172B25] text-white'
                    }`}
                  >
                    {isAi ? <Sparkles className="w-4 h-4 text-emerald-200" /> : <User className="w-4 h-4 text-white" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[11px] text-gray-800">
                        {isAi ? 'Antigravity QHSE Copilot' : currentUser.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{msg.timestamp}</span>
                      {msg.statutoryReference && (
                        <span className="text-[9px] font-bold bg-emerald-50 text-[#073B2F] px-2 py-0.5 rounded border border-emerald-200/80">
                          ⚖️ {msg.statutoryReference}
                        </span>
                      )}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl shadow-xs text-xs leading-relaxed transition-all ${
                        isAi
                          ? 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'
                          : 'bg-gradient-to-br from-[#073B2F] to-[#0A4537] text-white rounded-tr-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Structured Rich Card (if present) */}
                      {msg.structuredCard && (
                        <div className="mt-3 bg-[#F8FAF9] rounded-xl border border-gray-200 overflow-hidden text-gray-800 shadow-2xs">
                          {/* Card Header */}
                          <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-xs text-gray-900">{msg.structuredCard.title}</h4>
                              {msg.structuredCard.subtitle && (
                                <p className="text-[10px] text-gray-500 mt-0.5">{msg.structuredCard.subtitle}</p>
                              )}
                            </div>
                            <span className="text-[9px] font-bold bg-[#DDF5EA] text-[#073B2F] px-2 py-0.5 rounded-full border border-[#20A887]/30">
                              Verified Record
                            </span>
                          </div>

                          {/* 3 Metric Pillars */}
                          {msg.structuredCard.pillars && (
                            <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {msg.structuredCard.pillars.map((pillar, idx) => (
                                <div
                                  key={idx}
                                  className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${pillar.color}`}
                                >
                                  <span className="text-[9px] font-bold uppercase tracking-wider block opacity-75">
                                    {pillar.label}
                                  </span>
                                  <strong className="text-xs font-bold block my-0.5 truncate">{pillar.value}</strong>
                                  <span className="text-[9px] block opacity-90 truncate">{pillar.sub}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Actionable Recommendation */}
                          {msg.structuredCard.recommendation && (
                            <div className="p-3 bg-white border-t border-gray-100 flex items-start gap-2">
                              <ShieldCheck className="w-4 h-4 text-[#087F5B] flex-shrink-0 mt-0.5" />
                              <div className="text-[11px] text-gray-700 leading-snug">
                                <strong className="text-gray-900 block text-[11px]">Recommended HSE Action:</strong>
                                {msg.structuredCard.recommendation}
                              </div>
                            </div>
                          )}

                          {/* Direct Record Inspection Buttons */}
                          {msg.structuredCard.recordLinks && msg.structuredCard.recordLinks.length > 0 && (
                            <div className="p-2.5 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-2 items-center">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">
                                Quick Jump:
                              </span>
                              {msg.structuredCard.recordLinks.map((link, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setActiveDesktopModule(link.module as any);
                                    if (link.recordRef) setSelectedRecordRef(link.recordRef);
                                  }}
                                  className="px-2.5 py-1 bg-white hover:bg-[#073B2F] text-gray-700 hover:text-white rounded-md border border-gray-300 hover:border-[#073B2F] text-[10px] font-bold transition-all shadow-2xs flex items-center gap-1 active:scale-95"
                                >
                                  <span>{link.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Copy button */}
                      {isAi && (
                        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                          <span className="flex items-center gap-1 font-mono">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Statutory Cross-Verified
                          </span>
                          <button
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="hover:text-gray-700 transition-colors flex items-center gap-1 text-[10px]"
                            title="Copy answer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Realistic Animated Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%] mr-auto animate-in fade-in duration-100">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#073B2F] to-[#20A887] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-xs flex items-center gap-2.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium italic">
                    QHSE Copilot is indexing Qatar legal decrees and Lusail Tower records...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Dictation Active Wave Banner */}
          {isListening && (
            <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-between text-xs animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 items-center">
                  <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
                  <span className="w-1 h-5 bg-white rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150" />
                  <span className="w-1 h-4 bg-white rounded-full animate-pulse delay-200" />
                </div>
                <span className="font-bold">Listening for Qatar HSE query... Speak now.</span>
              </div>
              <button
                onClick={() => setIsListening(false)}
                className="text-[10px] bg-black/20 hover:bg-black/30 px-2 py-0.5 rounded text-white font-medium"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Bottom Message Input Bar */}
          <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-md ring-2 ring-red-300'
                    : 'bg-[#F4F7F5] hover:bg-gray-200 text-gray-600'
                }`}
                title="Simulate Voice Input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask anything (e.g., 'What are the heat ban hours under MD 17/2021?' or 'Check hazard HAZ-2026-0042')..."
                  className="w-full pl-3.5 pr-20 py-2.5 bg-[#F4F7F5] border border-gray-200 rounded-xl outline-none text-xs text-gray-800 placeholder-gray-400 font-medium focus:ring-2 focus:ring-[#087F5B] focus:bg-white transition-all shadow-inner"
                />
                <span className="absolute right-2.5 top-2.5 text-[10px] text-gray-400 font-mono hidden sm:inline-block pointer-events-none">
                  Press Enter ↵
                </span>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all flex-shrink-0 shadow-sm ${
                  inputQuery.trim() && !isTyping
                    ? 'bg-gradient-to-r from-[#073B2F] to-[#087F5B] text-white hover:opacity-95 active:scale-95 shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-emerald-600" />
                Deterministic Local AI • 0 External Cloud Calls • Aligned with Al-Meezan Qatar Legal Portal
              </span>
              <span className="font-mono text-gray-500">Lusail Tower Zone 4</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Client Demo Questions & Answers Panel */}
        {showDemoQABank && (
          <aside className="w-80 lg:w-96 border-l border-gray-200 bg-[#F8FAF9] flex flex-col flex-shrink-0 animate-in slide-in-from-right-3 duration-150">
            {/* Sidebar Header */}
            <div className="p-3.5 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-xs text-gray-900 leading-tight">
                    Demo Questions & Answers
                  </h3>
                  <p className="text-[10px] text-gray-500">8 Curated Qatar Scenarios</p>
                </div>
              </div>

              <button
                onClick={() => setShowDemoQABank(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                title="Hide Demo Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-3 py-2 bg-white/80 border-b border-gray-200 flex items-center gap-1 overflow-x-auto no-scrollbar flex-shrink-0">
              {(['All', 'Statutory', 'Hazards', 'High-Risk', 'Governance'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all border whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#073B2F] text-white border-[#073B2F] shadow-2xs'
                      : 'bg-white text-gray-600 hover:text-gray-900 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat === 'All' ? 'All (8)' : cat}
                </button>
              ))}
            </div>

            {/* Instruction Tip */}
            <div className="px-3 py-1.5 bg-emerald-50/70 border-b border-emerald-100 text-[10px] text-emerald-900 flex items-center gap-1.5 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span>Click <strong>"Ask in Chat"</strong> to see live AI response:</span>
            </div>

            {/* Scrollable Questions List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredDemoQA.map((demo) => (
                <div
                  key={demo.id}
                  className="bg-white p-3 rounded-xl border border-gray-200 hover:border-[#087F5B] hover:shadow-xs transition-all flex flex-col justify-between group space-y-2"
                >
                  {/* Top Bar: Icon, Title & Category */}
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm flex-shrink-0">{demo.icon}</span>
                        <h4 className="font-bold text-[11px] text-gray-900 truncate">
                          {demo.title}
                        </h4>
                      </div>
                      <span className="text-[9px] font-semibold bg-emerald-50 text-[#073B2F] px-1.5 py-0.2 rounded border border-emerald-200 flex-shrink-0">
                        {demo.category}
                      </span>
                    </div>

                    {/* Question */}
                    <p className="text-xs text-gray-800 font-semibold leading-snug">
                      "{demo.question}"
                    </p>

                    {/* Concise Verified Answer Preview */}
                    <div className="mt-2 p-2 bg-[#F4F7F5] rounded-lg border border-gray-200/80 text-[10px] text-gray-700 leading-relaxed">
                      <div className="flex items-center justify-between font-mono text-[9px] text-gray-500 mb-0.5">
                        <span>⚖️ {demo.statutoryRef}</span>
                        <span className="text-emerald-700 font-bold">Verified</span>
                      </div>
                      <p>{demo.summaryAnswer}</p>
                    </div>
                  </div>

                  {/* 1-Click Action to ask in Chat */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[9px] text-gray-400 font-mono">1-Click Live Test</span>
                    <button
                      onClick={() => handleSendMessage(demo.question)}
                      className="px-2.5 py-1 bg-gradient-to-r from-[#073B2F] to-[#087F5B] hover:opacity-95 text-white rounded-lg text-[10px] font-bold transition-all shadow-2xs flex items-center gap-1 active:scale-95"
                    >
                      <span>Ask in Chat</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
