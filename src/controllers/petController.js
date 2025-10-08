import Pet from "../models/Pet.js";

// ➕ Créer un animal
export const createPet = async (req, res) => {
  const pet = new Pet({ ...req.body, owner: req.user._id });
  await pet.save();
  res.status(201).json(pet);
};

// 📋 Récupérer ses animaux
export const getPets = async (req, res) => {
  const pets = await Pet.find({ owner: req.user._id });
  res.json(pets);
};

// 🔍 Détails d’un animal
export const getPetById = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).json({ message: "Animal non trouvé" });
  res.json(pet);
};

// ✏️ Modifier un animal
export const updatePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).json({ message: "Animal non trouvé" });

  Object.assign(pet, req.body);
  await pet.save();
  res.json(pet);
};

// ❌ Supprimer un animal
export const deletePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).json({ message: "Animal non trouvé" });

  await pet.remove();
  res.json({ message: "Animal supprimé" });
};
