import { useEffect } from 'react';

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
}

export default function PhotoDialog({ item, onClose }: PhotoDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(item.date));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={item.city}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full h-full bg-white overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center h-full gap-y-4">
          {/* Image */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 h-full bg-[var(--secondary)] p-6 flex items-center justify-center">
            <figure className="w-full h-full flex flex-col items-center justify-center">
              <img
                src={item.photo.responsiveImage.src}
                alt={item.photo.responsiveImage.alt || item.city}
                className="object-contain w-full h-full max-h-[94dvh] cursor-zoom-in"
                onClick={() => window.open(item.photo.responsiveImage.src, '_blank', 'noopener,noreferrer')}
              />
            </figure>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center items-center w-full col-span-1 p-6">
            <button
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
              aria-label="Close"
              onClick={onClose}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex flex-col gap-3">
              <h1 className="font-serif text-4xl">{item.city}</h1>
              <div className="flex flex-col gap-2 font-sans text-sm text-[var(--muted-foreground)]">
                <div className="flex items-center gap-2">
                  <span>🌆</span>
                  <span>{item.district}, {item.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🗓️</span>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✈️</span>
                  <span>{item.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📸</span>
                  <span>{item.camera}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>🗺️</span>
                  <a
                    href={item.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[#153ec4] break-all"
                  >
                    View on map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
