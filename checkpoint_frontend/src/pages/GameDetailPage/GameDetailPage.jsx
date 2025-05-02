import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GamesList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/games/')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Games</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <strong>{game.title}</strong> - {game.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}
