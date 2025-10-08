// backend/src/routes/auth.js
import express from "express";
import { registerUser, loginUser, getMe } from "../src/controllers/authController.js";
import { verifyToken } from "../src/middlewares/verifyToken.js";

const router = express.Router();

// 🟢 Inscription
router.post("/register", registerUser);

// 🔵 Connexion
router.post("/login", loginUser);

// 🟣 Profil utilisateur connecté
router.get("/me", verifyToken, getMe);

export default router;