import React from 'react';
import { X, Image as ImageIcon, Download, ZoomIn, Shield, MapPin, Calendar, User } from 'lucide-react';
import { getSafeImageUrl, getFallbackHazardImage } from '../../data/imageAssets';

interface PhotoViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  caption?: string;
  location?: string;
  timestamp?: string;
  reporter?: string;
  reference?: string;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
  location,
  timestamp,
  reporter,
  reference,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12171E] rounded-2xl shadow-2xl border border-white/10 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-slate-900/90 text-white p-3.5 px-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#20A887]" />
            <span className="font-bold text-xs text-white truncate max-w-md">{title}</span>
            {reference && (
              <span className="text-[10px] font-mono bg-black/40 text-emerald-300 px-2 py-0.5 rounded border border-white/10">
                {reference}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Display Area */}
        <div className="relative flex-1 bg-black/60 flex items-center justify-center p-2 min-h-[280px] max-h-[55vh] overflow-hidden">
          <img
            src={getSafeImageUrl(imageUrl, title)}
            alt={title}
            className="max-h-full max-w-full object-contain rounded-lg shadow-lg border border-white/10"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getFallbackHazardImage(title);
            }}
          />
          {/* Timestamp Watermark */}
          <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-mono border border-white/10 shadow">
            📷 EVIDENCE WATERMARK • {timestamp || new Date().toISOString().substring(0, 10)}
          </div>
        </div>

        {/* Metadata Details Footer */}
        <div className="p-4 bg-slate-900 text-xs text-gray-300 space-y-2 border-t border-white/10">
          {caption && (
            <p className="text-gray-200 font-medium leading-snug">
              {caption}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-gray-400 pt-1">
            {location && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#20A887] flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            )}
            {reporter && (
              <div className="flex items-center gap-1.5 truncate">
                <User className="w-3.5 h-3.5 text-[#20A887] flex-shrink-0" />
                <span className="truncate">{reporter}</span>
              </div>
            )}
            {timestamp && (
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-[#20A887] flex-shrink-0" />
                <span className="truncate">{timestamp}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Close Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
