import { useEffect, useState } from 'react';
import sendRequest from '../../utilities/sendRequest';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

export default function ReviewsPage({ user }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await sendRequest('/reviews/');
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    }

    fetchReviews();
  }, []);

  async function handleDeleteReview(reviewId) {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    try {
      await sendRequest(`/reviews/${reviewId}/`, 'DELETE');
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete the review.");
    }
  }

  function handleEditReview(review) {
    alert(`Edit review (id: ${review.id}) - not implemented yet`);
    console.log("Editing review:", review);
  }

  return (
    <div>
      <h1>📝 All Reviews</h1>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUser={user}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
        />
      ))}
    </div>
  );
}
