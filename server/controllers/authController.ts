import { Request, Response } from "express";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const defaultUsername = process.env.DEFAULT_USERNAME || "admin";
const defaultPassword = process.env.DEFAULT_PASSWORD || "password123";
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // ✅ Check for default credentials login
    if (username === defaultUsername && password === defaultPassword) {
      const token = jwt.sign({ id: "default-id", username: defaultUsername }, jwtSecret, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login successful with default credentials",
        token,
        user: { id: "default-id", username: defaultUsername },
      });
    }

    // Check the database if not default login
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    // Handle unexpected errors
    console.error("Login failed:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
