import express from "express";
import {
  createSubscription,
  getSubscriptions,
  cancelSubscription,
} from "../src/controllers/subscriptionController.js";
import { verifyToken } from "../src/middlewares/verifyToken.js";

const router = express.Router();

// ➕ Souscrire à une offre
router.post("/", verifyToken, createSubscription);

// 📋 Voir ses abonnements
router.get("/", verifyToken, getSubscriptions);

// ❌ Annuler un abonnement
router.delete("/:id", verifyToken, cancelSubscription);

export default router;