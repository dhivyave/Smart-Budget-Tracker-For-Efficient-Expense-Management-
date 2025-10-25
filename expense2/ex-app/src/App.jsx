import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Goals from "./Goals";
import BudgetView from "./BudgetView";
import Budget from "./Budget";
import ViewExpenses from "./ViewExpenses";
import axios from "axios";
import ChatAI from "./ChatAI";


// Set base URL for all Axios requests
axios.defaults.baseURL = "http://localhost:5000"; // Replace with your backend URL

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        {/* Combined Budget + Expenses Page */}
        <Route path="/budget" element={<BudgetView />} />
        <Route path="/expenses" element={<ViewExpenses />} />
        <Route path="/chat" element={<ChatAI />} />
       
      </Routes>
    </Router>
  );
}

export default App;
