import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import "../assets/logoutPage.css";

const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout(); // Trigger logout on component mount
  }, [logout]);

  return (
    <div className="logout-container">
      <h1>Come back soon!</h1>
      <LoginForm />
    </div>
  );
};

export default LogoutPage;
