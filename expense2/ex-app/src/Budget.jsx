// // Budget.jsx
// import React, { useState, useEffect } from "react";
// import api from "./api"; // Axios instance with baseURL + auth headers
// import "./budget.css";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// function Budget() {
//   const [records, setRecords] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState("cash-in");
//   const [desc, setDesc] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch budget records on mount
//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/budget");
//       setRecords(res.data || []);
//     } catch (err) {
//       console.error("❌ Error fetching budget records:", err);
//       alert("Failed to fetch budget records!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add new record
//   const addRecord = async () => {
//     if (!amount || isNaN(amount)) return alert("⚠️ Please enter a valid number!");
//     if (!desc.trim()) return alert("⚠️ Please enter a description!");

//     const newRecord = {
//       type,
//       amount: parseFloat(amount),
//       desc,
//       date: new Date().toLocaleDateString(),
//       time: new Date().toLocaleTimeString(),
//     };

//     try {
//       const res = await api.post("/budget", newRecord);
//       setRecords((prev) => [...prev, res.data]);
//       setAmount("");
//       setDesc("");
//     } catch (err) {
//       console.error("❌ Error adding budget record:", err);
//       alert("Failed to add record!");
//     }
//   };

//   // ✅ Delete record
//   const deleteRecord = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await api.delete(`/budget/${id}`);
//       setRecords((prev) => prev.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("❌ Error deleting record:", err);
//       alert("Failed to delete record!");
//     }
//   };

//   // ✅ Chart data
//   const chartData = [
//     {
//       name: "Transactions",
//       "Cash-In": records
//         .filter((r) => r.type === "cash-in")
//         .reduce((sum, r) => sum + r.amount, 0),
//       "Cash-Out": records
//         .filter((r) => r.type === "cash-out")
//         .reduce((sum, r) => sum + r.amount, 0),
//     },
//   ];

//   return (
//     <div className="budget-page">
//       <h1 className="budget-heading">💰 Budget Tracker</h1>

//       {/* Input Form */}
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
//         <button onClick={addRecord}>➕ Add Record</button>
//       </div>

//       {/* Chart */}
//       <div className="budget-chart">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Cash-In" fill="#4caf50" />
//             <Bar dataKey="Cash-Out" fill="#f44336" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Records Table */}
//       <div className="budget-list">
//         <h3>Records</h3>
//         {loading ? (
//           <p>Loading records...</p>
//         ) : (
//           <table className="records-table">
//             <thead>
//               <tr>
//                 <th>Type</th>
//                 <th>Amount (₹)</th>
//                 <th>Description</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((r) => (
//                 <tr key={r._id}>
//                   <td>{r.type === "cash-in" ? "➕ Cash-In" : "➖ Cash-Out"}</td>
//                   <td>{r.amount}</td>
//                   <td>{r.desc}</td>
//                   <td>{r.date}</td>
//                   <td>{r.time}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => deleteRecord(r._id)}
//                     >
//                       ❌ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {records.length === 0 && (
//                 <tr>
//                   <td colSpan="6">No records found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Budget;






//new
// Budget.jsx
// import React, { useState, useEffect } from "react";
// import api from "./api"; // Axios instance with baseURL + auth headers
// import "./budget.css";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// function Budget() {
//   const [records, setRecords] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState("cash-in");
//   const [desc, setDesc] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch budget records on mount
//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/api/budget"); // 🔥 updated
//       setRecords(res.data || []);
//     } catch (err) {
//       console.error("❌ Error fetching budget records:", err);
//       alert("Failed to fetch budget records!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add new record
//   const addRecord = async () => {
//     if (!amount || isNaN(amount)) return alert("⚠️ Please enter a valid number!");
//     if (!desc.trim()) return alert("⚠️ Please enter a description!");

//     const newRecord = {
//       type,
//       amount: parseFloat(amount),
//       desc,
//       date: new Date().toLocaleDateString(),
//       time: new Date().toLocaleTimeString(),
//     };

//     try {
//       const res = await api.post("/api/budget", newRecord); // 🔥 updated
//       setRecords((prev) => [...prev, res.data]);
//       setAmount("");
//       setDesc("");
//     } catch (err) {
//       console.error("❌ Error adding budget record:", err);
//       alert("Failed to add record!");
//     }
//   };

//   // ✅ Delete record
//   const deleteRecord = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await api.delete(`/api/budget/${id}`); // 🔥 updated
//       setRecords((prev) => prev.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("❌ Error deleting record:", err);
//       alert("Failed to delete record!");
//     }
//   };

//   // ✅ Chart data
//   const chartData = [
//     {
//       name: "Transactions",
//       "Cash-In": records
//         .filter((r) => r.type === "cash-in")
//         .reduce((sum, r) => sum + r.amount, 0),
//       "Cash-Out": records
//         .filter((r) => r.type === "cash-out")
//         .reduce((sum, r) => sum + r.amount, 0),
//     },
//   ];

