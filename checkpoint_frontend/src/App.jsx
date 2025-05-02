import { Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage/HomePage';
import GameDetailPage from './pages/GameDetailPage/GameDetailPage'
import ReviewPage from './pages/ReviewPage/ReviewPage'
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games/:id" element={<GameDetailPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
    </Routes>
  );
}
