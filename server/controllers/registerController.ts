import { Request, Response } from "express";
import User from "../src/models/User.js"; // <-- Ensure .js extension
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET!, // Ensure process.env.JWT_SECRET is set properly in your environment
      { expiresIn: "1h" }
    );

    // Send response
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
