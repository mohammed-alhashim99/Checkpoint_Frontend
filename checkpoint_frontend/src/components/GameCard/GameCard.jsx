import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sendRequest from "../../utilities/sendRequest";

export default function GameCard({ game, user }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userReview, setUserReview] = useState(null);

  const newGameObj = {
    game_id: game.game_id,
    game_name: game.name,
    release_date: game.released,
    rating: game.rating,
    platform: Array.isArray(game.platforms)
      ? game.platforms.map(p => (p.platform?.name || p.name || p)).join(', ')
      : '',
    image_url: game.background_image || game.image,
  };

  useEffect(() => {
    async function checkUserReview() {
      if (!user) return;
      try {
        const allReviews = await sendRequest('/reviews/');
        const match = allReviews.find(
          r => r.user === user.username && (
            (typeof r.game === 'object' && r.game.game_id === newGameObj.game_id) ||
            r.game === newGameObj.game_id
          )
        );
        if (match) setUserReview(match);
      } catch (err) {
        console.error("Error checking review:", err);
      }
    }

    checkUserReview();
  }, [user, newGameObj.game_id]);

  const handleGoToDetails = () => {
    navigate(`/games/${game.game_id}`, {
      state: { game: newGameObj }
    });
  };

  const handleAdd = async (e) => {
    e.stopPropagation();
    setMessage('');
    try {
      const allGames = await sendRequest('/games/');
      const existing = allGames.find(g => g.game_id === newGameObj.game_id);
      const gameToUse = existing
        ? existing
        : await sendRequest('/games/', 'POST', newGameObj);

      await sendRequest('/usergames/', 'POST', {
        game: gameToUse.id,
        is_completed: false,
        playtime_hours: 0
      });

      setMessage('✅ Game added to My Games!');
    } catch (err) {
      console.error('Add error:', err);
      const msg = err.message.toLowerCase();
      if (msg.includes('already') || msg.includes('exists') || msg.includes('you already added')) {
        setMessage('⚠️ This game is already in your list.');
      } else {
        setMessage('❌ Failed to add game.');
      }
    }
  };

  const handleReview = async (e) => {
    e.stopPropagation();
    setMessage('');
    try {
      const allGames = await sendRequest('/games/');
      let gameObj = allGames.find(g => g.game_id === newGameObj.game_id);

      if (!gameObj) {
        gameObj = await sendRequest('/games/', 'POST', newGameObj);
      }

      if (userReview) {
        navigate(`/reviews/${userReview.id}/edit`);
      } else {
        navigate('/reviews/add', {
          state: {
            gameId: gameObj.game_id,
            gameName: gameObj.game_name,
            imageUrl: gameObj.image_url
          }
        });
      }
    } catch (err) {
      console.error('Error preparing review:', err);
      setMessage('❌ Could not prepare review.');
    }
  };

  return (
    <div className="game-card" onClick={handleGoToDetails} style={{ cursor: 'pointer' }}>
      <img
        src={newGameObj.image_url}
        alt={game.name}
        className="game-card-img"
      />
      <div className="game-card-content">
        <h3 className="game-title">{game.name}</h3>
        <p className="game-info">Released: {game.released}</p>
        <p className="game-info">Platforms: {newGameObj.platform}</p>
        <p className="game-info">Rating: {game.rating || 'N/A'}</p>

        {user && (
          <div className="game-card-buttons">
            <button className="game-btn" onClick={handleAdd}>Add to My Games</button>
            <button className="game-btn" onClick={handleReview}>
              {userReview ? 'Edit Review' : 'Add Review'}
            </button>
          </div>
        )}

        {message && <p className="game-message">{message}</p>}
      </div>
    </div>
  );
}
