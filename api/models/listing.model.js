import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true }
    },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    username: { type: String, required: true},
    details: {
      accommodation: {
        type: { type: String },
        rooms: [{
          room_id: { type: String, required: true },
          type: { type: String, required: true },
          size: { type: Number, required: true },
          amenities: [{ type: String }]
        }],
        check_in_time: { type: String },
        check_out_time: { type: String }
      },
      dining: {
        meals: [{
          meal_id: { type: String, required: true },
          name: { type: String, required: true },
          description: { type: String },
          price: { type: Number, required: true }
        }],
        operating_hours: {
          open: { type: String },
          close: { type: String }
        }
      },
      entertainment: {
        activities: [{
          activity_id: { type: String, required: true },
          name: { type: String, required: true },
          description: { type: String },
          price: { type: Number, required: true }
        }]
      },
      education: {
        classes: [{
          class_id: { type: String, required: true },
          name: { type: String, required: true },
          subject: { type: String },
          schedule: {
            day: { type: String },
            time: { type: String }
          }
        }]
      },
      health_and_fitness: {
        services: [{
          service_id: { type: String, required: true },
          name: { type: String, required: true },
          description: { type: String },
          price: { type: Number, required: true }
        }]
      }
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
