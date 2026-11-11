import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import { ArrowLeft, Send, Eye, CheckCircle2, Camera, Image as ImageIcon, X } from 'lucide-react';
import { NearMissCategory, SeverityLevel } from '../../types';
import { PHOTO_1_1, PHOTO_1_2, PHOTO_1_3, PHOTO_1_4, PHOTO_1_5, PHOTO_1_6, PHOTO_1_7, PHOTO_1_8 } from '../../data/imageAssets';

export const MobileReportNearMiss: React.FC = () => {
  const { currentUser, setMobileScreen, projects, locations, createNearMiss, addToast, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  const [category, setCategory] = useState<NearMissCategory>('Dropped object');
  const [project, setProject] = useState(currentUser.project || projects[0]);
  const [location, setLocation] = useState('Work Area A');
  const [severity, setSeverity] = useState<SeverityLevel>('High');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [potentialOutcome, setPotentialOutcome] = useState('');
  const [immediateActionTaken, setImmediateActionTaken] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Evidence Photo State
  const [imageUrl, setImageUrl] = useState<string | null>(PHOTO_1_6);
  const [imageCaption, setImageCaption] = useState('Evidence: Staircase and work at height barricade check');

  const photoPresets = [
    { title: 'Stairway Restriction', url: PHOTO_1_6, caption: 'Stairway barrier with pedestrian access prohibited warning sign' },
    { title: 'Electrical Panel Check', url: PHOTO_1_8, caption: 'Electrical power supply panel inspection with high-voltage danger sign' },
    { title: 'Safety ID Badge', url: PHOTO_1_1, caption: 'Site Safety Services ID credential and pre-task inspection verification' },
    { title: 'Activity Register', url: PHOTO_1_2, caption: 'Official field observation sequence log and register entry' },
    { title: 'Ceiling Smoke Detector', url: PHOTO_1_5, caption: 'Ceiling plenum smoke detector head inspection in False ceiling' },
    { title: 'Technician Credential', url: PHOTO_1_3, caption: 'Verified SSSS technician credential and safety barcode' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      addToast('error', 'Validation Error', 'Title and description are required.');
      return;
    }

    const created = createNearMiss({
      title,
      category,
      project,
      location,
      reportedBy: currentUser.name,
      reporterEmployeeId: currentUser.employeeId,
      severity,
      description,
      potentialOutcome: potentialOutcome || 'Potential serious injury had personnel been in drop path.',
      immediateActionTaken: immediateActionTaken || 'Inspected perimeter barricade and notified foreman.',
      status: 'Reported',
      assignedReviewer: 'Fatima Al-Kuwari',
      imageUrl: imageUrl || undefined,
      imageCaption: imageCaption || undefined,
    });

    setSubmittedRef(created.reference);
  };

  if (submittedRef) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Near Miss Logged</h3>
        <p className="text-xs text-gray-500 mt-1">Reference Number:</p>
        <div className="mt-2 px-4 py-2 bg-blue-50 border border-blue-300 rounded-lg font-mono font-bold text-sm text-blue-800">
          {submittedRef}
        </div>
        <p className="text-[11px] text-gray-600 mt-3">
          Near-miss observations prevent future major incidents. Thank you for exercising safety vigilance.
        </p>
        <div className="w-full space-y-2 mt-6">
          <button
            onClick={() => {
              setActiveDesktopModule('Near Miss Management');
              setSelectedRecordRef(submittedRef);
              setMobileScreen('reports');
            }}
            className="w-full py-2.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-bold text-xs rounded-xl shadow"
          >
            View in Desktop Near Miss Register
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
        <span className="font-bold text-xs">Report Near Miss</span>
        <div className="w-8"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3 flex-1">
        <div>
          <label className="block text-gray-700 font-bold mb-1">
            Observation Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Spanner slipped from scaffold handrail"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NearMissCategory)}
              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none truncate"
            >
              <option value="Dropped object">Dropped object</option>
              <option value="Unsafe movement">Unsafe movement</option>
              <option value="Equipment malfunction">Equipment malfunction</option>
              <option value="Vehicle near miss">Vehicle near miss</option>
              <option value="Electrical near miss">Electrical near miss</option>
              <option value="Fire or smoke observation">Fire or smoke</option>
              <option value="Falling material">Falling material</option>
              <option value="Unsafe work practice">Unsafe work practice</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Potential Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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
            What happened? <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the near-hit event..."
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Potential Worst Outcome</label>
          <input
            type="text"
            value={potentialOutcome}
            onChange={(e) => setPotentialOutcome(e.target.value)}
            placeholder="e.g. Could have struck ground worker had they passed 2 seconds earlier"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Immediate Action Taken</label>
          <input
            type="text"
            value={immediateActionTaken}
            onChange={(e) => setImmediateActionTaken(e.target.value)}
            placeholder="e.g. Retrieved tool, verified exclusion barrier"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        {/* Photo Attachment Section */}
        <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>Evidence Photo (photo_1 presets)</span>
            </span>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            )}
          </div>

          {imageUrl ? (
            <div className="space-y-1.5">
              <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-black/5 h-28 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Near Miss preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="text"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Caption for near miss photo..."
                className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] outline-none"
              />
            </div>
          ) : (
            <div className="p-3 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 text-[11px]">
              No photo selected. Pick a worksite photo below:
            </div>
          )}

          {/* Quick Presets */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 block mb-1">Select Worksite Photo:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {photoPresets.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => {
                    setImageUrl(p.url);
                    setImageCaption(p.caption);
                  }}
                  className={`p-1 rounded-lg border text-left transition-all ${
                    imageUrl === p.url
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <img src={p.url} alt={p.title} className="w-full h-10 object-cover rounded mb-1 bg-white" />
                  <span className="text-[9px] font-bold text-gray-700 block truncate">{p.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Near Miss Report</span>
          </button>
        </div>
      </form>
    </div>
  );
};
