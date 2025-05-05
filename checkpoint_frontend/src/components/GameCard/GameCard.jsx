import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sendRequest from '../../utilities/sendRequest';

export default function GameCard({ game, user }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const newGameObj = {
    game_name: game.name,
    release_date: game.released,
    rating: game.rating,
    platform: Array.isArray(game.platforms)
      ? game.platforms.map(p => (p.platform?.name || p.name || p)).join(', ')
      : '',
    image_url: game.background_image || game.image,
  };

  const handleAdd = async () => {
    setMessage('');
    try {
      const allGames = await sendRequest('/games/');
      const existing = allGames.find(g => g.game_name === newGameObj.game_name);

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

      if (
        msg.includes('already') ||
        msg.includes('exists') ||
        msg.includes('you already added')
      ) {
        setMessage('⚠️ This game is already in your list.');
      } else {
        setMessage('❌ Failed to add game.');
      }
    }
  };

  const handleReview = async () => {
    setMessage('');
    try {
      const createdGame = await sendRequest('/games/', 'POST', newGameObj);

      navigate('/reviews/add', {
        state: {
          gameId: createdGame.id,
          gameName: createdGame.game_name,
          gameImage: createdGame.image_url
        }
      });
    } catch (err) {
      console.error('Error preparing review:', err);
      setMessage('❌ Could not prepare review.');
    }
  };

  return (
    <div className="game-card">
      <img src={game.image_url || game.background_image || game.image} alt={game.name} />
      <h3>{game.name}</h3>
      <p>Released: {game.released}</p>
      <p>Platforms: {newGameObj.platform}</p>
      <p>Rating: {game.rating || 'N/A'}</p>

      {user && (
        <>
          <button onClick={handleAdd}>Add to My Games</button>
          <button onClick={handleReview}>Add Review</button>
        </>
      )}

      {message && <p style={{ marginTop: '10px', color: '#555' }}>{message}</p>}
    </div>
  );
}
