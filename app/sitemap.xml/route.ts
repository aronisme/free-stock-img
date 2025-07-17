import { NextRequest } from 'next/server';
import { getPhotos } from '@/lib/firestore';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';
  const protocol = host.includes('localhost') ? 'http' : 'https://simplestock.vercel.app ' ? 'https' : 'https';
  const domain = `${protocol}://${host}`;

  // Ambil semua foto dari Firestore
  const photos = await getPhotos();

  // Halaman statis
  const staticPages = [
    { path: '/', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.7 },
    { path: '/subscribe', priority: 0.7 },
    { path: '/faq', priority: 0.6 },
    { path: '/terms', priority: 0.6 },
    { path: '/privacy', priority: 0.6 },
  ];

  // Buat XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `
            <url>
              <loc>${domain}${page.path}</loc>
              <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
              <priority>${page.priority}</priority>
            </url>
          `;
        })
        .join('')}
      ${photos
        .map((photo) => {
          return `
            <url>
              <loc>${domain}/photo/${photo.id}</loc>
              <lastmod>${photo.updatedAt.toDate().toISOString().split('T')[0]}</lastmod>
              <priority>0.5</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}