//   return (
//     <div className="budget-page">
//       <h1 className="budget-heading">💰 Budget Tracker</h1>

//       {/* Input Form */}
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
//         <button onClick={addRecord}>➕ Add Record</button>
//       </div>

//       {/* Chart */}
//       <div className="budget-chart">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Cash-In" fill="#4caf50" />
//             <Bar dataKey="Cash-Out" fill="#f44336" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Records Table */}
//       <div className="budget-list">
//         <h3>Records</h3>
//         {loading ? (
//           <p>Loading records...</p>
//         ) : (
//           <table className="records-table">
//             <thead>
//               <tr>
//                 <th>Type</th>
//                 <th>Amount (₹)</th>
//                 <th>Description</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((r) => (
//                 <tr key={r._id}>
//                   <td>{r.type === "cash-in" ? "➕ Cash-In" : "➖ Cash-Out"}</td>
//                   <td>{r.amount}</td>
//                   <td>{r.desc}</td>
//                   <td>{r.date}</td>
//                   <td>{r.time}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => deleteRecord(r._id)}
//                     >
//                       ❌ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {records.length === 0 && (
//                 <tr>
//                   <td colSpan="6">No records found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Budget;


//pdf
// Budget.jsx
/// Budget.jsx
import React, { useState, useEffect } from "react";
import api from "./api";
import "./budget.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Budget() {
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("cash-in");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/budget");
      setRecords(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch records!");
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async () => {
    if (!amount || isNaN(amount)) return alert("Enter a valid amount!");
    if (!desc.trim()) return alert("Enter description!");

    const newRecord = {
      type,
      amount: parseFloat(amount),
      desc,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    try {
      const res = await api.post("/api/budget", newRecord);
      setRecords((prev) => [...prev, res.data]);
      setAmount("");
      setDesc("");
    } catch (err) {
      console.error(err);
      alert("Failed to add record!");
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await api.delete(`/api/budget/${id}`);
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete record!");
    }
  };

  const chartData = [
    {
      name: "Transactions",
      "Cash-In": records
        .filter((r) => r.type === "cash-in")
        .reduce((sum, r) => sum + r.amount, 0),
      "Cash-Out": records
        .filter((r) => r.type === "cash-out")
        .reduce((sum, r) => sum + r.amount, 0),
    },
  ];

  const exportToPDF = () => {
    if (!records.length) return alert("No records to export!");
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("💰 Budget Tracker Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

    const tableColumn = ["Type", "Amount (₹)", "Description", "Date", "Time"];
    const tableRows = records.map((r) => [
      r.type === "cash-in" ? "Cash-In" : "Cash-Out",
      r.amount,
      r.desc,
      r.date,
      r.time,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: "striped",
      headStyles: { fillColor: [67, 160, 71] },
    });

    const totalIn = records
      .filter((r) => r.type === "cash-in")
      .reduce((sum, r) => sum + r.amount, 0);
    const totalOut = records
      .filter((r) => r.type === "cash-out")
      .reduce((sum, r) => sum + r.amount, 0);
    const net = totalIn - totalOut;

    doc.text(`Total Cash-In: ₹${totalIn}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Cash-Out: ₹${totalOut}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Net Balance: ₹${net}`, 14, doc.lastAutoTable.finalY + 30);

    doc.save("Budget_Report.pdf");
  };

  const exportToExcel = () => {
    if (!records.length) return alert("No records to export!");
    const formatted = records.map((r) => ({
      Type: r.type === "cash-in" ? "Cash-In" : "Cash-Out",
      "Amount (₹)": r.amount,
      Description: r.desc,
      Date: r.date,
      Time: r.time,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Budget Records");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Budget_Records.xlsx");
  };

  return (
    <div className="budget-page">
      {/* Header section with export buttons */}
      <div className="budget-header">
        <h1 className="budget-heading">💰 Budget Tracker</h1>
        <div className="top-export-buttons">
          <button className="pdf-btn" onClick={exportToPDF}>
            📄 Export PDF
          </button>
          <button className="excel-btn" onClick={exportToExcel}>
            📊 Export Excel
          </button>
        </div>
      </div>
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
          placeholder={type === "cash-in" ? "Source (e.g., Salary)" : "Spent on (e.g., Milk)"}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={addRecord}>➕ Add</button>
      </div>

      <div className="budget-chart">
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

      <div className="budget-list">
        <h3>Transaction Records</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="table-container">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount (₹)</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r._id}>
                      <td>{r.type === "cash-in" ? "➕ Cash-In" : "➖ Cash-Out"}</td>
                      <td>{r.amount}</td>
                      <td>{r.desc}</td>
                      <td>{r.date}</td>
                      <td>{r.time}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteRecord(r._id)}>
                          ❌ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {records.length === 0 && (
                    <tr>
                      <td colSpan="6">No records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Budget;
