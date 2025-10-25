// import mongoose from "mongoose";

// const budgetSchema = new mongoose.Schema({
//   type: { type: String, enum: ["cash-in", "cash-out"], required: true },
//   amount: { type: Number, required: true },
//   desc: { type: String, required: true },
//   date: { type: String, required: true },
//   time: { type: String, required: true },
// });

// export default mongoose.model("Budget", budgetSchema);

// models/budgetModel.js
import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["cash-in", "cash-out"], // allowed values
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to the logged-in user
    },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
