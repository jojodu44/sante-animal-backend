import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// 📋 Récupérer tous les utilisateurs (admin)
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
