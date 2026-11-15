import { useMemo, useState, useCallback } from 'react';
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

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

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
    return all.sort((a, b) => b.date.localeCompare(a.date));
  }, [places]);

  const [dialogIndex, setDialogIndex] = useState(-1);
  const dialogItem = dialogIndex >= 0 ? photos[dialogIndex] : null;

  const openDialog = useCallback((_item: FlatPhoto, index: number) => {
    setDialogIndex(index);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    setDialogIndex(prev => {
      const next = prev + dir;
      return (next >= 0 && next < photos.length) ? next : prev;
    });
  }, [photos.length]);

  return (
    <>
      <div className="photo-prints">
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
          onClose={() => setDialogIndex(-1)}
          onPrev={dialogIndex > 0 ? () => navigate(-1) : undefined}
          onNext={dialogIndex < photos.length - 1 ? () => navigate(1) : undefined}
          counter={`${dialogIndex + 1} / ${photos.length}`}
        />
      )}
    </>
  );
}

function ImageCard({ item, index, onOpen }: { item: FlatPhoto; index: number; onOpen: () => void }) {
  const formattedDate = dateFormatter.format(new Date(item.date));

  // A contact print: real aspect ratio, frame number, city and month.
  // The whole print is a button so it works from the keyboard too.
  return (
    <div className="photo-print-wrap">
      <button
        type="button"
        className="photo-print"
        onClick={onOpen}
        aria-label={`Open photo ${index + 1}: ${item.city}, ${formattedDate}`}
        style={{ ['--r' as string]: `${((index * 37) % 5) - 2}deg` }}
      >
        <img
          src={item.photo.responsiveImage.src}
          srcSet={item.photo.responsiveImage.webpSrcSet || item.photo.responsiveImage.srcSet}
          sizes="(max-width: 767px) 90vw, 400px"
          width={item.photo.responsiveImage.width}
          height={item.photo.responsiveImage.height}
          alt={item.photo.responsiveImage.alt || item.city}
          loading="lazy"
          decoding="async"
          style={item.photo.responsiveImage.base64
            ? { backgroundImage: `url(${item.photo.responsiveImage.base64})`, backgroundSize: 'cover' }
            : undefined
          }
        />
        <span className="photo-print-caption">
          <span className="photo-print-no">{String(index + 1).padStart(2, '0')}</span>
          <span className="photo-print-city">{item.city}</span>
          <span className="photo-print-date">{formattedDate}</span>
        </span>
      </button>
    </div>
  );
}
