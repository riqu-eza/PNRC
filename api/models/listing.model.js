import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: Number, required: true },
    amenities: { type: String  },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      location:{
        address: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    username: { type: String, required: true},
    details: {
      accommodation: {
        rooms: [{
          beds: { type: String },
          type: { type: String,  },
          price: { type: String,  },
          dicount: { type: String,  },
          description:{ type: String,  },
          amenities: [{ type: String,  }],
          imageUrls: [{ type: String,  }],
          
          size: { type: Number, },
        }],
        check_in_time: { type: String },
        check_out_time: { type: String },
        amenities: [{ type: String }],
        imagesurl: [{ type: String }],


      },
      dining: {
        meals: [{
          meal_id: { type: String,  },
          name: { type: String,  },
          description: { type: String },
          price: { type: Number, }
        }],
        operating_hours: {
          open: { type: String },
          close: { type: String }
        }
      },
      entertainment: {
        activities: [{
          activity_id: { type: String,  },
          name: { type: String, },
          description: { type: String },
          price: { type: Number,  }
        }]
      },
      education: {
        classes: [{
          class_id: { type: String,},
          name: { type: String, },
          subject: { type: String },
          schedule: {
            day: { type: String },
            time: { type: String }
          }
        }]
      },
      health_and_fitness: {
        services: [{
          service_id: { type: String, },
          name: { type: String,  },
          description: { type: String },
          price: { type: Number, }
        }]
      }
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
