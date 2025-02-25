import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Profile from "./pages/Profile";
import BlogLayout from "./pages/BlogLayout";
import LoginPage from './pages/LoginPage';


const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<BlogLayout />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
