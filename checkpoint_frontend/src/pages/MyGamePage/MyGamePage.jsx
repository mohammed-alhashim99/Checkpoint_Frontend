import { useEffect, useState } from 'react';
import UserGameCard from '../../components/UserGameCard/UserGameCard';
import sendRequest from '../../utilities/sendRequest';

export default function MyGamesPage({ currentUser }) {
  const [userGames, setUserGames] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    loadUserGames();
    loadAllReviews();
  }, []);

  async function loadUserGames() {
    try {
      const data = await sendRequest('/usergames/');
      setUserGames(data);
    } catch (err) {
      console.error('Failed to fetch user games:', err);
    }
  }

  async function loadAllReviews() {
    try {
      const reviews = await sendRequest('/reviews/');
      setAllReviews(reviews);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  }

  return (
    <div>
      <h1 className="page-title">🎮 My Games</h1>
      <div className="game-list">
        {userGames.map((userGame) => (
          <UserGameCard
            key={userGame.id}
            userGame={userGame}
            refreshList={loadUserGames}
            userReviews={allReviews.filter(
              (r) => r.user === currentUser?.username && r.game?.game_id === userGame.game?.game_id
            )}
          />
        ))}
      </div>
    </div>
  );
}
