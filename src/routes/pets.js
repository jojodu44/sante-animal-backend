import express from "express";
import Pet from "../models/Pet.js";

import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
} from "../controllers/petController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// ➕ Ajouter un animal
router.post("/", verifyToken, createPet);

// 📋 Voir ses animaux
router.get("/", verifyToken, getPets);

// 🔍 Détails d’un animal
router.get("/:id", verifyToken, getPetById);

// ✏️ Modifier un animal
router.put("/:id", verifyToken, updatePet);

// ❌ Supprimer un animal
router.delete("/:id", verifyToken, deletePet);

export default router;