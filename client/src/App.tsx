import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import BlogLayout from "./pages/BlogLayout"; // Import the BlogLayout
import "./assets/style.css";

const UserInfo = () => {
  const { user } = useAuth();

  const capitalizeFirstLetter = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return user ? (
    <div>
      <p>Hello, {capitalizeFirstLetter(user)}!</p>
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
        <Route path="/blog" element={<BlogLayout />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
