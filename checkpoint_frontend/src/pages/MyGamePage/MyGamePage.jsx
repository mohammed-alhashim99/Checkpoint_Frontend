import { useEffect, useState } from 'react';
import sendRequest from '../../utilities/sendRequest'; 

export default function MyGamesPage() {
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    async function fetchUserGames() {
      try {
        const data = await sendRequest('/usergames');
        setUserGames(data);
      } catch (err) {
        console.error('Error loading user games:', err);
      }
    }

    fetchUserGames();
  }, []);

  if (!userGames.length) return <p>No games added to your list yet.</p>;

  return (
    <div>
      <h2>🎮 My Games</h2>
      <ul>
        {userGames.map((ug) => (
          <li key={ug.id}>
            Game ID: {ug.game} <br />
            Completed: {ug.is_completed ? '✅' : '❌'} <br />
            Playtime: {ug.playtime_hours}h <br />
            Added at: {new Date(ug.added_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
