import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import { ArrowLeft, Send, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { IncidentCategory, SeverityLevel } from '../../types';

export const MobileReportIncident: React.FC = () => {
  const { currentUser, setMobileScreen, projects, locations, createIncident, addToast, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  const [incidentType, setIncidentType] = useState<IncidentCategory>('First-aid case');
  const [project, setProject] = useState(currentUser.project || projects[0]);
  const [location, setLocation] = useState('Work Area A');
  const [severity, setSeverity] = useState<SeverityLevel>('Medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [immediateActions, setImmediateActions] = useState('');
  const [injuryDetails, setInjuryDetails] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      addToast('error', 'Validation Error', 'Incident title and description are required.');
      return;
    }

    const created = createIncident({
      title,
      incidentType,
      project,
      location,
      department: currentUser.department || 'Site Operations',
      reportedBy: currentUser.name,
      reporterEmployeeId: currentUser.employeeId,
      personsInvolved: [currentUser.name],
      severity,
      potentialSeverity: severity === 'Low' ? 'Medium' : 'Critical',
      description,
      immediateActions: immediateActions || 'Administered first aid and notified supervisor.',
      injuryDetails,
      requiresInvestigation: severity === 'High' || severity === 'Critical',
      status: 'Reported',
    });

    setSubmittedRef(created.reference);
  };

  if (submittedRef) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Incident Registered</h3>
        <p className="text-xs text-gray-500 mt-1">Formal Reference:</p>
        <div className="mt-2 px-4 py-2 bg-red-50 border border-red-300 rounded-lg font-mono font-bold text-sm text-red-800">
          {submittedRef}
        </div>
        <p className="text-[11px] text-gray-600 mt-3">
          Qatar Labour Law No. 14 of 2004 compliance notification protocol initiated.
        </p>
        <div className="w-full space-y-2 mt-6">
          <button
            onClick={() => {
              setActiveDesktopModule('Incident Management');
              setSelectedRecordRef(submittedRef);
              setMobileScreen('reports');
            }}
            className="w-full py-2.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-bold text-xs rounded-xl shadow"
          >
            Open in Desktop Incidents
          </button>
          <button
            onClick={() => {
              setSubmittedRef(null);
              setMobileScreen('home');
            }}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7F5] overflow-y-auto pb-16 text-xs">
      <div className="bg-[#073B2F] text-white px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-[#087F5B]/30">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-lg hover:bg-white/10 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="font-bold text-xs">Report Incident / Injury</span>
        <div className="w-8"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3 flex-1">
        <div>
          <label className="block text-gray-700 font-bold mb-1">
            Incident Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Superficial hand cut during stud cutting"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Incident Type</label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value as IncidentCategory)}
              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none truncate"
            >
              <option value="First-aid case">First-aid case</option>
              <option value="Medical treatment case">Medical treatment case</option>
              <option value="Lost-time incident">Lost-time incident</option>
              <option value="Occupational illness">Occupational illness</option>
              <option value="Property damage">Property damage</option>
              <option value="Equipment damage">Equipment damage</option>
              <option value="Fire">Fire</option>
              <option value="Environmental incident">Environmental incident</option>
              <option value="Chemical spill">Chemical spill</option>
              <option value="Vehicle incident">Vehicle incident</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
            >
              <option value="Low">Low (First Aid)</option>
              <option value="Medium">Medium (Medical)</option>
              <option value="High">High (LTI)</option>
              <option value="Critical">Critical (Severe)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none truncate"
            >
              {projects.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">
            Description of Event <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What happened? Sequence of events, equipment involved..."
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Injury / Illness Details (if applicable)</label>
          <input
            type="text"
            value={injuryDetails}
            onChange={(e) => setInjuryDetails(e.target.value)}
            placeholder="e.g. 2cm cut to index finger, treated with antiseptic dressing"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Immediate Actions Taken</label>
          <input
            type="text"
            value={immediateActions}
            onChange={(e) => setImmediateActions(e.target.value)}
            placeholder="e.g. Escorted to site clinic; work halted"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Incident</span>
          </button>
        </div>
      </form>
    </div>
  );
};
