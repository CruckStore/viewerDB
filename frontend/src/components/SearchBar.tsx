import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

interface Props { onSearch: (q: string) => void; }

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <Search className="mr-3" size={20} color="#888" />
      <input
        className="search-input"
        type="text"
        placeholder="Entrez un terme à rechercher…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">Go</button>
    </form>
  );
}
