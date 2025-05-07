import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function GameDetails({ reviews, user }) {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const game = location.state?.game;

  const [userReview, setUserReview] = useState(null);

  const gameReviews = reviews.filter(r => {
    const reviewGameId = typeof r.game === 'object' ? r.game.game_id : r.game;
    return reviewGameId === parseInt(gameId);
  });

  useEffect(() => {
    if (user) {
      const match = gameReviews.find(r => r.user === user.username || r.user?.username === user.username);
      if (match) setUserReview(match);
    }
  }, [user, gameReviews]);

  if (!game) return <p>❌ Game not found in state</p>;

  return (
    <div className="game-details" style={{ padding: '20px' }}>
      <h2>{game.game_name}</h2>
      <img
        src={game.image_url}
        alt={game.game_name}
        style={{ maxWidth: '400px', borderRadius: '8px' }}
      />
      <p><strong>Release Date:</strong> {game.release_date}</p>
      <p><strong>Rating:</strong> {game.rating}</p>
      <p><strong>Platform:</strong> {game.platform}</p>

      <h3 style={{ marginTop: '20px' }}>Reviews:</h3>
      {gameReviews.length > 0 ? (
        <ul>
          {gameReviews.map((review) => (
            <li key={review.id} style={{ marginBottom: '15px' }}>
              <p><strong>Rating:</strong> {review.rating} / 5</p>
              <p><strong>Description:</strong> {review.description}</p>
              <p><strong>User:</strong> {review.user?.username || review.user}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews for this game yet.</p>
      )}

      {user && (
        <button
          onClick={() => {
            if (userReview) {
              navigate(`/reviews/${userReview.id}/edit`);
            } else {
              navigate('/reviews/add', {
                state: {
                  gameId: game.game_id,
                  gameName: game.game_name,
                  imageUrl: game.image_url
                }
              });
            }
          }}
          style={{ marginTop: '20px' }}
        >
          {userReview ? 'Edit Review' : 'Add Review'}
        </button>
      )}
    </div>
  );
}
