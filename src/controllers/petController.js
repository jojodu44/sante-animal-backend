import Pet from "../models/Pet.js";

export const createPet = async (req, res) => {
  try {
    const pet = new Pet({ ...req.body, owner: req.user._id });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Animal non trouvé" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: "Animal non trouvé" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Animal non trouvé" });
    res.json({ message: "Animal supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
