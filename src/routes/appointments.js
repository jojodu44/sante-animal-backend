import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

// 📅 Créer un rendez-vous (utilisateur authentifié)
router.post("/", verifyToken, createAppointment);

// 📋 Voir ses rendez-vous
router.get("/", verifyToken, getAppointments);

// 🔍 Détails d’un rendez-vous
router.get("/:id", verifyToken, getAppointmentById);

// ✏️ Modifier un rendez-vous
router.put("/:id", verifyToken, updateAppointment);

// ❌ Supprimer un rendez-vous
router.delete("/:id", verifyToken, deleteAppointment);

export default router;

