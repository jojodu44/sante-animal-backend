import Appointment from "../models/Appointment.model.js";

// ➕ Créer un rendez-vous
export const createAppointment = async (req, res) => {
  const appointment = new Appointment({ ...req.body, user: req.user._id });
  await appointment.save();
  res.status(201).json(appointment);
};

// 📋 Voir ses rendez-vous
export const getAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id });
  res.json(appointments);
};

// 🔍 Détails d’un rendez-vous
export const getAppointmentById = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });
  res.json(appointment);
};

// ✏️ Modifier un rendez-vous
export const updateAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });

  Object.assign(appointment, req.body);
  await appointment.save();
  res.json(appointment);
};

// ❌ Supprimer un rendez-vous
export const deleteAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });

  await appointment.remove();
  res.json({ message: "Rendez-vous supprimé" });
};