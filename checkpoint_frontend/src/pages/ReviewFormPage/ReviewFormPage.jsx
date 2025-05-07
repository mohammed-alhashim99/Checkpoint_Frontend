import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import * as reviewAPI from "../../utilities/review-api";

export default function ReviewFormPage({ createReview, editReview, deleteReview }) {
  const initialState = { rating: 0, description: "", game: "" };
  const [formData, setFormData] = useState(initialState);
  const [currReview, setCurrReview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedGameId = location.state?.gameId;
  const passedGameName = location.state?.gameName;
  const passedImage = location.state?.imageUrl;

  useEffect(() => {
    async function getReview() {
      try {
        const review = await reviewAPI.show(id);
        setFormData({
          rating: review.rating,
          description: review.description,
          game: typeof review.game === "object" ? review.game.id : review.game,
        });
        setCurrReview(review);
      } catch (err) {
        console.log(err);
      }
    }

    if ((editReview || deleteReview) && id) getReview();
    if (createReview && passedGameId) {
      setFormData(prev => ({ ...prev, game: passedGameId }));
    }
  }, [id, createReview, passedGameId]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (editReview) {
        await reviewAPI.update(id, formData);
      } else {
        const allGames = await reviewAPI.getGames();
        let gameObj = allGames.find(g => g.game_id === passedGameId);

        if (!gameObj) {
          gameObj = await reviewAPI.addGame({
            game_id: passedGameId,
            game_name: passedGameName,
            release_date: '2023-01-01',
            rating: 0,
            platform: 'Unknown',
            image_url: passedImage || ''
          });
        }

        const reviewData = { ...formData, game: gameObj.id };
        await reviewAPI.create(reviewData);
      }

      navigate("/reviews");
    } catch (err) {
      console.log("Error saving review:", err);
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    try {
      await reviewAPI.deleteReview(id);
      navigate("/reviews");
    } catch (err) {
      console.log("Error deleting review:", err);
    }
  }

  if ((editReview || deleteReview) && !currReview) return <h1>Loading...</h1>;

  if (deleteReview && currReview) {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleDelete} className="auth-form-box">
          <h2>Delete Review</h2>
          <p>Are you sure you want to delete this review?</p>
          <div className="button-wrapper">
            <Link to="/reviews" className="game-btn outline">Cancel</Link>
            <button type="submit" className="game-btn fill">Yes - Delete</button>
          </div>
        </form>
      </div>
    );
  }

  return (
        <div className="auth-form-container">
    <form onSubmit={handleSubmit} className="auth-form-box">
      {(passedImage || currReview?.game?.image_url) && (
        <img
          src={passedImage || currReview.game.image_url}
          alt={passedGameName || currReview.game.game_name}
          style={{
            height: "250px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        />
      )}
        <h2>{editReview ? "Edit Review" : "Add Review"}</h2>

        <label>Rating (0–5):</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          maxLength="250"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />

        <button type="submit" className="game-btn fill">
          {editReview ? "Update Review" : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
