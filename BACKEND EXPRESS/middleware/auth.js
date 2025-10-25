// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // optionally fetch user or just set id
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};
