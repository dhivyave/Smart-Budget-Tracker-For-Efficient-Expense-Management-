// Login.jsx
import React, { useState } from "react";
import api from "./api"; // centralized Axios instance
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [msgc, setMsgc] = useState("red");

  const submitForm = async (e) => {
    e.preventDefault();

    if (!email || !pw) {
      setMsg("Please fill all fields");
      setMsgc("red");
      return;
    }

    try {
      // ✅ Correct backend route
      const res = await api.post("/auth/login", { email, password: pw });

      if (res.data.success) {
        setMsg("Logged in successfully!");
        setMsgc("green");

        // ✅ Save JWT token in localStorage
        localStorage.setItem("token", res.data.token);

        // ✅ Optionally save user info too
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ Set default Authorization header for future API requests
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        // ✅ Redirect to dashboard after short delay
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setMsg(res.data.message || "Login failed");
        setMsgc("red");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg("Login failed. Please try again.");
      setMsgc("red");
    }
  };

  return (
    <div className="login-all">
      <form onSubmit={submitForm}>
        <div className="login">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>

        {/* Validation / status message */}
        {msg && <p style={{ color: msgc }}>{msg}</p>}

        <div className="but-login">
          <button type="submit">LOG IN</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
