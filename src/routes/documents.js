import express from "express";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../src/controllers/documentController.js";
import { verifyToken } from "../src/middlewares/verifyToken.js";

const router = express.Router();

// 📤 Ajouter un document
router.post("/", verifyToken, uploadDocument);

// 📄 Lister ses documents
router.get("/", verifyToken, getDocuments);

// ❌ Supprimer un document
router.delete("/:id", verifyToken, deleteDocument);

export default router;