import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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
  const [user, setUser] = useState(getUser());
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />


        <Route path="/mygames" element={<MyGamesPage />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />


        <Route path="/reviews" element={<ReviewsPage user={user} />} />
        <Route path="/reviews/add" element={<ReviewFormPage createReview={true} />} />
        <Route path="/reviews/:id/edit" element={<ReviewFormPage editReview={true} />} />
        <Route path="/reviews/:id/delete" element={<ReviewFormPage deleteReview={true} />} />




        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
      </Routes>

    </>
  );
}
