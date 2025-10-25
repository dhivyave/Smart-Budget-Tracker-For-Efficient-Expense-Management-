// Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api"; // Use centralized Axios instance
import "./home.css";

function Home() {
  const [summary, setSummary] = useState({ totalUsers: 0, totalBudgets: 0, totalGoals: 0 });

  // Fetch summary data from backend on mount
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const usersRes = await api.get("/users"); // backend endpoint for users
        const budgetsRes = await api.get("/budgets"); // backend endpoint for budgets
        const goalsRes = await api.get("/goals"); // backend endpoint for goals

        setSummary({
          totalUsers: usersRes.data.length,
          totalBudgets: budgetsRes.data.length,
          totalGoals: goalsRes.data.length,
        });
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyiniBRSWUvU4Q3WpzzeIs-UFZqdwJQxwzHg&s" 
          alt="Expense Tracker"
          className="home-img"
        />
        <h1 className="home-heading">Welcome to Expense Tracker</h1>
        <p className="home-subtitle">
          Manage your expenses, track savings, and stay in control of your
          budget 🚀
        </p>

        {/* Summary from backend */}
        <div className="home-summary">
          <p>Total Users: {summary.totalUsers}</p>
          <p>Total Budgets: {summary.totalBudgets}</p>
          <p>Total Goals: {summary.totalGoals}</p>
        </div>

        {/* Buttons */}
        <div className="home-buttons">
          <Link to="/dashboard">
            <button className="get-started-btn dashboard-btn">Start</button>
          </Link>
          <Link to="/login">
            <button className="get-started-btn login-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="get-started-btn signup-btn">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
