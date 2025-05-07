import './styles.css'

import { useState } from 'react';

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:8000/search/?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div>
      <input
      className='search-input'
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a game..."
      />
      <button className='game-btn' onClick={handleSearch}>Search</button>
    </div>
  );
}
