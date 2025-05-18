import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';

export default function App() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🔍 ViewerDB</h1>
      <SearchBar onSearch={onSearch} />
      {loading && <p style={{ textAlign: 'center', marginTop: 16 }}>Recherche en cours…</p>}
      {!loading && (
        <ul className="results-list">
          {results.length > 0
            ? results.map((line, idx) => (
                <li key={idx} className="result-item">
                  <code className="result-code">{line}</code>
                </li>
              ))
            : !loading && <li style={{ textAlign: 'center', color: '#666' }}>Aucun résultat.</li>}
        </ul>
      )}
    </div>
  );
}
