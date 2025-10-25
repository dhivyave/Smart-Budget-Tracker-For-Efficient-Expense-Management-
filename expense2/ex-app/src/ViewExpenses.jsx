// ViewExpenses.jsx
import React, { useState, useEffect } from "react";
import api from "./api"; // centralized Axios instance
import "./viewexpenses.css";

function ViewExpenses() {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ amount: "", period: "", category: "" });
  const [addAmountInput, setAddAmountInput] = useState({});

  // Fetch budgets from backend on mount
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await api.get("/budgets"); // backend endpoint to get budgets
      setBudgets(res.data);
    } catch (err) {
      console.error("Error fetching budgets:", err);
    }
  };

  // Add new budget
  const handleAddBudget = async (e) => {
    e.preventDefault();
    const { amount, period, category } = newBudget;
    if (!amount || !period || !category) return alert("Please fill all fields");

    try {
      const res = await api.post("/budgets", { 
        amount: Number(amount), 
        period, 
        category 
      });

      setBudgets([...budgets, res.data]);
      setNewBudget({ amount: "", period: "", category: "" });
    } catch (err) {
      console.error("Error adding budget:", err);
    }
  };

  // Add more amount to existing budget
  const handleAddMore = async (index) => {
    const addAmount = Number(addAmountInput[index]);
    if (!addAmount) return;

    const budgetToUpdate = budgets[index];
    const updatedBudget = { ...budgetToUpdate, amount: budgetToUpdate.amount + addAmount };

    try {
      const res = await api.put(`/budgets/${budgetToUpdate.id}`, updatedBudget); // backend endpoint to update budget
      const updatedBudgets = [...budgets];
      updatedBudgets[index] = res.data;
      setBudgets(updatedBudgets);
      setAddAmountInput({ ...addAmountInput, [index]: "" });
    } catch (err) {
      console.error("Error updating budget:", err);
    }
  };

  return (
    <div className="view-expenses-page">
      <h1 className="view-heading">📊 Your Budgets</h1>

      <form className="budget-form" onSubmit={handleAddBudget}>
        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={newBudget.amount}
          onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
        />
        <select
          name="period"
          value={newBudget.period}
          onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
        >
          <option value="">Select Period</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        />
        <button type="submit">💾 Add Budget</button>
      </form>

      <div className="budget-table-container">
        <table>
          <thead>
            <tr>
              <th>Amount (₹)</th>
              <th>Period</th>
              <th>Category</th>
              <th>Add More</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b, index) => (
              <tr key={b.id || index}>
                <td>{b.amount}</td>
                <td>{b.period}</td>
                <td>{b.category}</td>
                <td className="add-more-cell">
                  <input
                    type="number"
                    placeholder="₹"
                    value={addAmountInput[index] || ""}
                    onChange={(e) =>
                      setAddAmountInput({ ...addAmountInput, [index]: e.target.value })
                    }
                  />
                  <button onClick={() => handleAddMore(index)}>➕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewExpenses;
