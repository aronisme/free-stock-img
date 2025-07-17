'use client';

import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { FormEvent } from 'react';

interface HeaderProps {
  menuItems: { label: string; href: string }[];
  search: string;
  setSearch: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  onResetSearch?: () => void; // Optional callback
}

export default function Header({
  menuItems,
  search,
  setSearch,
  handleSubmit,
  onResetSearch,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center md:justify-center gap-3">
        {/* Logo kiri */}
        <div className="flex justify-start w-full md:w-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            <Link href="/" className="flex items-center gap-1">
              <span className="bg-blue-600 text-white px-2 py-1 rounded">Free</span>
              <span>Stock Img</span>
            </Link>
          </h1>
        </div>

        {/* Search tengah */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photos..."
            className="w-full pl-8 pr-24 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />

          {/* Tombol Clear (X) */}
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                if (onResetSearch) onResetSearch(); // <-- Trigger reset logic
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Tombol Submit/Search */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
    </header>
  );
}