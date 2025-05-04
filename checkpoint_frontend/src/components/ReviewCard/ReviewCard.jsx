export default function ReviewCard({ review }) {
  const { game, user, rating, description } = review;

  console.log("Image URL:", game.image_url);


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

      <p><strong>👤 Reviewer {user}:</strong></p>
      <p>⭐ User Rating: {rating}</p>
      <p>{description}</p>

      <hr />
    </div>
  );
}
