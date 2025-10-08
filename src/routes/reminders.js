import express from "express";
import { createReminder, getReminders, deleteReminder } from "../controllers/reminderController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createReminder);
router.get("/", verifyToken, getReminders);
router.delete("/:id", verifyToken, deleteReminder);

export default router;