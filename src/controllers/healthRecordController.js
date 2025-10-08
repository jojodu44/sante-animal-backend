import HealthRecord from "../models/HealthRecord.js";

// ➕ Ajouter une fiche santé
export const createHealthRecord = async (req, res) => {
  const record = new HealthRecord({ ...req.body, user: req.user._id });
  await record.save();
  res.status(201).json(record);
};

// 📋 Lister ses fiches santé
export const getHealthRecords = async (req, res) => {
  const records = await HealthRecord.find({ user: req.user._id });
  res.json(records);
};

// 🔍 Détails d’une fiche
export const getHealthRecordById = async (req, res) => {
  const record = await HealthRecord.findById(req.params.id);
  if (!record) return res.status(404).json({ message: "Fiche non trouvée" });
  res.json(record);
};

// ✏️ Modifier une fiche
export const updateHealthRecord = async (req, res) => {
  const record = await HealthRecord.findById(req.params.id);
  if (!record) return res.status(404).json({ message: "Fiche non trouvée" });

  Object.assign(record, req.body);
  await record.save();
  res.json(record);
};

// ❌ Supprimer une fiche
export const deleteHealthRecord = async (req, res) => {
  const record = await HealthRecord.findById(req.params.id);
  if (!record) return res.status(404).json({ message: "Fiche non trouvée" });

  await record.remove();
  res.json({ message: "Fiche supprimée" });
};
