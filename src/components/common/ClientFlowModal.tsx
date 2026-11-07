import React, { useState, useEffect } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Shield,
  Smartphone,
  Monitor,
  CheckCircle2,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Camera,
  Mic,
  Scale,
  FileCheck2,
  Users,
  AlertTriangle,
  Clock,
  X,
  Volume2,
  Zap,
} from 'lucide-react';
import { Badge } from './Badge';

export const ClientFlowModal: React.FC = () => {
  const {
    isScenarioModalOpen,
    setIsScenarioModalOpen,
    scenarioStep,
    runScenarioStep,
    hazards,
    capas,
    switchUser,
    setActiveDesktopModule,
    setSelectedRecordRef,
    setMobileScreen,
    setViewMode,
    addToast,
    resetAllData,
  } = useHSE();

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState(scenarioStep);

  const hazard = hazards.find((h) => h.reference === 'HAZ-2026-0042');
  const capa = capas.find((c) => c.reference === 'CAPA-2026-0095');

  const flowMilestones = [
    {
      step: 0,
      phaseNumber: '01',
      title: 'Worker Mobile Observation & Voice AI Dictation',
      actor: 'Ahmed Hassan (Field Worker • EMP-1045)',
      device: 'Mobile Smartphone Application',
      deviceIcon: Smartphone,
      summary: 'Frontline observation of an uncovered 1.2m x 0.9m floor slab penetration. Ahmed dictates the hazard using Web Speech AI and attaches a watermarked worksite photo.',
      qatarRef: 'Qatar Labour Law No. 14/2004 Art. 100 (Worker Duty of Notification)',
      status: hazard ? 'Completed' : 'Ready to Run',
      actionTitle: '1. Execute Mobile Voice Reporting',
      runAction: () => {
        switchUser('USR-001'); // Ahmed Hassan
        setMobileScreen('report-hazard');
        setViewMode('both');
        setIsScenarioModalOpen(false);
        addToast('info', 'Client Flow Step 1', 'Mobile App loaded: Ahmed Hassan reporting hazard via Speech AI.');
      },
    },
    {
      step: 1,
      phaseNumber: '02',
      title: 'Supervisor Initial Screening & Safety Review',
      actor: 'Tariq Al-Mansoor (Site Supervisor • EMP-1010)',
      device: 'Desktop Control Centre (Site Operations)',
      deviceIcon: Monitor,
      summary: 'Supervisor receives instant mobile push alert, inspects the submitted hazard HAZ-2026-0042 on desktop, confirms the 4.5m fall hazard, and requests formal HSE classification.',
      qatarRef: 'Ministry of Labour Site Inspection Precautionary Standard',
      status: hazard?.status !== 'Submitted' ? 'Completed' : 'Ready to Run',
      actionTitle: '2. Execute Supervisor Desktop Review',
      runAction: () => {
        switchUser('USR-008'); // Tariq Al-Mansoor
        runScenarioStep(1);
        setActiveDesktopModule('Hazard Reporting');
        setSelectedRecordRef('HAZ-2026-0042');
        setViewMode('both');
        setIsScenarioModalOpen(false);
        addToast('success', 'Client Flow Step 2', 'Supervisor screened hazard HAZ-2026-0042 on Desktop.');
      },
    },
    {
      step: 2,
      phaseNumber: '03',
      title: 'HSE Officer Classification & 5×5 Risk Rating',
      actor: 'Fatima Al-Kuwari (HSE Officer • EMP-1014)',
      device: 'Desktop Risk & Compliance Engine',
      deviceIcon: Monitor,
      summary: 'HSE Officer reviews high-resolution photo evidence, performs 5x5 risk evaluation (Severity 4 x Likelihood 4 = High Risk 16), and assigns an investigator.',
      qatarRef: 'Qatar Statutory Risk Matrix & Hierarchy of Control Guidelines',
      status: hazard?.assignedInvestigator ? 'Completed' : 'Ready to Run',
      actionTitle: '3. Execute HSE Risk Classification',
      runAction: () => {
        switchUser('USR-014'); // Fatima Al-Kuwari
        runScenarioStep(2);
        setActiveDesktopModule('Hazard Reporting');
        setSelectedRecordRef('HAZ-2026-0042');
        setViewMode('both');
        setIsScenarioModalOpen(false);
        addToast('success', 'Client Flow Step 3', 'HSE Officer classified hazard as High Risk & assigned investigator.');
      },
    },
    {
      step: 3,
      phaseNumber: '04',
      title: 'Formal Root Cause Analysis (5-Whys & Fishbone)',
      actor: 'Omar Al-Sulaiti (HSE Investigator • EMP-1022)',
      device: 'Desktop Investigation Management',
      deviceIcon: Monitor,
      summary: 'Investigator records incident timeline, witness statements, 5-Whys root cause, and Ishikawa diagram under INV-2026-0042, mandating structural engineered covers.',
      qatarRef: 'Root Cause Investigation Standards • ISO 45001 Clause 10.2',
      status: hazard?.status === 'Action Pending' || hazard?.status === 'Closed' ? 'Completed' : 'Ready to Run',
      actionTitle: '4. Execute Root Cause Investigation',
      runAction: () => {
        switchUser('USR-015'); // Omar Al-Sulaiti
        runScenarioStep(3);
        setActiveDesktopModule('Investigation Management');
        setSelectedRecordRef('INV-2026-0042');
        setViewMode('both');
        setIsScenarioModalOpen(false);
        addToast('success', 'Client Flow Step 4', 'Investigation INV-2026-0042 recorded with 5-Whys.');
      },
    },
    {
      step: 4,
      phaseNumber: '05',
      title: 'Supervisor Physical Rectification & Verification Photo',
      actor: 'Waleed Al-Ghanim (Action Owner • EMP-1036)',
      device: 'Mobile Tasks & Desktop CAPA',
      deviceIcon: Smartphone,
      summary: 'Waleed bolts engineered structural steel grating over the penetration, conducts torque load testing, and uploads rectified photographic proof under CAPA-2026-0095.',
      qatarRef: 'Permanent Void Protection & Qatar Civil Defence Technical Requirement',
      status: capa?.status === 'Submitted for Verification' || capa?.status === 'Verified' || capa?.status === 'Closed' ? 'Completed' : 'Ready to Run',
      actionTitle: '5. Execute CAPA Physical Rectification',
      runAction: () => {
        switchUser('USR-036'); // Waleed Al-Ghanim
        runScenarioStep(4);
        setActiveDesktopModule('Corrective and Preventive Actions');
        setSelectedRecordRef('CAPA-2026-0095');
        setViewMode('both');
        setIsScenarioModalOpen(false);
        addToast('success', 'Client Flow Step 5', 'CAPA-2026-0095 mitigation photo submitted for sign-off.');
      },
    },
    {
      step: 5,
      phaseNumber: '06',
      title: 'Executive Sign-off, Audit Trail & PDF Report Export',
      actor: 'Nasser Al-Khelaifi (Senior HSE Manager • EMP-1019)',
      device: 'Desktop Executive Control Centre',
      deviceIcon: Monitor,
      summary: 'Senior HSE Manager inspects completion proof, signs off statutory closure certificate, updates Executive Dashboard KPIs, and generates an immutable audit log.',
      qatarRef: 'Official Al Meezan Legal Audit Registry & Qatar Labour Law Compliance Sign-off',
      status: hazard?.status === 'Closed' ? 'Completed' : 'Ready to Run',
      actionTitle: '6. Execute Final Closure & Sign-Off',
      runAction: () => {
        switchUser('USR-019'); // Nasser Al-Khelaifi
        runScenarioStep(6);
        setActiveDesktopModule('Hazard Reporting');
        setSelectedRecordRef('HAZ-2026-0042');
        setViewMode('both');
        setIsScenarioModalOpen(false);
        addToast('success', 'Client Flow Step 6', 'Hazard HAZ-2026-0042 closed. Audit trail updated.');
      },
    },
  ];

  if (!isScenarioModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in select-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-5xl w-full overflow-hidden text-gray-800 flex flex-col max-h-[92vh] animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#073B2F] p-5 sm:p-6 text-white relative flex-shrink-0">
          <button
            onClick={() => setIsScenarioModalOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-[#DDF5EA] uppercase tracking-wider font-mono">
              Client Demonstration Flow • State of Qatar
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5">
                <Shield className="w-6 h-6 text-[#20A887]" />
                <span>Complete End-to-End Safety Demonstration Flow</span>
              </h2>
              <p className="text-xs text-[#DDF5EA]/90 mt-1 max-w-2xl leading-relaxed">
                Step-by-step showcase illustrating mobile speech reporting, real-time shared state, desktop risk classification, root cause investigation, supervisor CAPA rectification, and executive sign-off.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => {
                  resetAllData();
                  addToast('info', 'Demo Reset', 'Demonstration dataset reset to initial state.');
                }}
                className="px-3 py-1.5 bg-black/30 hover:bg-black/50 text-white rounded-lg text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
                title="Reset scenario data to initial state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Ribbon */}
        <div className="bg-[#F4F7F5] border-b border-gray-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-medium">Active Case Reference:</span>
            <span className="font-mono font-bold text-[#087F5B] bg-emerald-100/80 px-2.5 py-0.5 rounded border border-emerald-300">
              HAZ-2026-0042
            </span>
            <span className="text-gray-500 font-medium">CAPA Reference:</span>
            <span className="font-mono font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded border border-amber-300">
              CAPA-2026-0095
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-500">Case Status:</span>
            <Badge variant={hazard?.status === 'Closed' ? 'low' : 'high'} size="sm">
              {hazard?.status || 'Submitted'}
            </Badge>
          </div>
        </div>

        {/* Content: Flow Milestones Stepper */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 bg-gray-50/50">
          {flowMilestones.map((m) => {
            const isCompleted = m.status === 'Completed';
            const DeviceIcon = m.deviceIcon;

            return (
              <div
                key={m.step}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-white border-emerald-200 shadow-xs'
                    : 'bg-white border-gray-200 shadow-sm hover:border-[#087F5B]/50'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Info */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#073B2F] text-white shadow-sm'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : m.phaseNumber}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider font-mono">
                          Phase {m.phaseNumber}
                        </span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-600">
                          <DeviceIcon className="w-3.5 h-3.5 text-[#20A887]" />
                          <span>{m.device}</span>
                        </div>
                        <Badge variant={isCompleted ? 'low' : 'neutral'} size="sm">
                          {m.status}
                        </Badge>
                      </div>

                      <h4 className="text-sm font-bold text-gray-900 leading-snug">
                        {m.title}
                      </h4>

                      <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                        {m.summary}
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px]">
                        <span className="font-semibold text-gray-800 flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#087F5B]" />
                          <span>{m.actor}</span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[#087F5B] font-mono flex items-center gap-1">
                          <Scale className="w-3 h-3" />
                          <span>{m.qatarRef}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Execution Button */}
                  <div className="flex items-center gap-2 lg:flex-col lg:items-end flex-shrink-0">
                    <button
                      onClick={m.runAction}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 ${
                        isCompleted
                          ? 'bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-900 border border-gray-200'
                          : 'bg-[#087F5B] hover:bg-[#073B2F] text-white shadow-md'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{m.actionTitle}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs flex-shrink-0">
          <span className="text-gray-500">
            Click any step to auto-execute that workflow transition and display the synchronized screens live to the client.
          </span>
          <button
            onClick={() => setIsScenarioModalOpen(false)}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
          >
            Close Flow Guide
          </button>
        </div>
      </div>
    </div>
  );
};