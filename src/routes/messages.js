import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// ✉️ Envoyer un message
router.post("/", verifyToken, sendMessage);

// 📬 Voir ses messages
router.get("/", verifyToken, getMessages);

// ❌ Supprimer un message
router.delete("/:id", verifyToken, deleteMessage);

export default router;
