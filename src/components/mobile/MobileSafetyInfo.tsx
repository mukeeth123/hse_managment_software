import React from 'react';
import { useHSE } from '../../context/HSEContext';
import { ArrowLeft, PhoneCall, ShieldCheck, ThermometerSun, AlertTriangle, FileText } from 'lucide-react';

export const MobileSafetyInfo: React.FC = () => {
  const { setMobileScreen } = useHSE();

  const emergencyContacts = [
    { title: 'Qatar National Emergency (Police/Civil Defence/Ambulance)', number: '999', note: 'Official State Hotline' },
    { title: 'Hamad Medical Corporation (HMC) Direct', number: '16000', note: 'Medical Urgent Information' },
    { title: 'Site Emergency Response Team (Demo Lead)', number: '+974 7734 5605', note: 'Majed Al-Nuaimi (ERT Lead)' },
    { title: 'Site On-Site Medical Clinic', number: '+974 7734 5604', note: 'Dr. Mariam Al-Hajri (MoPH Nurse)' },
    { title: 'Ministry of Labour (MoL) Labour Hotline', number: '16008', note: 'Statutory Notification Desk' },
    { title: 'Ministry of Environment & Climate Change (MECC)', number: '184', note: 'Chemical & Spill Incidents' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7F5] overflow-y-auto pb-16 text-xs">
      <div className="bg-[#073B2F] text-white px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-[#087F5B]/30">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-lg hover:bg-white/10 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="font-bold text-xs">Safety Info & Emergency</span>
        <div className="w-8"></div>
      </div>

      <div className="p-3.5 space-y-4 flex-1">
        {/* Stop Work Authority Card */}
        <div className="bg-[#073B2F] text-white p-3.5 rounded-xl border border-[#20A887]/30 shadow">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-5 h-5 text-[#20A887]" />
            <h4 className="font-bold text-xs">Universal Stop Work Authority</h4>
          </div>
          <p className="text-[10px] text-[#DDF5EA] leading-relaxed">
            Every worker, contractor, and supervisor in this organisation has the absolute right and statutory duty to halt any work activity immediately if an unsafe condition or danger arises. No retribution will ever occur.
          </p>
        </div>

        {/* Qatar Heat Stress Statutory Rules Box */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
            <ThermometerSun className="w-4 h-4 text-amber-600" />
            <span>Qatar MD No. 17 of 2021 — Heat Stress Mandate</span>
          </div>
          <div className="space-y-1.5 text-[10px] text-amber-900 leading-normal">
            <p className="bg-white/80 p-1.5 rounded border border-amber-200">
              <strong>Seasonal Prohibition:</strong> All outdoor work in unshaded/inadequately ventilated spaces is prohibited between <strong>10:00 and 15:30</strong> from <strong>1 June to 15 September</strong>.
            </p>
            <p className="bg-white/80 p-1.5 rounded border border-amber-200">
              <strong>WBGT Threshold:</strong> All outdoor work must immediately stop regardless of time or calendar date if the Wet Bulb Globe Temperature (WBGT) exceeds <strong>32.1°C</strong>.
            </p>
            <p className="bg-white/80 p-1.5 rounded border border-amber-200">
              <strong>Mandatory Controls:</strong> Chilled potable water (15–20°C), air-conditioned rest shelters, electrolyte hydration, and buddy-system monitoring.
            </p>
          </div>
        </div>

        {/* Emergency Contacts List */}
        <div>
          <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider mb-2">
            Emergency Contacts (Qatar & Site)
          </h4>
          <div className="space-y-2">
            {emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between"
              >
                <div>
                  <h5 className="font-bold text-gray-900 text-[11px] leading-tight">{contact.title}</h5>
                  <span className="text-[10px] text-gray-500 font-medium">{contact.note}</span>
                </div>
                <a
                  href={`tel:${contact.number.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs rounded-lg shadow flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" /> {contact.number}
                </a>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-2 text-center">
            Sample contact numbers are for demonstration simulation purposes.
          </p>
        </div>
      </div>
    </div>
  );
};
