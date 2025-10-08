import express from "express";
import Document from "../models/Document.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const doc = new Document({ ...req.body, user: req.user._id });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
