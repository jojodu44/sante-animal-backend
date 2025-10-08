import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/", verifyToken, getMessages);

export default router;