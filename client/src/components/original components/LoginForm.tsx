import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ Ensure correct import
import { useNavigate } from "react-router-dom";
import "../assets/loginForm.css";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(username, password);
      setLoading(false);

      if (success) {
        navigate("/"); // ✅ Redirect on successful login
      } else {
        setError("Invalid username or password"); // ✅ Better error messaging
      }
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please try again later."); // ✅ General error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={!username || !password || loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
