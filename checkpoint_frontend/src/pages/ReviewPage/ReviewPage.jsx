import { useEffect, useState } from "react";
import sendRequest from "../../utilities/sendRequest";
import { Link } from "react-router-dom";

export default function ReviewsPage({ user }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await sendRequest("/reviews/");
        setReviews(res);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    }
    fetchReviews();
  }, []);

 
  const reviewsByGame = {};
  for (const review of reviews) {
    const gameId = typeof review.game === 'object' ? review.game.game_id : null;
    if (!reviewsByGame[gameId]) reviewsByGame[gameId] = {
      game: review.game,
      reviews: []
    };
    reviewsByGame[gameId].reviews.push(review);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎮 All Reviews</h1>

      {Object.values(reviewsByGame).map(({ game, reviews }) => (
        <div key={game.game_id} style={{ marginBottom: '40px' }}>
          <img
            src={game.image_url}
            alt={game.game_name}
            style={{ maxWidth: '400px', borderRadius: '8px' }}
          />
          <h2>{game.game_name}</h2>
          <p><strong>📅</strong> {game.release_date}</p>
          <p><strong>🕹️ Platform:</strong> {game.platform}</p>

          {reviews.map((review) => (
            <div key={review.id} style={{ marginTop: '10px', marginLeft: '20px' }}>
              <p><strong>👤 User:</strong> {review.user}</p>
              <p><strong>⭐ User Rating:</strong> {review.rating}</p>
              <p>{review.description}</p>

              {user?.username === review.user && (
                <div>
                  <Link to={`/reviews/${review.id}/edit`} style={{ marginRight: '10px' }}>✏️ Edit</Link>
                  <Link to={`/reviews/${review.id}/delete`} style={{ color: 'red' }}>🗑️ Delete</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
