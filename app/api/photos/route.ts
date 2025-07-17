// app/api/photos/route.ts
import { NextRequest } from 'next/server';
import { searchPhotos, getPhotos } from '../../../lib/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    let photos: any[] = [];

    if (query.trim()) {
      photos = await searchPhotos(query);
    } else {
      photos = await getPhotos();
    }

    return Response.json(photos);
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}