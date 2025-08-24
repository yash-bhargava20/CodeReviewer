import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language: { type: String, default: "javascript" },
    codeSnippet: { type: String, required: true },
    reviewReport: { type: String },
    fixedCode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
