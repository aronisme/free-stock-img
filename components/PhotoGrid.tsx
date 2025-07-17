import PhotoCard from './PhotoCard';
//import '@/app/globals.css'

type Photo = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Tidak ada foto ditemukan.
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto space-x-3 px-2 md:px-4 py-2">
      {photos.map((photo) =>
        photo?.id ? <PhotoCard key={photo.id} photo={photo} /> : null
      )}
    </div>
  );
}
