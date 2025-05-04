import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MyGamesPage from './pages/MyGamePage/MyGamePage';
import GameDetailsPage from './pages/GameDetailPage/GameDetailPage';
import ReviewsPage from './pages/ReviewPage/ReviewPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AddReviewPage from './pages/AddReviewPage/AddReviewPage';
import SignupPage from './pages/SignupPage/SignupPage';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mygames" element={<MyGamesPage />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />
        <Route path="/reviews" element={<ReviewsPage user={user} />} /> 
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/reviews/add" element={<AddReviewPage />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
      </Routes>

    </>
  );
}
