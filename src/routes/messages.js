import express from "express";
import Message from "../models/Message.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// ➕ Envoyer un message
router.post("/", verifyToken, async (req, res) => {
  try {
    const message = new Message({ ...req.body, sender: req.user._id });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📋 Voir ses messages
router.get("/", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user._id });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;