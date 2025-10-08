export const subscriptionCheck = (req, res, next) => {
  if (!req.user?.subscriptionActive) {
    return res.status(403).json({ message: "Abonnement requis" });
  }
  next();
};