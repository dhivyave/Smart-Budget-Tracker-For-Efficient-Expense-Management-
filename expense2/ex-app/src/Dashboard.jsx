// import React, { useEffect, useState } from "react";
// import "./dashboard.css";
// import { Link } from "react-router-dom";
// import api from "./api";

// function Dashboard() {
//   const [budgetSummary, setBudgetSummary] = useState({ cashIn: 0, cashOut: 0 });
//   const [expensesCount, setExpensesCount] = useState(0);

//   useEffect(() => {
//     fetchSummary();
//   }, []);

//   const fetchSummary = async () => {
//     try {
//       const res = await api.get("/budget");
//       const records = res.data;

//       const cashIn = records
//         .filter((r) => r.type === "cash-in")
//         .reduce((sum, r) => sum + r.amount, 0);
//       const cashOut = records
//         .filter((r) => r.type === "cash-out")
//         .reduce((sum, r) => sum + r.amount, 0);

//       setBudgetSummary({ cashIn, cashOut });
//       setExpensesCount(records.length);
//     } catch (err) {
//       console.error("Error fetching dashboard summary:", err);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-heading">Expense Tracker Dashboard</h1>

//       <div className="dashboard-cards">
//         {/* Goals Card */}
//         <div className="dashboard-card goals-card">
//           <h2>Goals 🎯</h2>
//           <p>Set your saving goals and track progress.</p>
//           <Link to="/goals">
//             <button className="card-btn">Set Goal</button>
//           </Link>
//         </div>

//         {/* Budget Tracker Card */}
//         <div className="dashboard-card budget-card">
//           <h2>Budget Tracker 💰</h2>
//           <p>
//             Track your monthly budget and spending.
//             <br />
//             Cash-In: ₹{budgetSummary.cashIn} | Cash-Out: ₹{budgetSummary.cashOut}
//           </p>
//           <Link to="/budget">
//             <button className="card-btn">Track Budget</button>
//           </Link>
//         </div>

//         {/* View Expenses Card */}
//         <div className="dashboard-card expenses-card">
//           <h2>View Expenses 📊</h2>
//           <p>Total Records: {expensesCount}</p>
//           <Link to="/expenses">
//             <button className="card-btn">View Expenses</button>
//           </Link>
//         </div>

//         {/* ✅ Chat AI Card */}
//         <div className="dashboard-card chat-card">
//           <h2>Chat AI 🤖</h2>
//           <p>Ask budget-related questions and get instant help.</p>
//           <Link to="/chat">
//             <button className="card-btn">Open Chat AI</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import api from "./api";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Dashboard() {
  const [budgetSummary, setBudgetSummary] = useState({ cashIn: 0, cashOut: 0 });
  const [expensesCount, setExpensesCount] = useState(0);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await api.get("/budget");
      const records = res.data;

      const cashIn = records
        .filter((r) => r.type === "cash-in")
        .reduce((sum, r) => sum + r.amount, 0);
      const cashOut = records
        .filter((r) => r.type === "cash-out")
        .reduce((sum, r) => sum + r.amount, 0);

      setBudgetSummary({ cashIn, cashOut });
      setExpensesCount(records.length);
    } catch (err) {
      console.error("Error fetching dashboard summary:", err);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("💰 Expense Tracker Dashboard Summary", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const netBalance = budgetSummary.cashIn - budgetSummary.cashOut;

    const tableColumn = ["Metric", "Amount (₹)"];
    const tableRows = [
      ["Total Cash-In", budgetSummary.cashIn.toFixed(2)],
      ["Total Cash-Out", budgetSummary.cashOut.toFixed(2)],
      ["Net Balance", netBalance.toFixed(2)],
      ["Total Expense Records", expensesCount],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: "striped",
      headStyles: { fillColor: [67, 160, 71] },
      styles: { fontSize: 12 },
    });

    doc.setFontSize(10);
    doc.text("Expense Tracker - Dashboard Report", 14, doc.lastAutoTable.finalY + 15);

    doc.save("Dashboard_Summary.pdf");
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Expense Tracker Dashboard</h1>

      <div className="dashboard-cards">
        {/* Goals Card */}
        <div className="dashboard-card goals-card">
          <h2>Goals 🎯</h2>
          <p>Set your saving goals and track progress.</p>
          <Link to="/goals">
            <button className="card-btn">Set Goal</button>
          </Link>
        </div>

        {/* Budget Tracker Card */}
        <div className="dashboard-card budget-card">
          <h2>Budget Tracker 💰</h2>
          <p>
            Track your monthly budget and spending.
            <br />
            Cash-In: ₹{budgetSummary.cashIn} | Cash-Out: ₹{budgetSummary.cashOut}
          </p>
          <Link to="/budget">
            <button className="card-btn">Track Budget</button>
          </Link>
        </div>

        {/* View Expenses Card */}
        <div className="dashboard-card expenses-card">
          <h2>View Expenses 📊</h2>
          <p>Total Records: {expensesCount}</p>
          <Link to="/expenses">
            <button className="card-btn">View Expenses</button>
          </Link>
        </div>

        {/* Chat AI Card */}
        <div className="dashboard-card chat-card">
          <h2>Chat AI 🤖</h2>
          <p>Ask budget-related questions and get instant help.</p>
          <Link to="/chat">
            <button className="card-btn">Open Chat AI</button>
          </Link>
        </div>
      </div>

      {/* Download Button */}
      <div className="download-section">
        <button className="download-btn" onClick={downloadPDF}>
          📄 Download Dashboard PDF
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
