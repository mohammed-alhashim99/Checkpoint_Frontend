import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as reviewAPI from "../../utilities/review-api";

export default function ReviewFormPage({ createReview, editReview, deleteReview }) {
  const initialState = {
    rating: 0,
    description: "",
    game: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [currReview, setCurrReview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
  }, [id]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (editReview) {
        await reviewAPI.update(id, formData);
      } else {
        await reviewAPI.create(formData);
      }

      // ✅ يرجع إلى صفحة المراجعات
      navigate("/reviews");
    } catch (err) {
      console.log("Error saving review:", err);
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    try {
      await reviewAPI.deleteReview(id);
      // ✅ يرجع إلى صفحة المراجعات بعد الحذف
      navigate("/reviews");
    } catch (err) {
      console.log("Error deleting review:", err);
    }
  }

  if ((editReview || deleteReview) && !currReview) return <h1>Loading...</h1>;

  if (deleteReview && currReview) return (
    <>
      <h1>Delete Review</h1>
      <p>Are you sure you want to delete this review?</p>
      <form onSubmit={handleDelete}>
        <Link to="/reviews" className="btn secondary">Cancel</Link>
        <button type="submit" className="btn danger">Yes - Delete</button>
      </form>
    </>
  );

  return (
    <>
      <h1>{editReview ? "Edit Review" : "Add Review"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="10"
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
        />
        {createReview && (
          <>
            <label>Game ID:</label>
            <input
              type="number"
              name="game"
              value={formData.game}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">{editReview ? "Update Review" : "Submit Review"}</button>
      </form>
    </>
  );
}
