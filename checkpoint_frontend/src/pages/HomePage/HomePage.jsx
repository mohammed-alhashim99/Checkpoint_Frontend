import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import GameCard from '../../components/GameCard/GameCard';
import './styles.css';

export default function HomePage({ user }) {
  const [results, setResults] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);

  const gameSlugs = [
    'elden-ring',
    'grand-theft-auto-v',
    'call-of-duty-modern-warfare-iii',
    'ea-sports-fc-24',
    'wwe-2k23'
  ];

  const API_KEY = '2879074ca318435d949256865979750e';

  useEffect(() => {
    async function fetchFeaturedGames() {
      try {
        const responses = await Promise.all(
          gameSlugs.map(slug =>
            fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
              .then(res => res.json())
          )
        );
        setFeaturedGames(responses);
      } catch (err) {
        console.error('Error fetching featured games:', err);
      }
    }

    fetchFeaturedGames();
  }, []);

  return (
    <div className='container'>
      <h1 className='page-title'>🎮 Explore Games</h1>

      <SearchBar setResults={setResults} />


      {results.length === 0 ? (
        <>
          <div className="game-list">
            {featuredGames.map((game, idx) => (
              <GameCard key={idx} game={game} user={user} />
            ))}
          </div>
        </>
      ) : (
        <div className="game-list">
          {results.map((game, idx) => (
            <GameCard key={idx} game={game} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
