// ChatAI.jsx
import React, { useState, useEffect } from "react";
import api from "./api"; // centralized Axios instance
import "./chatai.css";

function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load chat history from backend on mount
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await api.get("/chat"); // GET /api/chat
      // Map history to same format {sender, text}
      const history = res.data
        .reverse() // oldest first
        .flatMap((chat) => [
          { sender: "user", text: chat.userMessage },
          { sender: "bot", text: chat.botReply },
        ]);
      setMessages(history);
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes("balance"))
      return "Your balance is calculated as total cash-in minus cash-out. 💰";
    if (msg.includes("save"))
      return "A good practice is to save at least 20% of your income. 💡";
    if (msg.includes("expense"))
      return "Tracking expenses daily helps you control overspending. 📊";
    if (msg.includes("how to use"))
      return "You can add income (cash-in) and expenses (cash-out). The dashboard shows totals automatically. 🛠️";
    if (msg.includes("benefits"))
      return "Benefits include: 1) Better control of money, 2) Helps you save, 3) Avoids overspending, 4) Easy tracking of all expenses. ✅";
    if (msg.includes("goal"))
      return "You can set financial goals like saving for travel or emergency funds and track progress. 🎯";
    if (msg.includes("budget"))
      return "Budgeting helps you plan monthly income and expenses so you don’t run out of money. 📅";
    if (msg.includes("hello"))
      return "Hi there! 👋 How can I help you with budget tracking?";
    if (msg.includes("bye"))
      return "Goodbye! 👋 Stay consistent with your savings.";

    return "I'm not sure about that 🤔. Try asking about balance, goals, benefits, or how to use.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getBotResponse(input) };

    setMessages((prev) => [...prev, userMessage, botMessage]);

    try {
      // Save chat in backend
      await api.post("/chat", {
        userMessage: input,
        botReply: botMessage.text,
      });
    } catch (err) {
      console.error("Error saving chat:", err);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>Budget Assistant 🤖</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatAI;
