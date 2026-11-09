import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  Mic,
  MicOff,
  Camera,
  ArrowLeft,
  Send,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Upload,
  ZoomIn,
  Trash2,
  Volume2,
  ChevronDown,
} from 'lucide-react';
import { HazardCategory, SeverityLevel } from '../../types';
import { PhotoViewerModal } from '../common/PhotoViewerModal';
import {
  IMAGE_FLOOR_OPENING,
  IMAGE_SCAFFOLD_DEFECT,
  IMAGE_HEAT_STRESS,
  IMAGE_CHEMICAL_LEAK,
  IMAGE_ELECTRICAL_CABLE,
  getSafeImageUrl,
  getFallbackHazardImage,
} from '../../data/imageAssets';

export const MobileReportHazard: React.FC = () => {
  const {
    currentUser,
    setMobileScreen,
    projects,
    locations,
    createHazard,
    addToast,
    setActiveDesktopModule,
    setSelectedRecordRef,
    setIsScenarioModalOpen,
  } = useHSE();

  // Form State
  const [project, setProject] = useState(currentUser.project || projects[0]);
  const [location, setLocation] = useState('Work Area A');
  const [category, setCategory] = useState<HazardCategory>('Work at height');
  const [severity, setSeverity] = useState<SeverityLevel>('High');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [potentialConsequence, setPotentialConsequence] = useState('');
  const [immediateAction, setImmediateAction] = useState('');

  // Image / Photo State
  const [imageUrl, setImageUrl] = useState<string | null>(IMAGE_FLOOR_OPENING);
  const [imageCaption, setImageCaption] = useState('Evidence: Uncovered slab penetration in Work Area A');
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

  // Voice AI State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isParsingVoice, setIsParsingVoice] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Curated Qatar Safety Photo Presets (100% Offline-Resilient Vector SVGs)
  const photoPresets = [
    {
      title: 'Floor Void Opening',
      url: IMAGE_FLOOR_OPENING,
      caption: 'Mechanical floor penetration without rigid cover on slab level',
    },
    {
      title: 'Scaffold Defect',
      url: IMAGE_SCAFFOLD_DEFECT,
      caption: 'Working platform missing edge toe-board and handrail clamp',
    },
    {
      title: 'Electrical Hazard',
      url: IMAGE_ELECTRICAL_CABLE,
      caption: 'Temporary 380V power distribution cable submerged in water',
    },
    {
      title: 'Chemical Leak',
      url: IMAGE_CHEMICAL_LEAK,
      caption: 'Solvent drum leaking near perimeter drainage channel',
    },
  ];

  // 5 Rich Qatar Safety Speech Scenarios (Mock Data for Client Presentations)
  const mockSpeechScenarios = [
    {
      id: 'floor-opening',
      shortLabel: '1. Floor Opening (HAZ-2026-0042)',
      spokenText:
        'Observed an uncovered mechanical duct opening on Level 2 slab at Building Zone 01 on Site 01. No rigid guardrail or bolted cover. Fall hazard 4.5 meters to basement. I placed red warning barrier tape and warned the steel crew.',
      title: 'Uncovered Floor Opening Without Edge Protection',
      category: 'Work at height' as HazardCategory,
      severity: 'High' as SeverityLevel,
      location: 'Building Zone 01',
      consequence: 'Worker fall from height (4.5m) to lower concrete basement level.',
      immediateAction: 'Placed temporary warning barricade tape and warned nearby civil crew.',
      photoUrl: IMAGE_FLOOR_OPENING,
      photoCaption: 'Evidence: Open mechanical floor penetration on Level 2 slab',
      qatarLaw: 'Qatar Labour Law 14/2004 Art. 100',
    },
    {
      id: 'heat-stress',
      shortLabel: '2. Heat Stress Stoppage (MD 17/2021)',
      spokenText:
        'Reporting outdoor concrete crew working during midday heat ban at 12:15 PM under direct sun. Wet Bulb Globe Temperature is 33.2 degrees Celsius exceeding the statutory 32.1 threshold. Workers exhibit dizziness and severe heat strain without shaded rest.',
      title: 'Midday Outdoor Work Violation during Summer Heat Ban',
      category: 'Occupational Health' as HazardCategory,
      severity: 'Critical' as SeverityLevel,
      location: 'External Work Area 01',
      consequence: 'Heat stroke, severe hyperthermia, and potential medical emergency.',
      immediateAction: 'Issued Stop Work Authority, escorted crew to cooled rest shelter, provided cold electrolytes.',
      photoUrl: IMAGE_HEAT_STRESS,
      photoCaption: 'Evidence: Outdoor unshaded concrete pouring during 10:00–15:30 ban',
      qatarLaw: 'Ministerial Decision No. 17 of 2021 (Heat Stress)',
    },
    {
      id: 'scaffold-defect',
      shortLabel: '3. Scaffold Missing Guardrail',
      spokenText:
        'Mobile scaffold tower on facade elevation is missing intermediate mid-rail and 150mm toe-board. Planks are not clamped with standard couplers. High risk of tool drop onto lower pedestrian walkway.',
      title: 'Missing Scaffold Toe-board and Mid-rail on Facade',
      category: 'Work at height' as HazardCategory,
      severity: 'High' as SeverityLevel,
      location: 'Work Area A',
      consequence: 'Dropped objects causing severe head trauma to ground personnel.',
      immediateAction: 'Barricaded drop exclusion zone below scaffold and tagged scaffold with Red Do Not Use tag.',
      photoUrl: IMAGE_SCAFFOLD_DEFECT,
      photoCaption: 'Evidence: Scaffold staging missing edge protection & toe-board',
      qatarLaw: 'Civil Defence & Work at Height Standard',
    },
    {
      id: 'chemical-spill',
      shortLabel: '4. Chemical Solvent Leak (Law 30/2002)',
      spokenText:
        '200-litre chemical solvent drum punctured by forklift in Storage Area 01. Liquid hydrocarbon leaking onto open ground towards perimeter stormwater ditch. Strong flammable solvent vapors detected.',
      title: 'Hydrocarbon Solvent Leak Near Stormwater Drainage',
      category: 'Chemical exposure' as HazardCategory,
      severity: 'Critical' as SeverityLevel,
      location: 'Storage Area 01',
      consequence: 'Soil contamination and flammable flash fire hazard.',
      immediateAction: 'Deployed hazardous spill absorbent boom, isolated area, and notified Environmental Officer.',
      photoUrl: IMAGE_CHEMICAL_LEAK,
      photoCaption: 'Evidence: Punctured solvent drum leaking liquid onto soil',
      qatarLaw: 'Qatar Environmental Protection Law No. 30 of 2002',
    },
    {
      id: 'electrical-cable',
      shortLabel: '5. Submerged 380V Power Cable',
      spokenText:
        '380-volt heavy plant power distribution cable with cut outer insulation submerged in standing rainwater in Excavation Zone 01. High risk of fatal electric shock to trench workers.',
      title: 'Damaged 380V Cable Submerged in Water Pool',
      category: 'Electrical hazards' as HazardCategory,
      severity: 'Critical' as SeverityLevel,
      location: 'Excavation Zone 01',
      consequence: 'Electrocution, arc flash explosion, and potential worker fatality.',
      immediateAction: 'Emergency trip activated at main distribution board, danger tags installed, area cordoned off.',
      photoUrl: IMAGE_ELECTRICAL_CABLE,
      photoCaption: 'Evidence: Exposed 380V high-voltage cable in standing water',
      qatarLaw: 'Qatar Civil Defence Electrical Precaution Standards',
    },
  ];

  // User Device File Upload via FileReader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setImageCaption(`Field Photo: ${file.name} (Uploaded from device)`);
        addToast('success', 'Photo Attached', 'Worksite photo loaded into hazard report.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Run Animated Speech Scenario with Streaming Text & Speech Audio
  const runMockSpeechScenario = (scenario: typeof mockSpeechScenarios[0]) => {
    setIsRecording(true);
    setVoiceTranscript('Listening... Simulating high-precision field speech input...');

    // Typewriter streaming effect
    const words = scenario.spokenText.split(' ');
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx += 3;
      if (currentIdx >= words.length) {
        clearInterval(interval);
        setVoiceTranscript(scenario.spokenText);
        setIsRecording(false);

        // Populate fields
        setTitle(scenario.title);
        setDescription(scenario.spokenText);
        setCategory(scenario.category);
        setSeverity(scenario.severity);
        setLocation(scenario.location);
        setPotentialConsequence(scenario.consequence);
        setImmediateAction(scenario.immediateAction);
        setImageUrl(scenario.photoUrl);
        setImageCaption(scenario.photoCaption);

        // Speak aloud using SpeechSynthesis
        if ('speechSynthesis' in window) {
          try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(scenario.spokenText);
            utterance.rate = 1.05;
            window.speechSynthesis.speak(utterance);
          } catch (err) {
            console.error('Speech synthesis error', err);
          }
        }

        addToast(
          'success',
          'Voice AI Parsed 100%',
          `Spoken observation transcribed and mapped to ${scenario.qatarLaw}`
        );
      } else {
        setVoiceTranscript(words.slice(0, currentIdx).join(' ') + '...');
      }
    }, 120);
  };

  // Simulated & Browser Speech Recognition Toggle
  const handleToggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        setIsRecording(true);
        setVoiceTranscript('Listening live... Speak in English or Arabic.');

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setVoiceTranscript(text);
          parseSpokenObservation(text);
          setIsRecording(false);
        };

        recognition.onerror = () => {
          runMockSpeechScenario(mockSpeechScenarios[0]);
        };

        recognition.start();
      } catch (e) {
        runMockSpeechScenario(mockSpeechScenarios[0]);
      }
    } else {
      runMockSpeechScenario(mockSpeechScenarios[0]);
    }
  };

  const fallbackSimulatedVoice = () => {
    setTimeout(() => {
      const demoSpeech =
        'Observed an uncovered mechanical floor duct on Level 2 in Work Area A. High fall risk. I placed red warning barricade tape around the penetration.';
      setVoiceTranscript(demoSpeech);
      parseSpokenObservation(demoSpeech);
      setIsRecording(false);
    }, 1400);
  };

  const applyVoicePreset = (presetText: string) => {
    setVoiceTranscript(presetText);
    parseSpokenObservation(presetText);
  };

  const parseSpokenObservation = (text: string) => {
    setIsParsingVoice(true);
    setTimeout(() => {
      if (text.toLowerCase().includes('scaffold')) {
        setTitle('Missing scaffold toe-board on east facade');
        setDescription('Platform working deck lacks standard 150mm toe-board. Danger of hand tool or bolt drop to pedestrian walkway below.');
        setCategory('Work at height');
        setSeverity('High');
        setPotentialConsequence('Object fall resulting in head trauma to personnel below.');
        setImmediateAction('Barricaded drop exclusion zone below scaffold.');
        setImageUrl(IMAGE_SCAFFOLD_DEFECT);
        setImageCaption('Photo Evidence: Scaffold staging missing edge protection');
      } else if (text.toLowerCase().includes('chemical') || text.toLowerCase().includes('leak')) {
        setTitle('Chemical solvent container leaking near drainage');
        setDescription('Observed 200L solvent container with punctured valve leaking liquid onto soil near perimeter stormwater drain.');
        setCategory('Chemical exposure');
        setSeverity('Critical');
        setPotentialConsequence('Soil contamination and toxic vapor exposure.');
        setImmediateAction('Applied spill kit absorbent pads and notified Environmental Officer.');
        setImageUrl(IMAGE_CHEMICAL_LEAK);
        setImageCaption('Photo Evidence: Chemical leak demarcated with absorbent boom');
      } else {
        setTitle('Uncovered floor duct opening without barricades');
        setDescription('During pre-task inspection on Level 2 slab, observed an open 1.2m x 0.9m duct opening without bolted cover or rigid perimeter handrails.');
        setLocation('Work Area A');
        setCategory('Work at height');
        setSeverity('High');
        setPotentialConsequence('Worker fall from height (4.5m) to lower concrete basement level.');
        setImmediateAction('Placed temporary warning barricade tape and warned nearby civil crew.');
        setImageUrl(IMAGE_FLOOR_OPENING);
        setImageCaption('Photo Evidence: Uncovered floor void in Work Area A');
      }

      setIsParsingVoice(false);
      addToast('info', 'AI Voice Observation Parsed', 'Review and edit the extracted hazard fields before submitting.');
    }, 700);
  };

  const speakSummary = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Hazard reported: ${title}. Severity: ${severity}. Location: ${location}.`
      );
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      addToast('info', 'Voice Feedback', `Playback: ${title}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      addToast('error', 'Validation Error', 'Title and description are required.');
      return;
    }

    const created = createHazard({
      title,
      category,
      project,
      location,
      reportedBy: currentUser.name,
      reporterEmployeeId: currentUser.employeeId,
      severity,
      potentialConsequence: potentialConsequence || 'Potential physical trauma or asset impact.',
      immediateAction: immediateAction || 'Demarcated zone and notified area supervisor.',
      status: 'Submitted',
      description,
      imageUrl: imageUrl || undefined,
      imageCaption: imageUrl ? imageCaption : undefined,
      assignedSupervisor: 'Tariq Al-Mansoor',
    });

    setSubmittedRef(created.reference);
  };

  if (submittedRef) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-5 text-center bg-white overflow-y-auto">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-sm font-bold text-gray-900">Hazard Reported Successfully</h3>
        <p className="text-[11px] text-gray-500 mt-0.5">Unique Tracking Reference:</p>
        <div className="mt-1 px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-lg font-mono font-bold text-xs text-emerald-800">
          {submittedRef}
        </div>

        {/* Attached Photo Preview on Submission Card */}
        {imageUrl && (
          <div className="mt-3 w-full rounded-xl overflow-hidden border border-gray-200 relative shadow-xs bg-slate-900">
            <img
              src={getSafeImageUrl(imageUrl, category)}
              alt="Hazard photo"
              className="w-full h-36 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getFallbackHazardImage(category);
              }}
            />
            <button
              onClick={() => setIsPhotoViewerOpen(true)}
              className="absolute top-2 right-2 p-1.5 bg-black/75 hover:bg-black text-white rounded-lg text-[10px] flex items-center gap-1 backdrop-blur-sm shadow"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Inspect Photo</span>
            </button>
            <div className="p-2 bg-gray-50 text-[10px] text-gray-700 font-medium text-left">
              📷 {imageCaption}
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-left w-full mt-3 text-[11px] space-y-1 text-gray-600">
          <div className="flex justify-between">
            <span>Status:</span> <strong className="text-blue-600">Submitted for Review</strong>
          </div>
          <div className="flex justify-between">
            <span>Supervisor:</span> <strong>Tariq Al-Mansoor</strong>
          </div>
          <div className="flex justify-between">
            <span>Location:</span> <strong>{location}</strong>
          </div>
        </div>

        <div className="w-full space-y-2 mt-4">
          <button
            onClick={() => {
              setActiveDesktopModule('Hazard Reporting');
              setSelectedRecordRef(submittedRef);
              setIsScenarioModalOpen(true);
            }}
            className="w-full py-2.5 bg-[#073B2F] hover:bg-[#092B24] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#20A887]" />
            <span>Proceed to Step 2: Show Desktop Review →</span>
          </button>
          <button
            onClick={() => {
              setActiveDesktopModule('Hazard Reporting');
              setSelectedRecordRef(submittedRef);
              setMobileScreen('reports');
            }}
            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-[#073B2F] border border-emerald-300 font-bold text-xs rounded-xl"
          >
            View in Desktop Hazard Register
          </button>
          <button
            onClick={() => {
              setSubmittedRef(null);
              setTitle('');
              setDescription('');
              setMobileScreen('home');
            }}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
          >
            Back to Mobile Home
          </button>
        </div>

        {imageUrl && (
          <PhotoViewerModal
            isOpen={isPhotoViewerOpen}
            onClose={() => setIsPhotoViewerOpen(false)}
            imageUrl={imageUrl}
            title={title || 'Hazard Photo Evidence'}
            caption={imageCaption}
            location={location}
            timestamp={new Date().toISOString().substring(0, 10)}
            reporter={currentUser.name}
            reference={submittedRef}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7F5] overflow-y-auto pb-16 text-xs select-none">
      {/* Mobile Screen Header */}
      <div className="bg-[#073B2F] text-white px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-[#087F5B]/30">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-lg hover:bg-white/10 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="font-bold text-xs">Report Safety Hazard</span>
        <button
          onClick={speakSummary}
          className="p-1 rounded-lg hover:bg-white/10 text-emerald-300"
          title="Audio Playback"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3.5 flex-1">
        {/* VOICE AI INTEGRATION BOX */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#073B2F] font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#20A887]" />
              <span>Voice AI Field Observation</span>
            </div>
            <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-semibold">
              Live Speech API
            </span>
          </div>

          <p className="text-[10px] text-gray-600 leading-snug">
            Tap microphone to speak observation. AI will structure the title, category, consequence, and immediate actions.
          </p>

          {/* Oscillating Audio Wave Graphic while Recording */}
          {isRecording && (
            <div className="flex items-center justify-center gap-1 py-1.5 bg-red-50 border border-red-200 rounded-lg">
              <span className="w-1 h-3 bg-red-500 rounded-full animate-bounce"></span>
              <span className="w-1 h-5 bg-red-600 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span className="w-1 h-7 bg-red-700 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 h-4 bg-red-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
              <span className="w-1 h-6 bg-red-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1 h-3 bg-red-400 rounded-full animate-bounce [animation-delay:0.25s]"></span>
              <span className="text-[10px] font-bold text-red-700 ml-2">Listening live...</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-[#073B2F] hover:bg-[#092B24] text-white shadow-sm'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isRecording ? 'Stop Recording' : 'Speak Observation'}</span>
            </button>
          </div>

          {/* Quick Voice Simulation Templates - Sleek & Compact */}
          <div className="pt-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-700 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#087F5B]" />
                <span>1-Tap Voice AI Scenario:</span>
              </span>
              <span className="text-[9px] text-[#087F5B] font-mono font-bold">5 Qatar Presets</span>
            </div>

            {/* Compact Scenario Selector Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => {
                  const sc = mockSpeechScenarios.find((s) => s.id === e.target.value);
                  if (sc) runMockSpeechScenario(sc);
                }}
                defaultValue=""
                className="w-full pl-3 pr-8 py-2 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-[#073B2F] outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#087F5B] shadow-2xs"
              >
                <option value="" disabled>⚡ Choose Voice Scenario to Auto-Dictate...</option>
                {mockSpeechScenarios.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.shortLabel} — [{sc.severity}]
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#087F5B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Quick 1-Tap Pills for Instant Demonstrations */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {mockSpeechScenarios.slice(0, 3).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => runMockSpeechScenario(sc)}
                  className="px-2 py-1 rounded-md bg-white hover:bg-emerald-100 border border-emerald-200 text-[#073B2F] text-[10px] font-semibold whitespace-nowrap flex items-center gap-1 shadow-2xs active:scale-95 transition-all flex-shrink-0"
                  title={sc.spokenText}
                >
                  <Mic className="w-2.5 h-2.5 text-[#087F5B]" />
                  <span>{sc.shortLabel.split('(')[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {voiceTranscript && (
            <div className="bg-white p-2 rounded-lg border border-emerald-300 text-[10px] text-gray-700 italic">
              <strong>Transcript:</strong> "{voiceTranscript}"
            </div>
          )}

          {isParsingVoice && (
            <div className="text-[10px] text-[#087F5B] font-semibold flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3 h-3" /> Structuring observation into form fields...
            </div>
          )}
        </div>

        {/* Hazard Title */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">
            Hazard Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Uncovered floor opening on Level 2"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:border-[#087F5B]"
          />
        </div>

        {/* Category & Severity Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as HazardCategory)}
              className="w-full px-2.5 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
            >
              <option value="Work at height">Work at height</option>
              <option value="Slips, trips and falls">Slips, trips and falls</option>
              <option value="Electrical hazards">Electrical hazards</option>
              <option value="Fire hazards">Fire hazards</option>
              <option value="Chemical exposure">Chemical exposure</option>
              <option value="Manual handling">Manual handling</option>
              <option value="Unsafe machinery">Unsafe machinery</option>
              <option value="Lifting operations">Lifting operations</option>
              <option value="Excavation">Excavation</option>
              <option value="Confined space">Confined space</option>
              <option value="Heat stress">Heat stress</option>
              <option value="Poor housekeeping">Poor housekeeping</option>
              <option value="PPE non-compliance">PPE non-compliance</option>
              <option value="Environmental hazards">Environmental hazards</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Risk Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
              className="w-full px-2.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold outline-none"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Project & Location */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none truncate"
            >
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Location / Zone</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">
            Hazard Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={2.5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you observed..."
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        {/* Potential Consequence & Immediate Action */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Potential Consequence</label>
          <input
            type="text"
            value={potentialConsequence}
            onChange={(e) => setPotentialConsequence(e.target.value)}
            placeholder="e.g. Fall from height leading to severe trauma"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Immediate Action Taken</label>
          <input
            type="text"
            value={immediateAction}
            onChange={(e) => setImmediateAction(e.target.value)}
            placeholder="e.g. Placed temporary barricade tape and warned crew"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        {/* INTERACTIVE WORKPLACE PHOTO ATTACHMENT */}
        <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-bold text-gray-800 text-[11px] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>Evidence Photo Attachment</span>
            </label>
            {imageUrl && (
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Photo Ready
              </span>
            )}
          </div>

          {/* Action Row: Upload from Device or Pick Worksite Preset */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="device-photo-upload"
              className="flex-1 py-2 px-3 border border-dashed border-[#087F5B] bg-emerald-50/40 hover:bg-emerald-50 text-[#073B2F] rounded-lg flex items-center justify-center gap-1.5 font-bold text-xs cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>Upload Photo from Device</span>
              <input
                id="device-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-200"
                title="Remove Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Curated Presets Bar */}
          <div>
            <span className="text-[9px] text-gray-500 block mb-1 font-semibold uppercase">
              Or Choose Preset Worksite Photo:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {photoPresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImageUrl(p.url);
                    setImageCaption(p.caption);
                  }}
                  className={`p-1 rounded-lg border text-left flex flex-col items-center gap-1 transition-all ${
                    imageUrl === p.url
                      ? 'border-[#087F5B] bg-emerald-50 ring-2 ring-[#087F5B]/30'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <img
                    src={getSafeImageUrl(p.url, p.title)}
                    alt={p.title}
                    className="w-full h-8 object-cover rounded bg-slate-800"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getFallbackHazardImage(p.title);
                    }}
                  />
                  <span className="text-[8px] font-semibold text-gray-700 truncate w-full text-center">
                    {p.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Photo Preview Card with Zoom */}
          {imageUrl && (
            <div className="mt-2 relative rounded-xl overflow-hidden border border-gray-300 shadow-xs bg-slate-900">
              <img
                src={getSafeImageUrl(imageUrl, category)}
                alt="Uploaded preview"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getFallbackHazardImage(category);
                }}
              />
              <button
                type="button"
                onClick={() => setIsPhotoViewerOpen(true)}
                className="absolute top-2 right-2 p-1 bg-black/75 hover:bg-black text-white rounded-md text-[10px] flex items-center gap-1 backdrop-blur-sm"
              >
                <ZoomIn className="w-3 h-3" />
                <span>Tap to Zoom</span>
              </button>
              <div className="p-2 bg-gray-50 border-t border-gray-200">
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Add photo caption..."
                  className="w-full text-[10px] bg-transparent outline-none text-gray-700"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-[#087F5B] hover:bg-[#073B2F] active:scale-98 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Submit Hazard Report with Evidence</span>
          </button>
          <p className="text-[9px] text-gray-400 text-center mt-1.5">
            Will instantly propagate to Desktop Control Centre & notify assigned supervisor.
          </p>
        </div>
      </form>

      {/* Full Photo Viewer Modal */}
      {imageUrl && (
        <PhotoViewerModal
          isOpen={isPhotoViewerOpen}
          onClose={() => setIsPhotoViewerOpen(false)}
          imageUrl={imageUrl}
          title={title || 'Field Hazard Photo'}
          caption={imageCaption}
          location={location}
          timestamp={new Date().toISOString().substring(0, 10)}
          reporter={currentUser.name}
        />
      )}
    </div>
  );
};
