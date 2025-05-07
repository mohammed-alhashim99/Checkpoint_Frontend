import { useEffect, useState } from "react";
import sendRequest from "../../utilities/sendRequest";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

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

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="page-title">🎮 All Reviews</h1>
      <div className="game-list">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
}
