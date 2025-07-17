import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export type Photo = {
  id: string;
  title: string;
  prompt: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  category: 'nature' | 'city' | 'food' | 'animal';
  tags: string[];
  viewCount: number;
  downloadCount: number;
  photographer: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

function matchesKeyword(photo: Photo, keyword: string): boolean {
  const lowerKeyword = keyword.toLowerCase();
  return (
    photo.title.toLowerCase().includes(lowerKeyword) ||
    (photo.description && photo.description.toLowerCase().includes(lowerKeyword)) ||
    photo.category.toLowerCase().includes(lowerKeyword) ||
    (photo.tags || []).some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

export async function searchPhotos(keyword: string): Promise<Photo[]> {
  try {
    const snapshot = await getDocs(collection(db, 'photos'));
    if (snapshot.empty) return [];
    const allPhotos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Photo[];

    if (!keyword.trim()) return allPhotos;

    return allPhotos.filter(photo => matchesKeyword(photo, keyword));
  } catch (error) {
    console.error('Firestore search error:', error);
    return [];
  }
}

export async function getPhotos(): Promise<Photo[]> {
  try {
    const snapshot = await getDocs(collection(db, 'photos'));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Photo[];
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

// ✅ Fungsi baru: getPhotosByTag
export async function getPhotosByTag(tag: string): Promise<Photo[]> {
  try {
    if (!tag.trim()) return [];

    const photosQuery = query(
      collection(db, 'photos'),
      where('tags', 'array-contains', tag)
    );

    const snapshot = await getDocs(photosQuery);
    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Photo[];
  } catch (error) {
    console.error('Error fetching photos by tag:', error);
    return [];
  }
}
