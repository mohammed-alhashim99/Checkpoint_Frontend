import { Link } from "react-router-dom";

export default function ReviewCard({ review, currentUser }) {
  const { game, user, rating, description, id } = review;

  if (!game) {
    return <p>❌ No game data available.</p>;
  }

  return (
    <div className="game-card">
      {game.image_url && (
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
      )}

      <h3 className="game-title">{game.game_name}</h3>
      <p>📅 {game.release_date}</p>
      <p>🎮 Platforms: {game.platform}</p>

      <p>👤 User: {user}</p>
      <p>⭐ User Rating: {rating}</p>
      <p>{description}</p>

      {currentUser?.username === user && (
        <div className="button-wrapper">
          <Link to={`/reviews/${id}/edit`} className="game-btn fill">✏️ Edit</Link>
          <Link to={`/reviews/${id}/delete`} className="game-btn outline">🗑️ Delete</Link>
        </div>
      )}
    </div>
  );
}
