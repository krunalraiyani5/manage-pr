import mongoose from "mongoose";
import Stepper from "./stepper";

const questionSchema = new mongoose.Schema(
  {
    stepperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stepper",
      required: true,
    },
    type: { type: String, enum: ["notes", "problem"], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const QuestionModel =
  mongoose.models.Question || mongoose.model("Question", questionSchema);
