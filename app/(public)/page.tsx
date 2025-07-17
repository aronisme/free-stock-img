'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUp, Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Constants
const LIMIT = 12;
const MAX_PHOTOS = 100;

interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  category?: string;
  createdAt: number;
}

let photoCache: Photo[] = [];

export default function HomePage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;
  const q = searchParams.get('q') || '';

  const [photos, setPhotos] = useState<Photo[]>(photoCache);
  const [search, setSearch] = useState(q);
  const [lastDocId, setLastDocId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const fetchPhotos = async (keyword = '', reset = false) => {
    if (!reset && photos.length >= MAX_PHOTOS) {
      setHasMore(false);
      return;
    }

    if (!keyword && !reset && photoCache.length > 0) {
      setPhotos(photoCache);
      setHasMore(photoCache.length < MAX_PHOTOS);
      return;
    }

    setLoading(true);
    try {
      const url = keyword.trim()
        ? `/api/photos?q=${encodeURIComponent(keyword)}`
        : `/api/photos?limit=${LIMIT}${reset || !lastDocId ? '' : `&startAfter=${lastDocId}`}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch photos');
      const data: Photo[] = await res.json();

      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);

      if (data.length === 0 || (!reset && photos.length + data.length >= MAX_PHOTOS)) {
        setHasMore(false);
      } else {
        if (reset) {
          setPhotos(sortedData);
          photoCache = sortedData;
          setLastDocId(data[data.length - 1]?.id || null);
        } else {
          const combined = [...photos, ...sortedData];
          const limitedPhotos = combined.slice(0, MAX_PHOTOS);
          const uniquePhotos = Array.from(
            new Map(limitedPhotos.map((photo) => [photo.id, photo])).values()
          ).sort((a, b) => b.createdAt - a.createdAt);
          setPhotos(uniquePhotos);
          photoCache = uniquePhotos;
          setLastDocId(data[data.length - 1]?.id || null);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load photos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    fetchPhotos(trimmedSearch, true);
    // Update URL to reflect search query or clear it
    router.push(trimmedSearch ? `/?q=${encodeURIComponent(trimmedSearch)}` : '/');
  };

  const handleLoadMore = () => {
    fetchPhotos(search);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (isNearBottom && hasMore && !loading && photos.length < MAX_PHOTOS) {
        handleLoadMore();
      }
      setShowBackToTop(window.scrollY > 300);
      setShowLoadMore(isNearBottom && hasMore && photos.length < MAX_PHOTOS);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading, photos.length]);

  useEffect(() => {
    setSearch(q);
    fetchPhotos(q, true);
  }, [q]);

  useEffect(() => {
    if (photoCache.length === 0 && !q) {
      fetchPhotos('', true);
    }
  }, []);

  const highlightText = (text: string, keyword: string) => {
    if (!keyword.trim() || !text) return text;
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 text-gray-900 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const menuItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: 'About', href: '/about' },
    ],
    []
  );
// Tambahkan di bagian atas component
const handleResetSearch = () => {
  setSearch(''); // Reset input
  fetchPhotos('', true); // Fetch ulang data tanpa query
  router.push('/'); // Hapus ?q= dari URL
};


  return (
    <>
      <Head>
        <title>Free Stock Photos - Discover High-Quality Images</title>
        <meta
          name="description"
          content="Explore a collection of high-quality, free stock photos for your creative projects. No attribution required."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main className="min-h-screen bg-gray-50">
       
<Header
  menuItems={menuItems}
  search={search}
  setSearch={setSearch}
  handleSubmit={handleSubmit}
  onResetSearch={handleResetSearch} // <-- tambahkan ini
/>

        <section className="container mx-auto px-4 pt-8 pb-12">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
              Discover Free Stock Photos
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm xs:text-base md:text-lg">
              High-quality images for your creative projects. Free to use with no attribution required.
            </p>
          </div>

          {photos.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-base xs:text-lg">No photos found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6">
              {photos.map((photo) => (
                <Link
                  key={photo.id}
                  href={`/photo/${photo.id}`}
                  className="group relative block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 aspect-square bg-gray-100"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2 xs:p-4">
                    <h3 className="text-white font-medium text-sm xs:text-base truncate">
                      {highlightText(photo.title, search)}
                    </h3>
                    {photo.category && (
                      <p className="text-gray-300 text-xs xs:text-sm">
                        {highlightText(photo.category, search)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading photos...</span>
              </div>
            ) : showLoadMore ? (
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-white text-gray-700 rounded-lg px-4 xs:px-6 py-2 border hover:bg-gray-50 transition-colors shadow-sm font-medium disabled:opacity-50"
              >
                Load More
              </button>
            ) : photos.length > 0 && !hasMore ? (
              <p className="text-gray-500 text-sm xs:text-base">
                {photos.length >= MAX_PHOTOS ? 'Maximum photos loaded' : "You've reached the end"}
              </p>
            ) : null}
          </div>
        </section>

        <Footer />

        {showBackToTop && (
          <button
            onClick={handleBackToTop}
            className="fixed bottom-6 right-4 xs:right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors backdrop-blur-sm"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </main>
    </>
  );
}