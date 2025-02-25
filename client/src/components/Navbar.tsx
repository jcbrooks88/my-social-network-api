import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import '../assets/navBar.css'; 

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user and logout from the context

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="text-xl font-bold">
          Social Network
        </Link>
      </div>
      <div>
        {/* If user is logged in, show navigation links and logout button */}
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
          // If user is not logged in, show Login link
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
