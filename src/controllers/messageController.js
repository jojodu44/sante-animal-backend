import Message from "../models/Message.js";

// ✉️ Envoyer un message
export const sendMessage = async (req, res) => {
  const message = new Message({ ...req.body, user: req.user._id });
  await message.save();
  res.status(201).json(message);
};

// 📬 Récupérer ses messages
export const getMessages = async (req, res) => {
  const messages = await Message.find({ user: req.user._id });
  res.json(messages);
};

// ❌ Supprimer un message
export const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ message: "Message non trouvé" });

  if (message.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Non autorisé" });
  }

  await message.remove();
  res.json({ message: "Message supprimé" });
};