// // Goals.jsx
// import React, { useState, useEffect } from "react";
// import api from "./api"; // Use centralized Axios instance
// import "./goals.css";

// function Goals() {
//   const [goals, setGoals] = useState([]);
//   const [goalName, setGoalName] = useState("");
//   const [goalTarget, setGoalTarget] = useState("");
//   const [contribution, setContribution] = useState("");

//   // Fetch goals from backend when component mounts
//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   const fetchGoals = async () => {
//     try {
//       const res = await api.get("/goals"); // Axios instance handles base URL
//       setGoals(res.data);
//     } catch (err) {
//       console.error("Error fetching goals:", err);
//     }
//   };

//   // Add a new goal
//   const addGoal = async () => {
//     if (!goalName || !goalTarget) return alert("Please fill all fields");

//     const newGoal = {
//       name: goalName,
//       target: parseInt(goalTarget),
//       saved: 0,
//     };

//     try {
//       const res = await api.post("/goals", newGoal); // send new goal to backend
//       setGoals([...goals, res.data]);
//       setGoalName("");
//       setGoalTarget("");
//     } catch (err) {
//       console.error("Error adding goal:", err);
//     }
//   };

//   // Update goal progress
//   const updateGoal = async (id) => {
//     if (!contribution) return alert("Please enter contribution amount");

//     const goalToUpdate = goals.find((g) => g.id === id);
//     const updatedGoal = { ...goalToUpdate, saved: goalToUpdate.saved + parseInt(contribution) };

//     try {
//       const res = await api.put(`/goals/${id}`, updatedGoal); // backend endpoint to update goal
//       setGoals(goals.map((g) => (g.id === id ? res.data : g)));
//       setContribution("");
//     } catch (err) {
//       console.error("Error updating goal:", err);
//     }
//   };

//   return (
//     <div className="goals-page">
//       <h1 className="goals-heading">My Goals 🎯</h1>

//       {/* Add Goal Form */}
//       <div className="add-goal-form">
//         <input
//           type="text"
//           placeholder="Goal Name (e.g. Buy a Car)"
//           value={goalName}
//           onChange={(e) => setGoalName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Target Amount"
//           value={goalTarget}
//           onChange={(e) => setGoalTarget(e.target.value)}
//         />
//         <button onClick={addGoal}>Add Goal</button>
//       </div>

//       {/* Goals List */}
//       <div className="goals-list">
//         {goals.map((goal) => {
//           const progress = Math.min((goal.saved / goal.target) * 100, 100);
//           return (
//             <div key={goal.id} className="goal-card">
//               <h2>{goal.name}</h2>
//               <p>
//                 Saved: ₹{goal.saved} / ₹{goal.target}
//               </p>

//               {/* Progress bar */}
//               <div className="progress-bar">
//                 <div
//                   className="progress"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>

//               {/* Add contribution */}
//               <div className="contribution-box">
//                 <input
//                   type="number"
//                   placeholder="Add amount"
//                   value={contribution}
//                   onChange={(e) => setContribution(e.target.value)}
//                 />
//                 <button onClick={() => updateGoal(goal.id)}>Update</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Goals;


// // Goals.jsx
// import React, { useState, useEffect } from "react";
// import api from "./api"; // centralized Axios instance
// import "./goals.css";

// function Goals() {
//   const [goals, setGoals] = useState([]);
//   const [goalName, setGoalName] = useState("");
//   const [goalTarget, setGoalTarget] = useState("");
//   const [contributions, setContributions] = useState({}); // track per-goal contributions

//   // Fetch goals from backend when component mounts
//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   const fetchGoals = async () => {
//     try {
//       const res = await api.get("/goals");
//       setGoals(res.data);
//     } catch (err) {
//       console.error("Error fetching goals:", err);
//     }
//   };

//   // Add a new goal
//   const addGoal = async () => {
//     if (!goalName || !goalTarget) return alert("Please fill all fields");

//     const newGoal = {
//       name: goalName,
//       target: parseInt(goalTarget),
//       saved: 0,
//     };

//     try {
//       const res = await api.post("/goals", newGoal);
//       setGoals([...goals, res.data]);
//       setGoalName("");
//       setGoalTarget("");
//     } catch (err) {
//       console.error("Error adding goal:", err);
//     }
//   };

//   // Update goal progress
//   const updateGoal = async (id) => {
//     const contribution = contributions[id];
//     if (!contribution) return alert("Please enter contribution amount");

//     const goalToUpdate = goals.find((g) => g._id === id);
//     if (!goalToUpdate) return;

//     const updatedGoal = {
//       ...goalToUpdate,
//       saved: goalToUpdate.saved + parseInt(contribution),
//     };

//     try {
//       const res = await api.put(`/goals/${id}`, updatedGoal);
//       setGoals(goals.map((g) => (g._id === id ? res.data : g)));

//       // clear only this goal's contribution
//       setContributions({ ...contributions, [id]: "" });
//     } catch (err) {
//       console.error("Error updating goal:", err);
//     }
//   };

