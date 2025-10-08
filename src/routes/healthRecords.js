import express from "express";
import {
  createHealthRecord,
  getHealthRecords,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
} from "../controllers/healthRecordController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// ➕ Ajouter une fiche de santé
router.post("/", verifyToken, createHealthRecord);

// 📋 Lister les fiches de santé
router.get("/", verifyToken, getHealthRecords);

// 🔍 Détails d’une fiche
router.get("/:id", verifyToken, getHealthRecordById);

// ✏️ Modifier une fiche
router.put("/:id", verifyToken, updateHealthRecord);

// ❌ Supprimer une fiche
router.delete("/:id", verifyToken, deleteHealthRecord);

export default router;
