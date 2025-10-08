import express from "express";
import Subscription from "../models/Subscription.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const subscription = new Subscription({ ...req.body, user: req.user._id });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;