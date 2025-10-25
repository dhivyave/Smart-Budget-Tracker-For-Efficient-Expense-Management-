import express from "express";
import Goal from "../models/Goal.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET goals for current user
router.get("/", protect, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST new goal (belongs to current user)
router.post("/", protect, async (req, res) => {
  try {
    const { name, target } = req.body;
    const goal = new Goal({ user: req.user.id, name, target, saved: 0 });
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT update goal (only owner)
router.put("/:id", protect, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, message: "Goal not found" });
    if (goal.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "Not allowed" });

    const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
