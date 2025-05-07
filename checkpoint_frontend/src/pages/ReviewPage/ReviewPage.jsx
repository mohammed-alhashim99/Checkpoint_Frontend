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

  // ⬇️ دمج المراجعات حسب اللعبة
  const reviewsByGame = {};
  for (const review of reviews) {
    const gameId = review.game?.game_id;
    if (!reviewsByGame[gameId]) {
      reviewsByGame[gameId] = {
        game: review.game,
        reviews: []
      };
    }
    reviewsByGame[gameId].reviews.push(review);
  }

  return (
    <div>
      <h1 className="page-title">🎮 All Reviews</h1>
      <div className="game-list">
        {Object.values(reviewsByGame).map(({ game, reviews }) => (
          <div key={game.game_id} className="game-card">
            <img
              src={game.image_url}
              alt={game.game_name}
              style={{
                height: "300px",
                width: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255, 0.255)",
                marginBottom: "10px"
              }}
            />
            <h3 className="game-title">{game.game_name}</h3>
            <p>📅 {game.release_date}</p>
            <p>🎮 Platforms: {game.platform}</p>

            {reviews.map((review) => (
              <div key={review.id}>
                <p>👤 User: {review.user}</p>
                <p>⭐ User Rating: {review.rating}</p>
                <p>{review.description}</p>
                {user?.username === review.user && (
                  <div className="button-wrapper">
                    <Link to={`/reviews/${review.id}/edit`} className="game-btn fill">✏️ Edit</Link>
                    <Link to={`/reviews/${review.id}/delete`} className="game-btn outline">🗑️ Delete</Link>
                  </div>
                )}
                
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
