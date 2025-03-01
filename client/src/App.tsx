import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import FriendsListPage from "./pages/FriendsListPage";
import LoginPage from "./pages/LoginPage";
import ThoughtPage from "./pages/ThoughtPage";

//import Navbar from "./components/Navbar";
import NavBarUpdate from "./components/NavBarUpdate";
import Footer from "./components/FooterUpdate";
import ProtectedRoute from "./components/ProtectedRoute";


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
    <Route path="/thoughts" element={<ThoughtPage />} />
    
  </Route>

  {/* Catch-all route to redirect unknown paths to login */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>


      <Footer />
    </>
  );
};

export default App;
