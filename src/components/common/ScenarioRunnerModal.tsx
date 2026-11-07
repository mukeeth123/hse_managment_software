import React from 'react';
import { useHSE } from '../../context/HSEContext';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { CheckCircle2, ArrowRight, Play, RotateCcw, AlertTriangle, ShieldCheck, UserCheck } from 'lucide-react';

export const ScenarioRunnerModal: React.FC = () => {
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
  } = useHSE();

  const hazard = hazards.find((h) => h.reference === 'HAZ-2026-0042');
  const capa = capas.find((c) => c.reference === 'CAPA-2026-0095');

  const steps = [
    {
      step: 0,
      title: 'Worker Submits Hazard via Mobile App',
      role: 'Worker (Ahmed Hassan, EMP-1045)',
      description: 'Ahmed Hassan spots an uncovered 1.2m x 0.9m floor opening on Level 2 in Work Area A, places warning tape, and submits mobile report HAZ-2026-0042.',
      status: hazard ? 'Completed' : 'Pending',
      actionLabel: 'Switch to Ahmed Hassan (Mobile)',
      onAction: () => {
        switchUser('USR-001'); // Ahmed Hassan
        setIsScenarioModalOpen(false);
      },
    },
    {
      step: 1,
      title: 'Supervisor Reviews Hazard in Desktop Workspace',
      role: 'Site Supervisor (Tariq Al-Mansoor)',
      description: 'Supervisor logs in to Desktop HSE Control Centre, inspects HAZ-2026-0042, confirms fall risk, and requests HSE formal classification.',
      status: hazard?.status !== 'Submitted' ? 'Completed' : 'Pending',
      actionLabel: 'Execute Step 1: Supervisor Review',
      onAction: () => {
        switchUser('USR-008'); // Tariq Al-Mansoor
        runScenarioStep(1);
        setActiveDesktopModule('Hazard Reporting');
        setSelectedRecordRef('HAZ-2026-0042');
      },
    },
    {
      step: 2,
      title: 'HSE Officer Classifies & Assigns Investigator',
      role: 'HSE Officer (Fatima Al-Kuwari)',
      description: 'HSE Officer reviews the report, assigns High severity rating, and assigns HSE Investigator Omar Al-Sulaiti to lead the investigation.',
      status: hazard?.assignedInvestigator ? 'Completed' : 'Pending',
      actionLabel: 'Execute Step 2: HSE Classification',
      onAction: () => {
        switchUser('USR-014'); // Fatima Al-Kuwari
        runScenarioStep(2);
        setActiveDesktopModule('Hazard Reporting');
        setSelectedRecordRef('HAZ-2026-0042');
      },
    },
    {
      step: 3,
      title: 'Investigator Records Findings, 5-Whys & Root Cause',
      role: 'HSE Investigator (Omar Al-Sulaiti)',
      description: 'Investigator completes timeline, witness statements, 5-Whys, fishbone diagram and submits recommendations to install engineered grates.',
      status: hazard?.status === 'Action Pending' || hazard?.status === 'Closed' ? 'Completed' : 'Pending',
      actionLabel: 'Execute Step 3: Record Investigation',
      onAction: () => {
        switchUser('USR-015'); // Omar Al-Sulaiti
        runScenarioStep(3);
        setActiveDesktopModule('Investigation Management');
        setSelectedRecordRef('INV-2026-0042');
      },
    },
    {
      step: 4,
      title: 'Action Owner Updates Progress & Attaches Evidence',
      role: 'Corrective Action Owner (Waleed Al-Ghanim)',
      description: 'Waleed bolts welded heavy-duty steel safety grates over the opening, completes load testing, and submits photographic evidence for verification.',
      status: capa?.status === 'Submitted for Verification' || capa?.status === 'Verified' || capa?.status === 'Closed' ? 'Completed' : 'Pending',
      actionLabel: 'Execute Step 4: Submit CAPA Evidence',
      onAction: () => {
        switchUser('USR-036'); // Waleed Al-Ghanim
        runScenarioStep(4);
        setActiveDesktopModule('Corrective and Preventive Actions');
        setSelectedRecordRef('CAPA-2026-0095');
      },
    },
    {
      step: 5,
      title: 'CAPA Verifier Reviews & Approves Mitigation',
      role: 'CAPA Verifier (Khalid Al-Nuaimi)',
      description: 'CAPA Verifier physically inspects the installed grating on Level 2, reviews anchor torque test certificate, and approves verification.',
      status: capa?.status === 'Verified' || capa?.status === 'Closed' ? 'Completed' : 'Pending',
      actionLabel: 'Execute Step 5: Verify & Approve',
      onAction: () => {
        switchUser('USR-028'); // Khalid Al-Nuaimi
        runScenarioStep(5);
        setActiveDesktopModule('Corrective and Preventive Actions');
        setSelectedRecordRef('CAPA-2026-0095');
      },
    },
    {
      step: 6,
      title: 'Senior HSE Manager Formally Closes the Case',
      role: 'Senior HSE Manager (Nasser Al-Khelaifi)',
      description: 'HSE Manager confirms all actions are verified, closes hazard HAZ-2026-0042. Dashboard KPIs update, audit trail logs event, case is closed.',
      status: hazard?.status === 'Closed' ? 'Completed' : 'Pending',
      actionLabel: 'Execute Step 6: Close Hazard Case',
      onAction: () => {
        switchUser('USR-019'); // Nasser Al-Khelaifi
        runScenarioStep(6);
        setActiveDesktopModule('Hazard Reporting');
        setSelectedRecordRef('HAZ-2026-0042');
      },
    },
  ];

  return (
    <Modal
      isOpen={isScenarioModalOpen}
      onClose={() => setIsScenarioModalOpen(false)}
      title="End-to-End Demonstration Scenario Walkthrough"
      subtitle="Interactive verification of connected workflow: Ahmed Hassan HAZ-2026-0042 (Work Area A)"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Scenario Overview Box */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-emerald-900">
              Live Connected Demonstration Case: Ref HAZ-2026-0042
            </h4>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              This end-to-end scenario illustrates seamless data flow between Mobile and Desktop workspaces, RBAC role-shifting, investigation analysis, CAPA verification, audit logs, and dashboard metric updates using shared browser localStorage.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs bg-white text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-300 font-medium">
                Current Status: <strong>{hazard?.status || 'Submitted'}</strong>
              </span>
              <span className="text-xs bg-white text-emerald-900 px-2.5 py-1 rounded-md border border-emerald-300 font-medium">
                CAPA Ref: <strong>{capa?.reference} ({capa?.status})</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="space-y-3">
          {steps.map((s, idx) => {
            const isCurrent = (scenarioStep === s.step) || (s.step === 0 && hazard?.status === 'Submitted');
            const isDone = s.status === 'Completed';

            return (
              <div
                key={s.step}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-[#087F5B] bg-[#F4F7F5] shadow-sm ring-1 ring-[#087F5B]/30'
                    : isDone
                    ? 'border-gray-200 bg-white opacity-90'
                    : 'border-gray-200 bg-gray-50/60 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-[#073B2F] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="text-sm font-bold text-gray-900">{s.title}</h5>
                        <Badge variant={isDone ? 'low' : isCurrent ? 'underReview' : 'neutral'} size="sm">
                          {s.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium text-emerald-800 mt-0.5 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" /> {s.role}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{s.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={s.onAction}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors flex-shrink-0 ${
                      isDone
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        : isCurrent
                        ? 'bg-[#073B2F] hover:bg-[#092B24] text-white shadow-sm'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    {s.actionLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs text-gray-500">
          <span>Click any step to auto-execute that role transition and navigate to the relevant module.</span>
          <button
            onClick={() => setIsScenarioModalOpen(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
          >
            Close Walkthrough
          </button>
        </div>
      </div>
    </Modal>
  );
};
