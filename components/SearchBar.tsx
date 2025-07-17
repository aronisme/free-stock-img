'use client';

import { Search } from 'lucide-react';
import { FormEvent } from 'react';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
}

export default function SearchBar({ search, setSearch, handleSubmit }: SearchBarProps) {
  return (
    <div className="sticky top-16 md:top-20 left-0 right-0 bg-white shadow-sm z-40 py-3 border-b">
      <div className="container mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 justify-center items-center max-w-4xl mx-auto"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search photos by title, category, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search photos"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}