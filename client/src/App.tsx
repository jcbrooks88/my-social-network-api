import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
// import UserInfo from "./components/UserInfo";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BlogLayout from "./pages/BlogLayout";


const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<BlogLayout />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
