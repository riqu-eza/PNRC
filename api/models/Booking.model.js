import mongoose, { Types } from "mongoose";

const BookingSchema = new mongoose.Schema({
  arrivalDate: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userEmail:{
    type:String,
    required:true,
  },
},
{timestamps:true}
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
