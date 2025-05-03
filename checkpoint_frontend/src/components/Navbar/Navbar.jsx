import { Link } from 'react-router-dom';
import './styles.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🎮 GameTracker</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mygames">My Games</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>
    </nav>
  );
}
