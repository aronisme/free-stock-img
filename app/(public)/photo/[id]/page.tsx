// app/(public)/photo/[id]/page.tsx
import { Metadata } from 'next';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PhotoDetailClient from './PhotoDetailClient';

// Async function to fetch photo data (server-side)
async function getPhotoData(id: string) {
  try {
    const photoDoc = await getDoc(doc(db, 'photos', id));
    if (photoDoc.exists()) {
      return { id: photoDoc.id, ...photoDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching photo:', error);
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const photo = await getPhotoData(params.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com';
  const canonicalUrl = `${siteUrl}/photo/${params.id}`;
  const fullImageUrl = photo?.imageUrl?.startsWith('http') ? photo.imageUrl : `${siteUrl}${photo?.imageUrl || ''}`;

  if (!photo) {
    return {
      title: 'Photo Not Found',
      description: 'The requested photo could not be found.',
    };
  }

  return {
    title: `${photo.title} - Free Stock Img`,
    description: photo.description || 'Download this high-quality stock photo for free. No attribution required.',
    keywords: photo.tags?.join(', ') || 'stock photo, free photo, high-quality image',
    openGraph: {
      title: photo.title,
      description: photo.description || 'Download this high-quality stock photo for free.',
      images: [{ url: fullImageUrl }],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: photo.title,
      description: photo.description || 'Download this high-quality stock photo for free.',
      images: [fullImageUrl],
    },
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Server component to fetch data and pass to client component
export default async function PhotoDetailPage({ params }: { params: { id: string } }) {
  const photo = await getPhotoData(params.id);

  return <PhotoDetailClient photo={photo} params={params} />;
}