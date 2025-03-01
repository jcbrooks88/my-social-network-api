import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import FriendsListPage from "./pages/FriendsListPage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";

//import Navbar from "./components/Navbar";
import NavBarUpdate from "./components/NavBarUpdate";
import Footer from "./components/FooterUpdate";
import ProtectedRoute from "./components/ProtectedRoute";

// import './assets/global.css';

const App = () => {
  return (
    <>
      <NavBarUpdate />

      <Routes>
  {/* Public route for login */}
  <Route path="/login" element={<LoginPage />} />

  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/friends" element={<FriendsListPage />} />
    <Route path="/blog" element={<BlogPage />} />
    
  </Route>

  {/* Catch-all route to redirect unknown paths to login */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>


      <Footer />
    </>
  );
};

export default App;
