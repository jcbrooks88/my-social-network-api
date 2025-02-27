import { createContext, ReactNode, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // To handle login error

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Invalid credentials. Please try again.");
        return false;
      }

      const data = await response.json();
      const loggedInUser = { id: data.id, username: data.username };

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", data.token);

      setUser(loggedInUser);
      setIsAuthenticated(true);
      setError(null); // Clear any previous error on successful login
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred. Please try again later.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Instead of useNavigate, use a direct window redirect
    window.location.href = "/login"; // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>; // Prevents rendering before auth state is checked
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
      {children}
    </AuthContext.Provider>
  );
};
