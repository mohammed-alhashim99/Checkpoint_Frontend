import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MyGamesPage from './pages/MyGamePage/MyGamePage';
import UserProfile from './pages/UserProfile/UserProfile';
import ReviewFormPage from './pages/ReviewFormPage/ReviewFormPage';
import ReviewsPage from './pages/ReviewPage/ReviewPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import GameDetails from './components/GameDetails/GameDetails';
import VerifyOtpPage from './pages/VerifyOtpPage/VerifyOtpPage';

import { getUser } from './utilities/users-api';
import sendRequest from './utilities/sendRequest';

export default function App() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [games, setGames] = useState([]);

  // ✅ تحميل المستخدم من localStorage
  useEffect(() => {
    const u = getUser(); // ما يحتاج async لأنه من localStorage
    setUser(u);
  }, []);

  // ✅ تحميل التقييمات
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

  // ✅ تحميل الألعاب
  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await sendRequest('/games/');
        setGames(data);
      } catch (err) {
        console.error('Error fetching games:', err);
      }
    }
    fetchGames();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/mygames" element={<MyGamesPage currentUser={user} />} />
            <Route path="/games/:gameId" element={<GameDetails reviews={reviews} user={user} />} />
            <Route path="/reviews" element={<ReviewsPage user={user} />} />
            <Route path="/reviews/add" element={<ReviewFormPage createReview={true} />} />
            <Route path="/reviews/:id/edit" element={<ReviewFormPage editReview={true} />} />
            <Route path="/reviews/:id/delete" element={<ReviewFormPage deleteReview={true} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/games/:gameId" element={<GameDetails reviews={reviews} games={games} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/games/:gameId" element={<GameDetails reviews={reviews} games={games} />} />
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/reviews" element={<ReviewsPage user={user} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            <Route path="/verify-otp" element={<VerifyOtpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </main>
    </>
  );
}
