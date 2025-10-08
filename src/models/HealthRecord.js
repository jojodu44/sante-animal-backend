// backend/src/models/HealthRecord.js
import mongoose from "mongoose";

const HealthRecordSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    type: { type: String, required: true }, // vaccin, chirurgie, traitement...
    description: { type: String },
    date: { type: Date, default: Date.now },
    files: [{ type: String }], // URLs optionnels vers pièces jointes
  },
  { timestamps: true }
);

export default mongoose.models.HealthRecord || mongoose.model("HealthRecord", HealthRecordSchema);
