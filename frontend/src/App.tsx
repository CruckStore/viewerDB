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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Recherche SQL</h1>
        <SearchBar onSearch={onSearch} />
        {loading ? (
          <p className="text-center mt-4">Chargement...</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {results.map((line, idx) => (
              <li key={idx} className="p-2 bg-gray-100 rounded">
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;