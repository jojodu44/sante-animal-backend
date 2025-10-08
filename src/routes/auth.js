import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// 🟢 Inscription
router.post("/register", registerUser);

// 🔵 Connexion
router.post("/login", loginUser);

// 🟣 Profil utilisateur connecté
router.get("/me", verifyToken, getMe);

export default router;