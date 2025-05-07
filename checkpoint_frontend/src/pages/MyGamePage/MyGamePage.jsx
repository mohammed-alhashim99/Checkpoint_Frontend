import { useEffect, useState } from 'react';
import UserGameCard from '../../components/UserGameCard/UserGameCard';
import sendRequest from '../../utilities/sendRequest';

export default function MyGamesPage() {
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await sendRequest('/usergames/');
        setUserGames(data);
      } catch (err) {
        console.error('Failed to fetch user games:', err);
      }
    }
    fetchGames();
  }, []);

  return (
    <div>
      <h1>🎮 My Games</h1>
      <div className="game-card">
        {userGames.map((userGame) => (
          <UserGameCard
            key={userGame.id}
            userGame={userGame}
            refreshList={() => {
              
              sendRequest('/usergames/').then(setUserGames);
            }}
          />
        ))}
      </div>
    </div>
  );
}