//   return (
//     <div className="goals-page">
//       <h1 className="goals-heading">My Goals 🎯</h1>

//       {/* Add Goal Form */}
//       <div className="add-goal-form">
//         <input
//           type="text"
//           placeholder="Goal Name (e.g. Buy a Car)"
//           value={goalName}
//           onChange={(e) => setGoalName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Target Amount"
//           value={goalTarget}
//           onChange={(e) => setGoalTarget(e.target.value)}
//         />
//         <button onClick={addGoal}>Add Goal</button>
//       </div>

//       {/* Goals List */}
//       <div className="goals-list">
//         {goals.map((goal) => {
//           const progress = Math.min((goal.saved / goal.target) * 100, 100);

//           return (
//             <div key={goal._id} className="goal-card">
//               <h2>{goal.name}</h2>
//               <p>
//                 Saved: ₹{goal.saved} / ₹{goal.target}
//               </p>

//               {/* Progress bar */}
//               <div className="progress-bar">
//                 <div
//                   className="progress"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>

//               {/* Add contribution */}
//               <div className="contribution-box">
//                 <input
//                   type="number"
//                   placeholder="Add amount"
//                   value={contributions[goal._id] || ""}
//                   onChange={(e) =>
//                     setContributions({
//                       ...contributions,
//                       [goal._id]: e.target.value,
//                     })
//                   }
//                 />
//                 <button onClick={() => updateGoal(goal._id)}>Update</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Goals;

// Goals.jsx
import React, { useState, useEffect } from "react";
import api from "./api";
import "./goals.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [contributions, setContributions] = useState({});

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await api.get("/goals");
      setGoals(res.data || []);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  const addGoal = async () => {
    if (!goalName || !goalTarget) return alert("Please fill all fields");

    const newGoal = {
      name: goalName,
      target: parseInt(goalTarget),
      saved: 0,
    };

    try {
      const res = await api.post("/goals", newGoal);
      setGoals([...goals, res.data]);
      setGoalName("");
      setGoalTarget("");
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  const updateGoal = async (id) => {
    const contribution = contributions[id];
    if (!contribution) return alert("Please enter contribution amount");

    const goalToUpdate = goals.find((g) => g._id === id);
    if (!goalToUpdate) return;

    const updatedGoal = {
      ...goalToUpdate,
      saved: goalToUpdate.saved + parseInt(contribution),
    };

    try {
      const res = await api.put(`/goals/${id}`, updatedGoal);
      setGoals(goals.map((g) => (g._id === id ? res.data : g)));
      setContributions({ ...contributions, [id]: "" });
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  // ✅ Fully fixed PDF export (works perfectly in React + Vite)
  const downloadGoalsPDF = () => {
    if (!goals.length) return alert("No goals to export!");

    const doc = new jsPDF();

    // --- Header ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("🎯 My Financial Goals Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    // --- Table Data ---
    const tableColumn = ["Goal Name", "Target (₹)", "Saved (₹)", "Progress (%)"];
    const tableRows = goals.map((goal) => [
      goal.name,
      goal.target,
      goal.saved,
      `${Math.min(((goal.saved / goal.target) * 100).toFixed(2), 100)}%`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 38,
      theme: "striped",
      headStyles: { fillColor: [0, 102, 204] }, // dark blue
      styles: { fontSize: 11 },
    });

    // --- Summary ---
    const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
    const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
    const avgProgress =
      goals.length > 0 ? ((totalSaved / totalTarget) * 100).toFixed(2) : 0;

    const y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Target: ₹${totalTarget}`, 14, y);
    doc.text(`Total Saved: ₹${totalSaved}`, 14, y + 8);
    doc.text(`Overall Progress: ${avgProgress}%`, 14, y + 16);

    // --- ✅ Proper binary-safe download (no corruption)
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Goals_Report.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="goals-page">
      <h1 className="goals-heading">My Goals 🎯</h1>

      {/* Add Goal Form */}
      <div className="add-goal-form">
        <input
          type="text"
          placeholder="Goal Name (e.g. Buy a Car)"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={goalTarget}
          onChange={(e) => setGoalTarget(e.target.value)}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>

      {/* Goals List */}
      <div className="goals-list">
        {goals.map((goal) => {
          const progress = Math.min((goal.saved / goal.target) * 100, 100);

          return (
            <div key={goal._id} className="goal-card">
              <h2>{goal.name}</h2>
              <p>
                Saved: ₹{goal.saved} / ₹{goal.target}
              </p>

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Add Contribution */}
              <div className="contribution-box">
                <input
                  type="number"
                  placeholder="Add amount"
                  value={contributions[goal._id] || ""}
                  onChange={(e) =>
                    setContributions({
                      ...contributions,
                      [goal._id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => updateGoal(goal._id)}>Update</button>
              </div>
            </div>
          );
        })}

        {/* ✅ Download PDF Button */}
        <div className="download-section">
          <button className="download-btn" onClick={downloadGoalsPDF}>
            📄 Download Goals PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default Goals;
