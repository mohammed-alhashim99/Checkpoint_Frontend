import { useState } from 'react';
import sendRequest from '../../utilities/sendRequest'; 

export default function GameSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:8000/search/?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleAddGame = async (game) => {
    const newGame = {
      game_name: game.name,
      release_date: game.released,
      rating: game.rating,
      platform: game.platforms.join(', ')
    };

    try {
      await sendRequest('/games/', 'POST', newGame);
      alert('Game added!');
    } catch (err) {
      console.error('Add error:', err);
      alert('Failed to add game.');
    }
  };

  return (
    <div>
      <h2>Search for a Game</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search by name"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((game, idx) => (
          <li key={idx} style={{ marginBottom: '2rem' }}>
            <img src={game.image} alt={game.name} width="200" />
            <div>
              <strong>{game.name}</strong> ({game.released}) - Rating: {game.rating}
              <br />
              Platforms: {game.platforms.join(', ')}
              <br />
              <button onClick={() => handleAddGame(game)}>Add</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
