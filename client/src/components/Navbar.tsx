import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Ensure correct import
import { useState } from "react";
import "../assets/navBar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // ✅ No need to call `navigate("/login")` again
    setMenuOpen(false); // ✅ Ensure menu closes on mobile after logout
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          Social Network
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
      <ul className={`nav-right ${menuOpen ? "open" : ""}`}>
        {user ? (
          <>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            </li>
            <li>
              <Link to="/friends" onClick={() => setMenuOpen(false)}>Friends</Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button" type="button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
