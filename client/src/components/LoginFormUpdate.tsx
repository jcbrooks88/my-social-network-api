import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Ensure correct import
import { useNavigate } from "react-router-dom";
//import "../assets/loginForm.css";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_error, setError] = useState("");
  const [_loading, setLoading] = useState(false);

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername (e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">
            Forgot password?
          </a>
        </div>
        <div className="text-center mt-2">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-decoration-none">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
