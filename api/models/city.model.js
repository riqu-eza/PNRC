import mongoose from "mongoose";

const Cityschema = new mongoose.Schema(
  {
    newcity: { type: String, required: true, unique: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const City = mongoose.model("City", Cityschema);

export default City;
