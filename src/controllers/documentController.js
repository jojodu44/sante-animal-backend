// backend/src/controllers/documentController.js
import Document from "../models/Document.js";

// 📄 Ajouter un document
export const uploadDocument = async (req, res) => {
  try {
    const { title, type, url, petId } = req.body;
    const newDocument = new Document({
      title,
      type,
      url,
      petId,
      owner: req.user.id,
    });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l’ajout du document", error });
  }
};

// 📋 Récupérer tous les documents d’un utilisateur
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user.id }).populate("petId");
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des documents", error });
  }
};

// 🗑️ Supprimer un document
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document introuvable" });

    if (doc.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Accès refusé" });

    await doc.deleteOne();
    res.json({ message: "Document supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};
