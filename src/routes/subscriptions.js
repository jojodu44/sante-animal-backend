import express from "express";
import {
  createSubscription,
  getSubscriptions,
  cancelSubscription,
} from "../controllers/subscriptionController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// ➕ Souscrire à une offre
router.post("/", verifyToken, createSubscription);

// 📋 Voir ses abonnements
router.get("/", verifyToken, getSubscriptions);

// ❌ Annuler un abonnement
router.delete("/:id", verifyToken, cancelSubscription);

export default router;