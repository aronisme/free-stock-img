'use client';

// app/(public)/photo/[id]/PhotoDetailClient.tsx
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FiDownload, FiCopy, FiHeart, FiSearch, FiLink } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { getPhotosByTag } from '@/lib/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PhotoDetailClient({ photo: initialPhoto, params }: { photo: any; params: { id: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';

  const [photo, setPhoto] = useState<any>(initialPhoto);
  const [loading, setLoading] = useState(!initialPhoto);
  const [liked, setLiked] = useState(false);
  const [search, setSearch] = useState(q);
  const [relatedPhotos, setRelatedPhotos] = useState<any[]>([]);

  // Initialize liked state
  useEffect(() => {
    if (initialPhoto) {
      setLiked(initialPhoto.liked || false);
    }
  }, [initialPhoto]);

  // Handle search reset
  const handleResetSearch = () => {
    setSearch('');
    fetchPhotos('', true);
    router.push('/');
  };

  // Fetch photos for search reset
  const fetchPhotos = async (keyword = '', reset = false) => {
    try {
      const url = keyword.trim() ? `/api/photos?q=${encodeURIComponent(keyword)}` : `/api/photos`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch photos');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      router.push(`/?q=${encodeURIComponent(trimmedSearch)}`);
    } else {
      handleResetSearch();
    }
  };

  // Fetch related photos by tag
  useEffect(() => {
    const fetchRelatedPhotos = async () => {
      if (!photo || !photo.tags || photo.tags.length === 0) {
        setRelatedPhotos([]);
        return;
      }

      try {
        const tag = photo.tags[0];
        const results = await getPhotosByTag(tag);
        const filteredResults = results.filter((p: any) => p.id !== params.id);
        setRelatedPhotos(filteredResults);
      } catch (error) {
        console.error('Error fetching related photos:', error);
      }
    };

    if (photo?.tags?.length > 0) {
      fetchRelatedPhotos();
    }
  }, [photo, params.id]);

  // Handle tag click for search
  const handleTagClick = (tag: string) => {
    router.push(`/?q=${encodeURIComponent(tag)}`);
  };

  // Update like or download counter
  const updateCounter = async (field: string) => {
    try {
      await updateDoc(doc(db, 'photos', params.id), {
        [field]: photo[field] ? photo[field] + 1 : 1,
      });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  // Handle like button
  const handleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    try {
      await updateDoc(doc(db, 'photos', params.id), {
        likes: newLikedState ? (photo.likes || 0) + 1 : Math.max((photo.likes || 1) - 1, 0),
        liked: newLikedState,
      });

      const photoDoc = await getDoc(doc(db, 'photos', params.id));
      if (photoDoc.exists()) {
        setPhoto({ id: photoDoc.id, ...photoDoc.data() });
      }
    } catch (error) {
      console.error('Error updating like:', error);
      setLiked(!newLikedState);
    }
  };

  // Handle photo download
  const handleDownload = async () => {
    try {
      const response = await fetch(photo.imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${photo.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      await updateCounter('downloads');

      const photoDoc = await getDoc(doc(db, 'photos', params.id));
      if (photoDoc.exists()) {
        setPhoto({ id: photoDoc.id, ...photoDoc.data() });
      }

      toast.success('Foto berhasil diunduh!', {
        iconTheme: { primary: '#3B82F6', secondary: '#fff' },
      });
    } catch (error) {
      console.error('Error downloading photo:', error);
      toast.error('Gagal mengunduh foto!');
    }
  };

  // Copy text to clipboard
  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message, {
        iconTheme: { primary: '#10B981', secondary: '#fff' },
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Gagal menyalin ke clipboard');
    }
  };

  // Menu items for Header
  const menuItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: 'About', href: '/about' },
    ],
    []
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-gray-700">Loading...</div>
      </div>
    );
  }

  // Not found state
  if (!photo) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-gray-700">Foto tidak ditemukan</div>
      </div>
    );
  }

  return (
    <>
      <Header
        menuItems={menuItems}
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
        onResetSearch={handleResetSearch}
      />
      <main className="min-h-screen bg-white pt-16 pb-24 px-4 md:px-8">
        <section className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 md:gap-8">
            {/* Image and Tags */}
            <div>
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-6 aspect-square md:aspect-auto">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {photo.tags?.map((tag: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition border border-gray-200 hover:border-blue-200 shadow-sm"
                      aria-label={`Search for ${tag}`}
                    >
                      <FiSearch size={12} className="opacity-70" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Sidebar with Title, Description, Download, Like, and Prompt */}
            <div className="space-y-6">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{photo.title}</h1>
                <p className="text-gray-600 mt-2">{photo.description}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-5 rounded-xl border border-blue-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-blue-700">Free Download</h4>
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {photo.downloads || 0} downloads
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDownload}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                    rel="nofollow"
                    aria-label="Download high-quality photo"
                  >
                    <FiDownload className="text-lg" />
                    <span>HD Download</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(photo.imageUrl, 'URL disalin!')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition border border-gray-200 hover:border-gray-300"
                    rel="nofollow"
                    aria-label="Copy photo URL"
                  >
                    <FiLink className="text-lg" />
                    <span>Copy URL</span>
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2 text-center">AI Image Generation</p>
              </div>
              <button
                onClick={handleLike}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md ${
                  liked
                    ? 'bg-red-100 text-red-600 border border-red-200 hover:bg-red-50'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
                aria-label={liked ? 'Unlike photo' : 'Like photo'}
              >
                <FiHeart className={`text-lg ${liked ? 'fill-current' : ''}`} />
                <span className="font-medium">{liked ? 'Liked' : 'Like this photo'}</span>
                <span
                  className={`ml-auto px-2 py-1 rounded text-xs ${
                    liked ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {photo.likes || 0}
                </span>
              </button>
              <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-700">AI Generation Prompt</h4>
                  <button
                    onClick={() => copyToClipboard(photo.prompt, 'Prompt disalin!')}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    rel="nofollow"
                    aria-label="Copy AI prompt"
                  >
                    <FiCopy size={14} />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-gray-600 whitespace-pre-line bg-white p-3 rounded border border-gray-200">
                  {photo.prompt}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Related Photos */}
        {relatedPhotos.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Similar Stock Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {relatedPhotos.map((relatedPhoto) => (
                <Link
                  key={relatedPhoto.id}
                  href={`/photo/${relatedPhoto.id}`}
                  className="block group relative"
                >
                  <div className="overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow">
                    <img
                      src={relatedPhoto.imageUrl}
                      alt={relatedPhoto.title}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center p-2 transition-opacity">
                      <p className="text-white text-sm text-center truncate">{relatedPhoto.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}