import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPw });
    await user.save();

    res.json({ success: true, message: "User registered" });
  } catch (err) {
    console.error("Signup error details:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error details:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
