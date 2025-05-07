import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import GameCard from '../../components/GameCard/GameCard';
import './styles.css'
export default function HomePage({ user }) {
  const [results, setResults] = useState([]);

  return (
    <div className='container'>
      <h1 className='page-title'>🎮 Explore Games</h1>
      <SearchBar setResults={setResults} />
      <div className="game-list">
        {results.map((game, idx) => (
          <GameCard key={idx} game={game} user={user} />
        ))}
      </div>
    </div>
  );
}
