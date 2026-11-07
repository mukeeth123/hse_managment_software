import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { Leaf, Search, Filter, Download, Droplet, Zap, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Badge } from '../../common/Badge';

export const EnvironmentalManagementModule: React.FC = () => {
  const { incidents, legalRegister } = useHSE();
  const [activeTab, setActiveTab] = useState<'waste' | 'chemicals' | 'metrics'>('waste');

  const envIncidents = incidents.filter((i) => i.incidentType === 'Environmental incident' || i.incidentType === 'Chemical spill');

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Environmental Management & Sustainability</h2>
            <Badge variant="low" size="sm">MECC Compliant</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Qatar Law No. 30 of 2002 environmental permits, hazardous chemical registers, secondary containment & waste tracking
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">Waste Diverted from Landfill</span>
          <span className="text-2xl font-extrabold text-[#087F5B]">74.2%</span>
          <span className="text-[10px] text-gray-400 block mt-1">Qatar Public Hygiene Law 18/2017</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">Registered Chemicals (GHS)</span>
          <span className="text-2xl font-extrabold text-gray-900">38 SDS</span>
          <span className="text-[10px] text-gray-400 block mt-1">Law No. 9/1987 Directives</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">Environmental Incidents (YTD)</span>
          <span className="text-2xl font-extrabold text-emerald-700">{envIncidents.length} contained</span>
          <span className="text-[10px] text-gray-400 block mt-1">Zero uncontained spills</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-[#E3EAE6] shadow-sm">
          <span className="text-[11px] text-gray-500 block">MECC Environmental Permit</span>
          <span className="text-2xl font-extrabold text-[#073B2F]">Active</span>
          <span className="text-[10px] text-gray-400 block mt-1">Permit #EP-QAT-2026-991</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3EAE6] bg-white px-4 rounded-t-xl gap-2 font-bold">
        <button
          onClick={() => setActiveTab('waste')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'waste' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          <span>Hazardous & Solid Waste Streams</span>
        </button>
        <button
          onClick={() => setActiveTab('chemicals')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'chemicals' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Droplet className="w-4 h-4" />
          <span>Chemicals & Secondary Containment</span>
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`py-3 px-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'metrics' ? 'border-[#087F5B] text-[#073B2F]' : 'border-transparent text-gray-500'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Water, Diesel & Energy Monitoring</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-b-xl border border-t-0 border-[#E3EAE6] shadow-sm p-4">
        {activeTab === 'waste' && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-xs">Hazardous & Non-Hazardous Waste Manifest Log</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
                  <tr>
                    <th className="py-2 px-3">Manifest ID</th>
                    <th className="py-2 px-3">Waste Stream</th>
                    <th className="py-2 px-3">Classification</th>
                    <th className="py-2 px-3">Quantity</th>
                    <th className="py-2 px-3">Approved Carrier</th>
                    <th className="py-2 px-3">Disposal Site</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: 'WST-2026-081', stream: 'Oily Rags & Sorbents', class: 'Hazardous Waste', qty: '450 kg', carrier: 'Qatar Environmental Recycling W.L.L.', dest: 'Mesaieed Hazardous Facility', status: 'Disposed' },
                    { id: 'WST-2026-080', stream: 'Waste Hydraulic & Engine Oil', class: 'Hazardous Liquid', qty: '1,200 L', carrier: 'Gulf Hydrocarbon Management', dest: 'Lube Oil Re-refining Plant', status: 'Disposed' },
                    { id: 'WST-2026-079', stream: 'Structural Scrap Steel', class: 'Recyclable Metal', qty: '8.4 tonnes', carrier: 'Doha Scrap Logistics', dest: 'Qatar Steel Smelter', status: 'Recycled' },
                    { id: 'WST-2026-078', stream: 'Concrete Rubble & Masonry', class: 'Inert Aggregate', qty: '32 tonnes', carrier: 'Site Transport Fleet', dest: 'Al-Attiyah Crushing Plant', status: 'Crushed & Reused' },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#073B2F]">{row.id}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">{row.stream}</td>
                      <td className="py-2.5 px-3 text-amber-800 font-medium">{row.class}</td>
                      <td className="py-2.5 px-3 font-bold text-gray-800">{row.qty}</td>
                      <td className="py-2.5 px-3 text-gray-600">{row.carrier}</td>
                      <td className="py-2.5 px-3 text-gray-600">{row.dest}</td>
                      <td className="py-2.5 px-3">
                        <Badge variant="closed" size="sm">{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'chemicals' && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-xs">GHS Chemical Inventory & Secondary Bunding Audits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'Ultra-Clean Hydrocarbon Solvent', use: 'Mechanical Degreasing', ghs: 'Flammable Liquid (Cat 2), Skin Irritant', bunding: '110% Steel Drip Tray', sds: 'SDS-GHS-001', location: 'Storage Area 01' },
                { name: 'Epoxy Grout Resin Part A & B', use: 'Baseplate Precision Grouting', ghs: 'Corrosive (Cat 1B), Aquatic Chronic 2', bunding: 'Concrete Chemical Bund Room', sds: 'SDS-GHS-004', location: 'Building Zone 01' },
                { name: 'Diesel Fuel (Ultra-Low Sulfur)', use: 'Heavy Equipment & Generators', ghs: 'Flammable Liquid, Aspiration Hazard', bunding: 'Engineered 15,000L Steel Double Wall', sds: 'SDS-GHS-012', location: 'Equipment Area 01' },
                { name: 'Muriatic Acid 10% Descaler', use: 'Chilled Water Pipe Descaling', ghs: 'Skin Corrosion 1A, Eye Damage 1', bunding: 'Polyethylene Secondary Containment Tub', sds: 'SDS-GHS-018', location: 'Maintenance Area 01' },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-[#F4F7F5] rounded-xl border border-gray-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-xs">{c.name}</span>
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border">{c.sds}</span>
                  </div>
                  <div className="text-[11px] text-gray-600">Application: {c.use} • Location: {c.location}</div>
                  <div className="text-[10px] text-red-700 bg-red-50 p-1.5 rounded border border-red-200">
                    <strong>GHS Classification:</strong> {c.ghs}
                  </div>
                  <div className="text-[10px] text-emerald-800">
                    <strong>Spill Safeguard:</strong> {c.bunding}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
              <span className="font-bold text-blue-900 block">Potable & Non-Potable Water</span>
              <div className="text-xl font-extrabold text-blue-950">1,420 m³</div>
              <p className="text-[10px] text-blue-800">Dust suppression recycled treated sewage effluent (TSE): 68%</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <span className="font-bold text-amber-900 block">Diesel Generator Efficiency</span>
              <div className="text-xl font-extrabold text-amber-950">14,200 Litres</div>
              <p className="text-[10px] text-amber-800">Specific fuel consumption: 0.26 L/kWh</p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="font-bold text-emerald-900 block">Grid Power Interconnection</span>
              <div className="text-xl font-extrabold text-emerald-950">54,000 kWh</div>
              <p className="text-[10px] text-emerald-800">Kahramaa low-carbon grid supply on Demo Site 01</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
