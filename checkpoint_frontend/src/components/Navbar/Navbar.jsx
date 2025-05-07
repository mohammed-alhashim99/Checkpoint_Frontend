import { useNavigate, Link } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-api';
import { useEffect, useState } from "react";
import './styles.css';

// ✅ Theme Toggle Component
export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // استرجع الثيم من localStorage عند بداية التشغيل
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    // طبّق الـ class على body
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    // خزّن القيمة
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="game-btn outline"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

// ✅ Navbar Component
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
      <h2 className="logo">🎮checkPoint</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        {user ? (
          <>
            <li><Link to="/mygames">My Games</Link></li>
            <li>
              <form id="logout-form" onSubmit={handleLogout}>
                <button className='game-btn outline' type="submit">Log out</button>
              </form>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
        
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  );
}
