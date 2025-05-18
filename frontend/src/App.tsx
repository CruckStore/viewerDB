import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-semibold text-primary-dark mb-8">🔍 ViewerDB</h1>
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg-soft p-8">
        <SearchBar onSearch={onSearch} />
        {loading ? (
          <p className="mt-6 text-center text-lg text-gray-500 animate-pulse">Recherche en cours…</p>
        ) : (
          <ul className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {results.map((line, idx) => (
              <li
                key={idx}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg-soft transition-shadow duration-200"
              >
                <code className="block text-sm text-gray-700 break-words">{line}</code>
              </li>
            ))}
            {results.length === 0 && !loading && (
              <p className="mt-4 text-center text-gray-400">Aucun résultat.</p>
            )}
          </ul>
        )}
      </div>
      <footer className="mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ViewerDB
      </footer>
    </div>
  );
}

export default App;
