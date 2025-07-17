'use client';
//import '@/app/globals.css'
import Image from 'next/image';
import Link from 'next/link';

type Photo = {
  id: string;
  title: string;
  thumbnailUrl: string; // URL valid
};

export default function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div className="flex flex-col">
      <Link href={`/photo/${photo.id}`}>
        <Image
          src={photo.thumbnailUrl}
          alt={photo.title}
          width={200}    // Lebar asli (misalnya 1024)
          height={200}   // Tinggi asli
          className="w-full h-auto object-cover"
          unoptimized     // Hanya kalau belum set domain Cloudinary di next.config.js
        />
      </Link>
      <div className="mt-1 text-sm text-gray-800 truncate">{photo.title}</div>
    </div>
  );
}
