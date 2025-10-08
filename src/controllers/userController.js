import User from "../models/User.js";

// 👤 Profil utilisateur
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// ✏️ Modifier son profil
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  await user.save();
  res.json(user);
};

// 👑 Liste de tous les utilisateurs (admin)
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// ❌ Supprimer un utilisateur (admin)
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  await user.remove();
  res.json({ message: "Utilisateur supprimé" });
};
