import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import "./assets/style.css";


const UserInfo = () => {
  const { user, logout } = useAuth();
  return user ? (
    <div>
      <p>Welcome, {user}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <LoginForm />
  );
};

const App = () => (
  <AuthProvider>
  <Router>
    <Navbar />
    <UserInfo />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
</AuthProvider>
);

export default App;
