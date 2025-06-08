// models/Receipt.model.js
import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: true
  },
  pdfBuffer: {
    type: Buffer,
    required: true
  },
  qrCodeDataUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Receipt = mongoose.model("Receipt", receiptSchema);

export default Receipt;