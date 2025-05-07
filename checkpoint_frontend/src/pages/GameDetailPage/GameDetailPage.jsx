import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // ✅ أضف useLocation
import sendRequest from '../../utilities/sendRequest';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

export default function GameDetailsPage() {
  const { id } = useParams();
  const location = useLocation(); // ✅
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', description: '' });

  useEffect(() => {
    async function fetchGame() {
      const data = await sendRequest(`/games/${id}/`);
      setGame(data);
    }

    async function fetchReviews() {
      const allReviews = await sendRequest('/reviews/');
      const filtered = allReviews.filter((r) => {
       
        const gameId = typeof r.game === 'object' ? r.game.id : r.game;
        return gameId === parseInt(id);
      });
      setReviews(filtered);
    }

    fetchGame();
    fetchReviews();
  }, [id, location.key]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest('/reviews/', 'POST', {
        ...newReview,
        rating: parseFloat(newReview.rating),
        game: parseInt(id),
        user: 1,
      });
      setNewReview({ rating: '', description: '' });

     
      const updated = await sendRequest('/reviews/');
      const filtered = updated.filter((r) => {
        const gameId = typeof r.game === 'object' ? r.game.id : r.game;
        return gameId === parseInt(id);
      });
      setReviews(filtered);
    } catch (err) {
      console.error('Failed to add review:', err);
    }
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <h1>{game.game_name}</h1>
      <img src={game.image_url} alt={game.game_name} width="300" />
      <p>Release Date: {game.release_date}</p>
      <p>Platform: {game.platform}</p>
      <p>Rating: {game.rating}</p>

      <hr />

      <h2>📝 Reviews</h2>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}

      <form onSubmit={handleSubmit}>
        <h3>Add a Review</h3>
        <input
          type="number"
          placeholder="Rating"
          step="0.1"
          max="5"
          min="0"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          required
        />
        <textarea
          placeholder="Write your review..."
          value={newReview.description}
          onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
