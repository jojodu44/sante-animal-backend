import express from "express";
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} from "../src/controllers/reminderController.js";
import { verifyToken } from "..src/middlewares/verifyToken.js";

const router = express.Router();

// ➕ Créer un rappel
router.post("/", verifyToken, createReminder);

// 📋 Voir ses rappels
router.get("/", verifyToken, getReminders);

// ✏️ Modifier un rappel
router.put("/:id", verifyToken, updateReminder);

// ❌ Supprimer un rappel
router.delete("/:id", verifyToken, deleteReminder);

export default router;
