import express from "express";
import Appointment from "../models/Appointment.model.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const appointment = new Appointment({ ...req.body, user: req.user._id });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

