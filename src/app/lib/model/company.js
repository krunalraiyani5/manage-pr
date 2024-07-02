import mongoose from "mongoose";
import Module from "./module";

const companySchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel =
  mongoose.models.Company || mongoose.model("Company", companySchema);
