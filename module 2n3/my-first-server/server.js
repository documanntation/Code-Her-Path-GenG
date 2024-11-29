import express from "express";
import mongoose from "mongoose";
import "./db.js"; // Database connection
import User from "./models/User.js"; // User model
import dotenv from "dotenv";
import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express(); // Create Express application
const PORT = 3000; // Set port

app.use(express.json()); // Middleware to parse JSON

// Base routes
app.get("/", (req, res) => {
  res.send("Halo, GenGs! Selamat datang di server pertama kamu!🚀");
});

app.get("/about", (req, res) => {
  res.send(
    "Hello World! Kamu sudah belajar backend dengan Node.js dan Express.🔥"
  );
});

// API routes
app.get("/api/halo", (req, res) => {
  res.json({ message: "Halo, GenGs! Ini respons dari server. 🎉" });
});

app.post("/api/kirim", (req, res) => {
  const { nama } = req.body; // Extract data from request body
  res.json({ message: `Halo, ${nama}! Data kamu sudah diterima. 😊` });
});

app.get("/api/info", (req, res) => {
  res.json({
    message: {
      name: "GenGs API Annisa",
      version: "1.0.0",
    },
  });
});

app.post("/api/feedback", (req, res) => {
  const { feedback } = req.body; // Extract data from request body
  res.json({ message: `Terima kasih atas feedback-nya: ${feedback}!` });
});

// CRUD operations
// 1. Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add a new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, age } = req.body; // Extract data from request body
    const user = new User({ name, age }); // Create user
    const result = await user.save(); // Save to database
    res.status(201).json({ message: "User added", data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Update user (example: update name)
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL
    const { name } = req.body; // Extract new name from request body
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", data: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", data: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.get("/", (req, res) => {
  res.send("Halo, GenGs! Selamat datang di server pertama kamu!🚀");
});

import authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);

import protectedRoutes from "./routes/protected.js";
app.use("/protected", protectedRoutes);
