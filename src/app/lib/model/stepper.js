import mongoose from "mongoose";
import Company from "./company";

const stepperSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: { type: String, required: true },
    order: { type: Number, required: true },
    status: {
      type: String,
      enum: ["complete", "pending", "problem"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StepperModel =
  mongoose.models.Stepper || mongoose.model("Stepper", stepperSchema);
