import mongoose, { trusted } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    imageUrls: {
      type: [String], // Array of image URLs
      default: [],
      required: true,
    },
    selectedCounty: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const admin = mongoose.model("citiesinformation", adminSchema);

export default admin;
