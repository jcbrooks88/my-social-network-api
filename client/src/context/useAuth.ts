import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Ensuring correct file import

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
