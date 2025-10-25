import Budget from "../models/budget.js";

// GET all budgets
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE budget
export const createBudget = async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE budget
export const updateBudget = async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE budget
export const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
