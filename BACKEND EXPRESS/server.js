
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);     // authentication routes
app.use("/api/budget", budgetRoutes); // budget routes
app.use("/api/goals", goalRoutes);    // goals routes
app.use("/api/chat", chatRoutes);     // chat routes
app.use("/api/budget", budgetRoutes);

// Optional: Home route
app.get("/", (req, res) => res.send("Server is running 🚀"));

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
