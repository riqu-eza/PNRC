import mongoose from "mongoose";

const letterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    { Timestamp: true }
);

const Letter = mongoose.model("Letter", letterSchema)

export default Letter;
