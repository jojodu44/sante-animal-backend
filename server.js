import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";

// Routes
import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/userRoutes.js";
import petRoutes from "./src/routes/pets.js";
import messageRoutes from "./src/routes/messages.js";
import reminderRoutes from "./src/routes/reminders.js";
import subscriptionRoutes from "./src/routes/subscriptions.js";
import healthRecordRoutes from "./src/routes/healthRecords.js";
import documentRoutes from "./src/routes/documents.js";
import appointmentRoutes from "./src/routes/appointments.js";
import robotRoutes from "./src/routes/robot.js";

// Config
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/health-records", healthRecordRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/robot", robotRoutes);

// Test
app.get("/", (req, res) => {
  res.send("🐾 API Mon Santé Animal en ligne !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
