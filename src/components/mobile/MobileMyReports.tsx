import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import { ArrowLeft, Search, Filter, AlertTriangle, AlertOctagon, Eye, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Badge } from '../common/Badge';
import { PhotoViewerModal } from '../common/PhotoViewerModal';

export const MobileMyReports: React.FC = () => {
  const { hazards, incidents, nearMisses, setMobileScreen, setActiveDesktopModule, setSelectedRecordRef } = useHSE();
  const [filterType, setFilterType] = useState<'All' | 'Hazards' | 'Incidents' | 'NearMisses'>('All');
  const [search, setSearch] = useState('');

  // Photo viewer modal state
  const [activePhoto, setActivePhoto] = useState<{
    imageUrl: string;
    title: string;
    caption?: string;
    location?: string;
    reference?: string;
  } | null>(null);

  // Combined list
  const allItems = [
    ...hazards.map((h) => ({ ...h, type: 'Hazard' as const, date: h.reportedAt })),
    ...incidents.map((i) => ({ ...i, type: 'Incident' as const, date: `${i.incidentDate} ${i.incidentTime}` })),
    ...nearMisses.map((n) => ({ ...n, type: 'Near Miss' as const, date: n.reportedAt })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const filtered = allItems.filter((item) => {
    if (filterType === 'Hazards' && item.type !== 'Hazard') return false;
    if (filterType === 'Incidents' && item.type !== 'Incident') return false;
    if (filterType === 'NearMisses' && item.type !== 'Near Miss') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.reference.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7F5] overflow-y-auto pb-16 text-xs select-none">
      <div className="bg-[#073B2F] text-white px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-[#087F5B]/30">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-lg hover:bg-white/10 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="font-bold text-xs">Submitted HSE Reports</span>
        <div className="w-8"></div>
      </div>

      <div className="p-3 bg-white border-b border-gray-200 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports by ID, title, zone..."
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {(['All', 'Hazards', 'Incidents', 'NearMisses'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors whitespace-nowrap ${
                filterType === t
                  ? 'bg-[#087F5B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t === 'NearMisses' ? 'Near Misses' : t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 space-y-2 flex-1">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No reports matching filters.</div>
        ) : (
          filtered.map((item) => {
            const isHazard = item.type === 'Hazard';
            const isIncident = item.type === 'Incident';
            const Icon = isHazard ? AlertTriangle : isIncident ? AlertOctagon : Eye;
            const iconBg = isHazard ? 'bg-amber-100 text-amber-700' : isIncident ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';
            const hasImg = !!(item as any).imageUrl;

            return (
              <div
                key={item.reference}
                className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs hover:border-gray-300 transition-all flex flex-col gap-2"
              >
                <div
                  onClick={() => {
                    if (isHazard) setActiveDesktopModule('Hazard Reporting');
                    else if (isIncident) setActiveDesktopModule('Incident Management');
                    else setActiveDesktopModule('Near Miss Management');
                    setSelectedRecordRef(item.reference);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md ${iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-[11px] text-gray-900">{item.reference}</span>
                        <span className="text-[10px] text-gray-400 ml-1.5">{item.date.substring(0, 10)}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        item.status === 'Closed'
                          ? 'closed'
                          : item.status === 'Investigation'
                          ? 'investigation'
                          : item.status === 'Submitted' || item.status === 'Reported'
                          ? 'submitted'
                          : 'underReview'
                      }
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <h5 className="font-bold text-gray-900 line-clamp-1 mb-1">{item.title}</h5>
                  <p className="text-[11px] text-gray-500 line-clamp-2">{item.description}</p>
                </div>

                {/* Photo Evidence Bar with Live Worksite Thumbnail */}
                {hasImg && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhoto({
                        imageUrl: (item as any).imageUrl,
                        title: item.title,
                        caption: (item as any).imageCaption,
                        location: item.location,
                        reference: item.reference,
                      });
                    }}
                    className="flex items-center gap-2 p-1.5 bg-emerald-50/80 border border-emerald-200 rounded-lg text-[10px] cursor-pointer hover:bg-emerald-100/70 transition-colors"
                  >
                    <img
                      src={(item as any).imageUrl}
                      alt="Uploaded Field Photo"
                      className="w-11 h-10 object-cover rounded-md border border-emerald-300 flex-shrink-0 bg-white"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-emerald-900 font-bold text-[10px]">
                        <ImageIcon className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        <span>Uploaded Field Photo Attached</span>
                      </div>
                      <p className="text-[10px] text-gray-600 truncate mt-0.5">
                        {(item as any).imageCaption || 'Worksite verified observation evidence'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhoto({
                          imageUrl: (item as any).imageUrl,
                          title: item.title,
                          caption: (item as any).imageCaption,
                          location: item.location,
                          reference: item.reference,
                        });
                      }}
                      className="px-2 py-1 rounded bg-[#005A36] text-white font-bold text-[9px] hover:bg-[#00472B] transition-colors flex items-center gap-1 flex-shrink-0 shadow-2xs"
                    >
                      <span>View</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1.5 border-t border-gray-100">
                  <span>📍 {item.location}</span>
                  <span
                    onClick={() => {
                      if (isHazard) setActiveDesktopModule('Hazard Reporting');
                      else if (isIncident) setActiveDesktopModule('Incident Management');
                      else setActiveDesktopModule('Near Miss Management');
                      setSelectedRecordRef(item.reference);
                    }}
                    className="flex items-center gap-1 text-[#087F5B] font-semibold cursor-pointer hover:underline"
                  >
                    Open in Desktop <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {activePhoto && (
        <PhotoViewerModal
          isOpen={true}
          onClose={() => setActivePhoto(null)}
          imageUrl={activePhoto.imageUrl}
          title={activePhoto.title}
          caption={activePhoto.caption}
          location={activePhoto.location}
          reference={activePhoto.reference}
        />
      )}
    </div>
  );
};
