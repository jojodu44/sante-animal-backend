import express from "express";
import Reminder from "../models/Reminder.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const reminder = new Reminder({ ...req.body, user: req.user._id });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;