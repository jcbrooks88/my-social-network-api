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
        
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/blog">Blog</Link>

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

