import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Pet from "./models/Pet.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connecté"));

const seed = async () => {
  await User.deleteMany();
  await Pet.deleteMany();

  const user = new User({ name: "John Doe", email: "john@test.com", password: "123456" });
  await user.save();

  const pet1 = new Pet({ name: "Rex", type: "Chien", age: 3, owner: user._id });
  const pet2 = new Pet({ name: "Mia", type: "Chat", age: 2, owner: user._id });
  await pet1.save();
  await pet2.save();

  console.log("Données initiales ajoutées !");
  process.exit();
};

seed();