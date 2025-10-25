// Signup.jsx
import React, { useState } from "react";
import api from "./api"; // centralized Axios instance
import "./sign.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const [msgc, setMsgc] = useState("");

  // For toggling password visibility
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (pw1 !== pw2) {
      setMsg("Passwords do not match ❌");
      setMsgc("red");
      return;
    }
    if (pw1.length < 8) {
      setMsg("Password must be at least 8 characters long.");
      setMsgc("red");
      return;
    }

    try {
      // ✅ Correct backend route with name, email, password
      const res = await api.post("/auth/signup", {
        name,
        email,
        password: pw1,
      });

      if (res.data.success) {
        setMsg("Registered successfully ✅");
        setMsgc("green");
        setName("");
        setEmail("");
        setPw1("");
        setPw2("");
      } else {
        setMsg(res.data.message || "Registration failed");
        setMsgc("red");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMsg("Signup failed. Please try again.");
      setMsgc("red");
    }
  };

  return (
    <div className="sign-all">
      <form onSubmit={submitForm}>
        {/* Name field */}
        <div className="signup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email field */}
        <div className="signup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password field */}
        <div className="signup password-field">
          <label htmlFor="password">Password</label>
          <input
            type={showPw1 ? "text" : "password"}
            placeholder="Enter password"
            value={pw1}
            onChange={(e) => setPw1(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPw1(!showPw1)}
          >
            {showPw1 ? "👁️" : "🙈"}
          </span>
        </div>

        {/* Confirm password field */}
        <div className="signup password-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showPw2 ? "text" : "password"}
            placeholder="Confirm password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPw2(!showPw2)}
          >
            {showPw2 ? "👁️" : "🙈"}
          </span>
        </div>

        {/* Validation / API message */}
        {msg && <p style={{ color: msgc }}>{msg}</p>}

        {/* Submit button */}
        <div className="but-sign">
          <button type="submit">REGISTER</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
