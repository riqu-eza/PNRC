import mongoose from "mongoose";

const Cityschema = new mongoose.Schema(
  { newcity: { type: String, required: true, unique: true } },
  { timestamps: true }
);

const City = mongoose.model("City", Cityschema);

export default City;
