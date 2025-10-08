import Reminder from "../models/Reminder.js";

// ➕ Créer un rappel
export const createReminder = async (req, res) => {
  const reminder = new Reminder({ ...req.body, user: req.user._id });
  await reminder.save();
  res.status(201).json(reminder);
};

// 📋 Voir ses rappels
export const getReminders = async (req, res) => {
  const reminders = await Reminder.find({ user: req.user._id });
  res.json(reminders);
};

// ✏️ Modifier un rappel
export const updateReminder = async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);
  if (!reminder) return res.status(404).json({ message: "Rappel non trouvé" });

  Object.assign(reminder, req.body);
  await reminder.save();
  res.json(reminder);
};

// ❌ Supprimer un rappel
export const deleteReminder = async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);
  if (!reminder) return res.status(404).json({ message: "Rappel non trouvé" });

  await reminder.remove();
  res.json({ message: "Rappel supprimé" });
};
