import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import PhotoDialog from './PhotoDialog';

interface Photo {
  alt: string;
  blurhash: string;
  title: string;
  responsiveImage: {
    srcSet: string;
    webpSrcSet: string;
    sizes: string;
    src: string;
    width: number;
    height: number;
    aspectRatio: number;
    alt: string | null;
    title: string | null;
    base64: string | null;
  };
}

interface Place {
  city: string;
  location: string;
  date: string;
  state: string;
  district: string;
  distance: string;
  camera: string;
  photos: Photo[];
}

interface FlatPhoto {
  city: string;
  location: string;
  date: string;
  state: string;
  district: string;
  distance: string;
  camera: string;
  photo: Photo;
}

export default function PhotoGallery({ places }: { places: Place[] }) {
  const photos = useMemo(() => {
    const all = places.flatMap((place) =>
      (place.photos ?? []).map((photo) => ({
        city: place.city,
        location: place.location,
        date: place.date,
        state: place.state,
        district: place.district,
        distance: place.distance,
        camera: place.camera,
        photo,
      }))
    );
    return all.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  }, [places]);

  const [dialogItem, setDialogItem] = useState<FlatPhoto | null>(null);
  const [dialogIndex, setDialogIndex] = useState(-1);

  const openDialog = useCallback((item: FlatPhoto, index: number) => {
    setDialogItem(item);
    setDialogIndex(index);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    const next = dialogIndex + dir;
    if (next >= 0 && next < photos.length) {
      setDialogItem(photos[next]);
      setDialogIndex(next);
    }
  }, [dialogIndex, photos]);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-3">
        {photos.map((item, i) => (
          <ImageCard
            key={item.photo.responsiveImage.src}
            item={item}
            index={i}
            onOpen={() => openDialog(item, i)}
          />
        ))}
      </div>

      {dialogItem && (
        <PhotoDialog
          item={dialogItem}
          onClose={() => { setDialogItem(null); setDialogIndex(-1); }}
          onPrev={dialogIndex > 0 ? () => navigate(-1) : undefined}
          onNext={dialogIndex < photos.length - 1 ? () => navigate(1) : undefined}
          counter={`${dialogIndex + 1} / ${photos.length}`}
        />
      )}
    </>
  );
}

function ImageCard({ item, index, onOpen }: { item: FlatPhoto; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(item.date));

  return (
    <div
      ref={ref}
      className="mb-3 break-inside-avoid cursor-zoom-in group relative overflow-hidden rounded-lg ring-1 ring-[var(--border)]"
      onClick={onOpen}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index % 8 * 0.06}s, transform 0.5s ease ${index % 8 * 0.06}s`,
      }}
    >
      <img
        src={item.photo.responsiveImage.src}
        srcSet={item.photo.responsiveImage.srcSet}
        sizes={item.photo.responsiveImage.sizes}
        width={item.photo.responsiveImage.width}
        height={item.photo.responsiveImage.height}
        alt={item.photo.responsiveImage.alt || item.city}
        loading="lazy"
        className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={item.photo.responsiveImage.base64
          ? { backgroundImage: `url(${item.photo.responsiveImage.base64})`, backgroundSize: 'cover' }
          : undefined
        }
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h3 className="text-white font-display text-lg font-semibold tracking-tight leading-tight">
              {item.city}
            </h3>
            <p className="text-white/70 text-xs font-body mt-0.5">
              {item.district}, {item.state}
            </p>
          </div>
          <span className="text-white/60 text-[10px] font-mono whitespace-nowrap">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Top-right zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
    </div>
  );
}
