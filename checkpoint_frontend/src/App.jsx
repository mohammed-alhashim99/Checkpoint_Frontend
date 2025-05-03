import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MyGamesPage from './pages/MyGamePage/MyGamePage';
import GameDetailsPage from './pages/GameDetailPage/GameDetailPage';
import ReviewsPage from './pages/ReviewPage/ReviewPage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mygames" element={<MyGamesPage />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />
        <Route path="/reviews" element={<ReviewsPage/>} />
      </Routes>
    </>
  );
}
