// import express from "express";
// import Budget from "../models/budget.js"; // Match the actual filename

// const router = express.Router();

// // GET all budget records
// router.get("/", async (req, res) => {
//   try {
//     const budgets = await Budget.find();
//     res.json(budgets);
//   } catch (err) {
//     console.error("Error fetching budgets:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // POST a new budget record
// router.post("/", async (req, res) => {
//   try {
//     const budget = new Budget(req.body);
//     await budget.save();
//     res.json(budget);
//   } catch (err) {
//     console.error("Error adding budget record:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;


// //old
// // routes/budgetRoutes.js
// import express from "express";
// import Budget from "../models/budgetModel.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ Get all budgets for logged-in user
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const records = await Budget.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     res.json(records);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Add new budget record
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { type, amount, desc, date, time } = req.body;

//     const newRecord = new Budget({
//       userId: req.user.id,
//       type,
//       amount,
//       desc,
//       date,
//       time,
//     });

//     const saved = await newRecord.save();
//     res.json(saved);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save record" });
//   }
// });

// // ✅ Update budget record
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { type, amount, desc, date, time } = req.body;

//     const updated = await Budget.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       { type, amount, desc, date, time },
//       { new: true } // return updated record
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Record not found" });
//     }

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update record" });
//   }
// });

// // ✅ Delete budget record
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const record = await Budget.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id,
//     });

//     if (!record) {
//       return res.status(404).json({ error: "Record not found" });
//     }

//     res.json({ message: "Record deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete record" });
//   }
// });

// export default router;

// routes/budgetRoutes.js
import express from "express";
import Budget from "../models/budgetModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all budgets for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const records = await Budget.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add new budget record
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, amount, desc, date, time } = req.body;

    const newRecord = new Budget({
      user: req.user.id, // ✅ assign the logged-in user
      type,
      amount,
      desc,
      date,
      time,
    });

    const saved = await newRecord.save();
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save record" });
  }
});

// ✅ Update budget record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { type, amount, desc, date, time } = req.body;

    const updated = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // ✅ ensure user matches
      { type, amount, desc, date, time },
      { new: true } // return updated record
    );

    if (!updated) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update record" });
  }
});

// ✅ Delete budget record
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const record = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ ensure only owner can delete
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete record" });
  }
});

export default router;
