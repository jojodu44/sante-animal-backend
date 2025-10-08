import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

// 👤 Voir son profil
router.get("/me", verifyToken, getUserProfile);

// ✏️ Modifier son profil
router.put("/me", verifyToken, updateUserProfile);

// 👑 Admin — Voir tous les utilisateurs
router.get("/", verifyToken, isAdmin, getAllUsers);

// 👑 Admin — Supprimer un utilisateur
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;