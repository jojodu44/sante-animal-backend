// backend/src/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔑 Vérifier le token
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès refusé : token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password"); // Exclure le mot de passe
    if (!req.user) return res.status(401).json({ message: "Utilisateur non trouvé" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

// 👑 Vérifier si l'utilisateur est admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
};