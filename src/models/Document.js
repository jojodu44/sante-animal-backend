// backend/src/models/Document.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, // Ex: "vaccination", "analyse", "facture"
    url: { type: String, required: true }, // lien du fichier PDF ou image
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);