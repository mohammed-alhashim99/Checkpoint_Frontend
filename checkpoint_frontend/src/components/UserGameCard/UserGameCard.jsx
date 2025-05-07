import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sendRequest from '../../utilities/sendRequest';

export default function UserGameCard({ userGame, refreshList, userReviews = [] }) {
  const { id, game, is_completed, playtime_hours } = userGame;
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const existingReview = userReviews.find(
    (review) => review.game?.game_id === game.game_id
  );

  const toggleStatus = async () => {
    try {
      await sendRequest(`/usergames/${id}/`, 'PATCH', {
        is_completed: !is_completed
      });
      refreshList();
    } catch (err) {
      console.error('Error updating game status:', err);
    }
  };

  const handlePlaytimeChange = async (e) => {
    const newHours = parseInt(e.target.value);
    if (isNaN(newHours)) return;

    try {
      await sendRequest(`/usergames/${id}/`, 'PATCH', {
        playtime_hours: newHours
      });
      refreshList();
    } catch (err) {
      console.error('Error updating playtime:', err);
    }
  };

  const handleReviewClick = () => {
    if (existingReview) {
      navigate(`/reviews/${existingReview.id}/edit`);
    } else {
      navigate("/reviews/add", {
        state: {
          gameId: game.game_id,
          gameName: game.game_name,
          imageUrl: game.image_url
        }
      });
    }
  };

  const handleDelete = async () => {
    try {
      await sendRequest(`/usergames/${id}/`, 'DELETE');
      refreshList();
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  };

  return (
    <div className="game-card">
      <img
        src={game.image_url}
        alt={game.game_name}
        style={{
          height: "300px",
          width: "100%",
          objectFit: "cover",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255, 0.2)",
          marginBottom: "10px"
        }}
      />

      <h3 className="game-title">{game.game_name}</h3>

      <p>
        ⏱️ Playtime:
        <input
          type="number"
          value={playtime_hours}
          onChange={handlePlaytimeChange}
          style={{
            width: "60px",
            marginLeft: "8px",
            borderRadius: "6px",
            padding: "4px",
            border: "1px solid #ccc"
          }}
        />
        hours
      </p>

      <p>Status: {is_completed ? '✅ Completed' : '⏳ Not Completed'}</p>

      <div className="button-wrapper">
        <button onClick={toggleStatus} className="game-btn fill">
          {is_completed ? 'Mark as Not Completed' : 'Mark as Completed'}
        </button>

        <button onClick={handleReviewClick} className="game-btn outline">
          {existingReview ? '✏️ Edit Review' : '✍️ Review this Game'}
        </button>

        {showDeleteConfirm ? (
          <div className="delete-confirm-box" style={{ marginTop: '16px' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>DELETE GAME</h3>
            <p style={{ color: 'white', fontSize: '0.9rem', marginBottom: '16px' }}>
              Are you sure you want to delete this game?
            </p>
            <div className="button-wrapper">
              <button onClick={() => setShowDeleteConfirm(false)} className="game-btn outline">
                Cancel
              </button>
              <button onClick={handleDelete} className="game-btn fill" style={{ marginLeft: '10px' }}>
                Yes - Delete
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="game-btn outline"
            style={{ marginTop: '10px' }}
          >
            🗑️ Delete Game
          </button>
        )}
      </div>
    </div>
  );
}
