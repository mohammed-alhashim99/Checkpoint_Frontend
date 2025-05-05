import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MyGamesPage from './pages/MyGamePage/MyGamePage';
import GameDetailsPage from './pages/GameDetailPage/GameDetailPage';
import ReviewFormPage from './pages/ReviewFormPage/ReviewFormPage';
import ReviewsPage from './pages/ReviewPage/ReviewPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

import { getUser } from './utilities/users-api';

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      const u = await getUser();
      setUser(u);
    }
    fetchUser();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/mygames" element={<MyGamesPage />} />
            <Route path="/games/:id" element={<GameDetailsPage />} />
            <Route path="/reviews" element={<ReviewsPage user={user} />} />
            <Route path="/reviews/add" element={<ReviewFormPage createReview={true} />} />
            <Route path="/reviews/:id/edit" element={<ReviewFormPage editReview={true} />} />
            <Route path="/reviews/:id/delete" element={<ReviewFormPage deleteReview={true} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/reviews" element={<ReviewsPage user={user} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </main>
    </>
  );
}
