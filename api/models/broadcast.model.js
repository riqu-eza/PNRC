import mongoose from "mongoose";

const broadcastSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  recipientsCount: {
    type: Number,
    required: true,
  },
});

const Broadcast = mongoose.model("Broadcast", broadcastSchema);

export default Broadcast;