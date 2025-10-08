import express from "express";
import HealthRecord from "../models/HealthRecord.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const record = new HealthRecord({ ...req.body, user: req.user._id });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const records = await HealthRecord.find({ user: req.user._id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;