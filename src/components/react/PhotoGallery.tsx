import { useMemo, useState } from 'react';
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

  return (
    <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
      {photos.map((item) => (
        <ImageCard key={item.photo.responsiveImage.src} item={item} />
      ))}
    </div>
  );
}

function ImageCard({ item }: { item: FlatPhoto }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="mb-4 break-inside-avoid cursor-zoom-in group relative overflow-hidden rounded-[var(--radius)]"
        onClick={() => setOpen(true)}
      >
        <img
          src={item.photo.responsiveImage.src}
          srcSet={item.photo.responsiveImage.srcSet}
          sizes={item.photo.responsiveImage.sizes}
          width={item.photo.responsiveImage.width}
          height={item.photo.responsiveImage.height}
          alt={item.photo.responsiveImage.alt || item.city}
          loading="lazy"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
          style={item.photo.responsiveImage.base64
            ? { backgroundImage: `url(${item.photo.responsiveImage.base64})`, backgroundSize: 'cover' }
            : undefined
          }
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
          <h3 className="text-white font-serif text-xl">{item.city}</h3>
          <p className="text-white/80 text-xs font-sans">
            {item.district}, {item.state}
          </p>
        </div>
      </div>

      {open && (
        <PhotoDialog
          item={item}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
