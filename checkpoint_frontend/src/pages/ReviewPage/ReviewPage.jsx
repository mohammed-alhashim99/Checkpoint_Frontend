import { useEffect, useState } from 'react';
import sendRequest from '../../utilities/sendRequest';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

export default function ReviewsPage() {
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

  return (
    <div>
      <h1>📝 All Reviews</h1>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
