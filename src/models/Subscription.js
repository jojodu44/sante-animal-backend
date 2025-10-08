import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  type: String,
  status: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Subscription", subscriptionSchema);