import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import '../assets/navBar.css'; 

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="text-xl font-bold">
          Social Network
        </Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

