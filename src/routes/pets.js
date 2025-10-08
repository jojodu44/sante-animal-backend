import express from "express";
import { createPet, getPets, getPetById, updatePet, deletePet } from "../controllers/petController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createPet);
router.get("/", verifyToken, getPets);
router.get("/:id", verifyToken, getPetById);
router.put("/:id", verifyToken, updatePet);
router.delete("/:id", verifyToken, deletePet);

export default router;