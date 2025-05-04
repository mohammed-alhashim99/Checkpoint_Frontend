import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import sendRequest from "../../utilities/sendRequest";

export default function AddReviewPage() {
  const { state } = useLocation(); // يحتوي على gameId, gameName
  const navigate = useNavigate();

  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest('/reviews/', 'POST', {
        game: state.gameId,
        rating,
        description
      });
      alert('✅ Review submitted!');
      navigate('/mygames'); // أو أي صفحة ترجع لها
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Failed to submit review");
    }
  };

  return (
    <div className="review-form-container">
      <h2>Add Review</h2>

      {/* ✅ صورة اللعبة فقط */}
      <div className="game-image-preview">
        <img
          src={state?.gameImage || 'https://via.placeholder.com/300x200'}
          alt={state?.gameName}
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value="(auto from token)" disabled />
        </div>

        <div>
          <label>Rating 1-5:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
