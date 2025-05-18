import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (q: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white rounded-full shadow-inner px-4 py-2"
    >
      <Search className="w-5 h-5 text-gray-400 mr-3" />
      <input
        type="text"
        placeholder="Entrez un terme à rechercher…"
        className="flex-grow outline-none text-lg font-medium placeholder-gray-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="ml-4 bg-primary transition-all duration-200 hover:bg-primary-dark text-white font-semibold rounded-full px-5 py-2"
      >
        Go
      </button>
    </form>
  );
}
