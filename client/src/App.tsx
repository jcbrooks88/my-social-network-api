import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import FriendsListPage from './pages/FriendsListPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from "./pages/LogoutPage";

import Footer from "./components/Footer";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';



const App = () => (
  <AuthProvider>
    <Router>

      <Navbar />
      
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends" element={<FriendsListPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Route>

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>

      <Footer />
      
    </Router>
  </AuthProvider>
);

export default App;
