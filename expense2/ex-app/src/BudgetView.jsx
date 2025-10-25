// // BudgetView.jsx
// import React, { useState, useEffect } from "react";
// import api from "./api"; // centralized Axios instance
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import "./budgetview.css";

// function BudgetView() {
//   const [records, setRecords] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState("cash-in");
//   const [desc, setDesc] = useState("");

//   // Fetch records from backend on mount
//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     try {
//       const res = await api.get("/budget"); // backend endpoint to get records
//       setRecords(res.data);
//     } catch (err) {
//       console.error("Error fetching records:", err);
//     }
//   };

//   // Add new record
//   const addRecord = async () => {
//     if (!amount || isNaN(amount)) return alert("Enter a valid amount!");
//     if (!desc.trim()) return alert("Enter a description!");

//     const newRecord = {
//       type,
//       amount: parseFloat(amount),
//       desc,
//       date: new Date().toLocaleDateString(),
//       time: new Date().toLocaleTimeString(),
//     };

//     try {
//       const res = await api.post("/budget", newRecord); // send to backend
//       setRecords([...records, res.data]);
//       setAmount("");
//       setDesc("");
//     } catch (err) {
//       console.error("Error adding record:", err);
//     }
//   };

//   // Totals
//   const totalIncome = records
//     .filter((r) => r.type === "cash-in")
//     .reduce((sum, r) => sum + r.amount, 0);

//   const totalExpense = records
//     .filter((r) => r.type === "cash-out")
//     .reduce((sum, r) => sum + r.amount, 0);

//   const balance = totalIncome - totalExpense;

//   // Pie chart data
//   const expenseByCategory = records
//     .filter((r) => r.type === "cash-out")
//     .reduce((acc, r) => {
//       acc[r.desc] = (acc[r.desc] || 0) + r.amount;
//       return acc;
//     }, {});

//   const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const COLORS = ["#f44336", "#ff9800", "#2196f3", "#9c27b0", "#4caf50"];

//   // Bar chart data
//   const chartData = [
//     {
//       name: "Transactions",
//       "Cash-In": totalIncome,
//       "Cash-Out": totalExpense,
//     },
//   ];

//   return (
//     <div className="budget-page">
//       <h1 className="budget-heading">💰 Budget Tracker & Expenses</h1>

//       {/* Add Transaction Form */}
//       <div className="budget-form">
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="cash-in">Cash In</option>
//           <option value="cash-out">Cash Out</option>
//         </select>

//         <input
//           type="text"
//           placeholder={
//             type === "cash-in"
//               ? "Source (e.g., Salary, Gift)"
//               : "Spent on (e.g., Milk, Dress)"
//           }
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         />

//         <button onClick={addRecord}>Add Record</button>
//       </div>

//       {/* Summary Cards */}
//       <div className="summary-cards">
//         <div className="card income">Income: ₹{totalIncome}</div>
//         <div className="card expense">Expense: ₹{totalExpense}</div>
//         <div className="card balance">Balance: ₹{balance}</div>
//       </div>

//       {/* Charts */}
//       <div className="charts-container">
//         <div className="chart-section">
//           <h3>Category-wise Expenses</h3>
//           {pieData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={120}
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : (
//             <p>No expenses yet</p>
//           )}
//         </div>

//         <div className="chart-section">
//           <h3>Cash In vs Cash Out</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="Cash-In" fill="#4caf50" />
//               <Bar dataKey="Cash-Out" fill="#f44336" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Transactions */}
//       <div className="transactions">
//         <h3>Recent Transactions</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Amount (₹)</th>
//               <th>Description</th>
//               <th>Date</th>
//               <th>Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.slice(-10).reverse().map((r, i) => (
//               <tr key={i}>
//                 <td>{r.type === "cash-in" ? "➕ Cash-In" : "➖ Cash-Out"}</td>
//                 <td>{r.amount}</td>
//                 <td>{r.desc}</td>
//                 <td>{r.date}</td>
//                 <td>{r.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default BudgetView;

// BudgetView.jsx
import React, { useState, useEffect } from "react";
import api from "./api"; // centralized Axios instance
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./budgetview.css";

function BudgetView() {
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("cash-in");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch records from backend on mount
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await api.get("/budget"); // backend endpoint to get records
      setRecords(res.data || []);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new record
  const addRecord = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return alert("⚠️ Please enter a valid positive amount!");
    }
    if (!desc.trim()) {
      return alert("⚠️ Please enter a description!");
    }

    const newRecord = {
      type,
      amount: parseFloat(amount),
      desc,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    try {
      const res = await api.post("/budget", newRecord);
      setRecords((prev) => [res.data, ...prev]); // latest first
      setAmount("");
      setDesc("");
    } catch (err) {
      console.error("Error adding record:", err);
      alert("❌ Failed to add record. Try again.");
    }
  };

  // Totals
  const totalIncome = records
    .filter((r) => r.type === "cash-in")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = records
    .filter((r) => r.type === "cash-out")
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = totalIncome - totalExpense;

  // Pie chart data
  const expenseByCategory = records
    .filter((r) => r.type === "cash-out")
    .reduce((acc, r) => {
      acc[r.desc] = (acc[r.desc] || 0) + r.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#f44336", "#ff9800", "#2196f3", "#9c27b0", "#4caf50"];

  // Bar chart data
  const chartData = [
    {
      name: "Transactions",
      "Cash-In": totalIncome,
      "Cash-Out": totalExpense,
    },
  ];

  return (
    <div className="budget-page">
      <h1 className="budget-heading">💰 Budget Tracker & Expenses</h1>

      {/* Add Transaction Form */}
      <div className="budget-form">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="cash-in">Cash In</option>
          <option value="cash-out">Cash Out</option>
        </select>

        <input
          type="text"
          placeholder={
            type === "cash-in"
              ? "Source (e.g., Salary, Gift)"
              : "Spent on (e.g., Milk, Dress)"
          }
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={addRecord}>➕ Add Record</button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card income">Income: ₹{totalIncome}</div>
        <div className="card expense">Expense: ₹{totalExpense}</div>
        <div className="card balance">Balance: ₹{balance}</div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart-section">
          <h3>📊 Category-wise Expenses</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No expenses yet 🚀</p>
          )}
        </div>

        <div className="chart-section">
          <h3>📈 Cash In vs Cash Out</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Cash-In" fill="#4caf50" />
              <Bar dataKey="Cash-Out" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions">
        <h3>📝 Recent Transactions</h3>
        {loading ? (
          <p>Loading...</p>
        ) : records.length === 0 ? (
          <p>No transactions yet. Add one above! ✨</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount (₹)</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {records.slice(0, 10).map((r, i) => (
                <tr key={i}>
                  <td>{r.type === "cash-in" ? "➕ Cash-In" : "➖ Cash-Out"}</td>
                  <td>{r.amount}</td>
                  <td>{r.desc}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BudgetView;
