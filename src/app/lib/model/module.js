import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
});

export const ModuleModel =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);
