export default function ReviewCard({ review }) {
        const { game, user, rating, description } = review;
      
        return (
          <div className="review-card">
            <img src={game.image_url} alt={game.game_name} width="200" />
            <h3>{game.game_name}</h3>
            <p>📅 {game.release_date}</p>
            <p>🎮 Platform: {game.platform}</p>
            <p>⭐ Game Rating: {game.rating}</p>
      
            <p><strong>👤 Reviewer {user}:</strong></p>
            <p>{rating}</p>
            <p>{description}</p>
            <hr />
          </div>
        );
      }
      