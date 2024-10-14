import mongoose, { Types } from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },

    numberOfPeople: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },

    listingEmail: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
