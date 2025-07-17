// app/api/photos/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  let photos: any[] = [];
  if (query.trim()) {
    photos = await searchPhotos(query);
  } else {
    photos = await getPhotos();
  }
  return Response.json(photos);
}
