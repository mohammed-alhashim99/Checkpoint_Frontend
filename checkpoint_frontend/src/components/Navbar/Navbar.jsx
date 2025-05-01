import { Link } from 'react-router-dom'
import './styles.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🎮 GameList</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">My Games</Link></li>
        <li><Link to="/completed">Completed</Link></li>
        <li><Link to="/uncompleted">Uncompleted</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  )
}
