import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext"; 

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminUser = { id: "admin", username }; // Assign an id for consistency
      setUser(adminUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

