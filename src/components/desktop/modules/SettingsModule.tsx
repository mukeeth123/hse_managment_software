import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { Settings, Shield, Server, Database, Lock, RotateCcw, Building, MapPin, Sliders, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../common/Badge';

export const SettingsModule: React.FC = () => {
  const { resetAllData, projects, locations, addToast } = useHSE();
  const [activeTab, setActiveTab] = useState<'profile' | 'technical' | 'riskConfig' | 'data'>('technical');

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Platform Settings & Technical Architecture</h2>
            <Badge variant="verified" size="sm">Frontend Demonstration</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Enterprise configuration parameters, risk scoring rules and Qatar enterprise deployment advisory
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3EAE6] bg-white px-4 rounded-t-xl gap-2 font-bold">
        <button
          onClick={() => setActiveTab('technical')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'technical' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Enterprise Technical Considerations (Qatar)</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'profile' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Organisation & Projects Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('riskConfig')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'riskConfig' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Risk Matrix Calibration</span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'data' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Demonstration Data Reset</span>
        </button>
      </div>

      {/* Technical Considerations View */}
      {activeTab === 'technical' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 leading-relaxed">
            <strong>Technical Validation Notice:</strong> The following architecture notes represent enterprise deployment considerations for large Qatar organisations evaluating production deployment. All items are strictly:
            <span className="font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded ml-1">
              SUBJECT TO TECHNICAL VALIDATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Qatar National Data Residency & Hosting Preference',
                desc: 'Client organization requirement to maintain all operational HSE safety reports, worker records and regulatory filings within the State of Qatar in compliance with National Cyber Security Agency (NCSA) data protection frameworks.',
                status: 'SUBJECT TO TECHNICAL VALIDATION',
                tag: 'Data Residency',
              },
              {
                title: 'On-Premises / Private Sovereign Cloud Options',
                desc: 'Support for containerized or private Kubernetes deployment within client on-premise datacenter or authorized Qatar Cloud regions (Google Cloud Doha / Azure Qatar Central).',
                status: 'SUBJECT TO TECHNICAL VALIDATION',
                tag: 'Infrastructure',
              },
              {
                title: 'Enterprise Identity & Access Management (IAM / SSO)',
                desc: 'Integration with Microsoft Entra ID (Azure AD), Okta, SAML 2.0 / OIDC and role-based directory sync to automate employee onboarding and role provisioning.',
                status: 'SUBJECT TO TECHNICAL VALIDATION',
                tag: 'Security & Auth',
              },
              {
                title: 'Client IT & Cyber Security Review',
                desc: 'Security posture alignment including static application security testing (SAST), third-party penetration testing, OWASP Top 10 mitigation and audit event immutability.',
                status: 'SUBJECT TO TECHNICAL VALIDATION',
                tag: 'Compliance',
              },
              {
                title: 'Disaster Recovery & High Availability',
                desc: 'Recovery Point Objective (RPO < 15 min) and Recovery Time Objective (RTO < 1 hour) with automated off-site geo-redundant database replication and snapshots.',
                status: 'SUBJECT TO TECHNICAL VALIDATION',
                tag: 'Resilience',
              },
              {
                title: 'Offline-First Mobile Synchronization',
                desc: 'PWA / Mobile SQLite caching enabling frontline workforce in basement excavations or remote desert facilities to log observations without network, auto-syncing upon signal recovery.',
                status: 'SUBJECT TO TECHNICAL VALIDATION',
                tag: 'Mobile Architecture',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 bg-[#F4F7F5] rounded-xl border border-gray-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] bg-white text-gray-700 font-bold px-2 py-0.5 rounded border">
                      {item.tag}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs">{item.title}</h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Organisation Profile View */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-4">
          <div className="p-3 bg-[#F4F7F5] rounded-xl border border-gray-200 space-y-2">
            <h4 className="font-bold text-gray-900 text-xs">Fictional Organisation Profile</h4>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>Organisation: <strong>Client Organisation — Qatar Demonstration Environment</strong></div>
              <div>Industry: <strong>Infrastructure, Civil & Energy Operations</strong></div>
              <div>Operating Jurisdiction: <strong>State of Qatar (Doha, Al Rayyan, Mesaieed, Ras Laffan)</strong></div>
              <div>Regulatory Oversight: <strong>Ministry of Labour (MoL) & MECC</strong></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Active Project Sites ({projects.length})</h5>
              <ul className="space-y-1 text-[11px] text-gray-700">
                {projects.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#087F5B]"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
              <h5 className="font-bold text-gray-900 text-xs">Standard Locations ({locations.length})</h5>
              <div className="flex flex-wrap gap-1.5">
                {locations.map((loc, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-[10px] font-medium">
                    📍 {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risk Config */}
      {activeTab === 'riskConfig' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4 space-y-3">
          <h4 className="font-bold text-gray-900 text-xs">5×5 Risk Matrix Calibrations</h4>
          <p className="text-[11px] text-gray-600">
            Standard risk scoring formula: <code>Risk Score = Likelihood (1-5) × Severity (1-5)</code>.
          </p>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] space-y-2 text-gray-700">
            <div>• <strong>Critical (15 - 25):</strong> Immediate stop work authority, project manager escalation, formal investigation.</div>
            <div>• <strong>High (10 - 14):</strong> Senior HSE Officer permit sign-off, engineered containment before resuming work.</div>
            <div>• <strong>Medium (6 - 9):</strong> Site supervisor review, standard operating procedure enforcement.</div>
            <div>• <strong>Low (1 - 5):</strong> Routine monitoring and pre-task toolbox talk control.</div>
          </div>
        </div>
      )}

      {/* Data Reset */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-6 text-center space-y-3">
          <RotateCcw className="w-10 h-10 text-red-600 mx-auto" />
          <h3 className="font-bold text-gray-900 text-sm">Reset All Demonstration Datasets</h3>
          <p className="text-gray-600 max-w-md mx-auto text-[11px] leading-relaxed">
            Reload the initial seed state (40 users, 25 hazards, 15 incidents, 35 CAPAs, 20 risk assessments, 20 inspections, 15 permits, and Qatar legal compliance register).
          </p>
          <button
            onClick={resetAllData}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition-colors"
          >
            Confirm & Reload Fresh Demo Data
          </button>
        </div>
      )}
    </div>
  );
};
