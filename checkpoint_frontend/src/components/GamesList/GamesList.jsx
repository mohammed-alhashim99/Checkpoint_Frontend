import { useEffect, useState } from 'react';
import sendRequest from '../../utilities/sendRequest'; 

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
          <li key={game.id}>
            <strong>{game.game_name}</strong><br />
            Platform: {game.platform}<br />
            Release Date: {game.release_date}<br />
            Rating: {game.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
