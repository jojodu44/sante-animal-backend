// backend/src/controllers/subscriptionController.js
import Subscription from "../models/Subscription.js";

// ➕ Créer un abonnement
export const createSubscription = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.body;

    const subscription = new Subscription({
      user: req.user._id, // récupéré depuis verifyToken
      type,
      startDate,
      endDate,
      status: "active",
    });

    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Récupérer tous les abonnements de l’utilisateur
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Annuler un abonnement
export const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Abonnement non trouvé" });
    }

    // Vérifie que l'utilisateur est bien le propriétaire
    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    subscription.status = "canceled";
    await subscription.save();

    res.json({ message: "Abonnement annulé avec succès", subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};