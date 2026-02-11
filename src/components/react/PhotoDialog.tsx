import { useEffect, useCallback } from 'react';

interface PhotoDialogProps {
  item: {
    city: string;
    location: string;
    date: string;
    state: string;
    district: string;
    distance: string;
    camera: string;
    photo: {
      responsiveImage: {
        src: string;
        alt: string | null;
      };
    };
  };
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  counter?: string;
}

export default function PhotoDialog({ item, onClose, onPrev, onNext, counter }: PhotoDialogProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && onPrev) onPrev();
    if (e.key === 'ArrowRight' && onNext) onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(item.date));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.city}
      style={{ animation: 'dialogIn 0.25s ease' }}
    >
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4">
        {/* Left: counter */}
        <span className="font-mono text-xs text-white/60">
          {counter}
        </span>

        {/* Center: title */}
        <div className="text-center">
          <h2 className="font-display text-sm font-semibold text-white tracking-tight">{item.city}</h2>
          <p className="text-[11px] text-white/60 font-body">{item.district} · {formattedDate}</p>
        </div>

        {/* Right: close */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Close"
          onClick={onClose}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav arrows */}
      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
          aria-label="Previous photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
          aria-label="Next photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        src={item.photo.responsiveImage.src}
        alt={item.photo.responsiveImage.alt || item.city}
        className="relative z-10 object-contain max-w-[90vw] max-h-[82vh] cursor-zoom-in select-none"
        onClick={() => window.open(item.photo.responsiveImage.src, '_blank', 'noopener,noreferrer')}
        draggable={false}
        style={{ animation: 'imgIn 0.3s ease' }}
      />

      {/* Bottom bar: metadata */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-6 px-5 py-4">
        <span className="text-[11px] text-white/50 font-body">{item.camera}</span>
        <span className="text-[11px] text-white/50 font-body">{item.distance}</span>
        <a
          href={item.location}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/50 hover:text-white/80 font-body transition-colors flex items-center gap-1"
        >
          View on map
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes dialogIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes imgIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
