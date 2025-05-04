import { useEffect, useState } from 'react';
import sendRequest from '../../utilities/sendRequest';
import GameCard from '../GameCard/GameCard';

export default function GamesList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await sendRequest('/games');
        setGames(data);
      } catch (err) {
        console.error('Failed to load games:', err);
      }
    }

    fetchGames();
  }, []);

  if (!games.length) return <p>No games found.</p>;

  return (
    <div>
      <h2>All Games</h2>
      <ul>
        {games.map((game) => (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
