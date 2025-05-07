import { useNavigate, Link } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-api';
import './styles.css';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    usersAPI.logout();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <h2 className="logo">🎮 GameTracker</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        {user ? (
          <>
            <li><Link to="/mygames">My Games</Link></li>
            <form id="logout-form" onSubmit={handleLogout}>
              <button className='game-btn' type="submit">Log out</button>
            </form>
          </>
        ) : (
          <>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
