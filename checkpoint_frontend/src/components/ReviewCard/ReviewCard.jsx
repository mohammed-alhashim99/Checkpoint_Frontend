export default function ReviewCard({ review, currentUser, onEdit, onDelete }) {
  const { game, user, rating, description } = review;

  if (!game) {
    return <p>❌ No game data available.</p>;
  }

  console.log("currentUser:", currentUser?.username);
  console.log("review user:", user);

  return (
    <div className="review-card">
      {game.image_url && (
        <img
          src={game.image_url}
          alt={game.game_name}
          width="100%"
          style={{
            maxWidth: "400px",
            borderRadius: "8px",
            marginBottom: "10px"
          }}
        />
      )}

      <h3>{game.game_name}</h3>
      <p>📅 {game.release_date}</p>
      <p>🎮 Platform: {game.platform}</p>

      <p><strong>👤 Reviewer: {user}</strong></p>
      <p>⭐ User Rating: {rating}</p>
      <p>{description}</p>




      {currentUser?.username === user && (
        <div className="review-actions">
          <button onClick={() => onEdit(review)}>✏️ Edit</button>
          <button onClick={() => onDelete(review.id)}>🗑️ Delete</button>
        </div>
      )}

      <hr />
    </div>
  );
}
