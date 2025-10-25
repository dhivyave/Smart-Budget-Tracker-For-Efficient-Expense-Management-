import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// Save chat
router.post("/", async (req, res) => {
  try {
    const { userMessage, botReply } = req.body;
    const chat = new Chat({ userMessage, botReply });
    await chat.save();
    res.json({ success: true, chat });
  } catch (err) {
    console.error("Chat save error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get chat history
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }).limit(20);
    res.json(chats);
  } catch (err) {
    console.error("Chat fetch error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
