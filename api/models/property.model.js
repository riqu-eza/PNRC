import mongoose from "mongoose";

const HoursSchema = new mongoose.Schema({
  open: { type: String, required: true }, // Opening time, e.g., "12:00 PM"
  close: { type: String, required: true }, // Closing time, e.g., "10:00 PM"
});

const MenuItemSchema = new mongoose.Schema({
  DishName: { type: String, required: true },
  description: { type: String, required: true },
  DietaryInformation: { type: String },
  Price: { type: Number, required: true },
  NutritionInformation: [{ type: String }],
  AllergenInformation: [{ type: String }],
  dishType: { type: String },
  imageUrls: [{ type: String }],
  ServingTime: { type: String },
  ServingSize: { type: String },
  PreparationTime: { type: String },
  available: { type: Boolean, default: true },
  orderable: { type: Boolean, default: true },
});

const PenaltySchema = new mongoose.Schema({
  hoursBeforeCheckin: { type: Number },
  penaltyType: { type: String, enum: ["fixed", "percentage"] },
  penaltyAmount: { type: Number },
});

const CancellationPolicySchema = new mongoose.Schema({
  freeCancellationWindow: { type: Number },
  refundType: {
    type: String,
    enum: ["full", "partial", "none"],
    required: true,
  },
  cancellationFee: {
    lateCancellationPenalty: PenaltySchema,
  },
  nonRefundableBookings: {
    isNonRefundable: { type: Boolean, default: false },
    exceptions: [{ type: String }],
  },
});

const RoomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  description: { type: String, required: true },
  imageUrls: [{ type: String }], // Change to array of Strings
  amenities: [{ type: String }], // Change to array of Strings
  pricePerNight: { type: Number, required: true }, // Change to Number
  discount: { type: Number, required: false },
  available: { type: Boolean, default: true },

  returnPolicy: [CancellationPolicySchema],
});

const CinemaSchema = new mongoose.Schema({
  movieTitle: [{ type: String }],
  cinemaHall: [{ type: String }],
  showtimes: [{ type: String }],
  ticketPrice: [{ type: String }],
  duration: [{ type: String }],
  rating: [{ type: String }],
  cinemaLocation: [{ type: String }],
  availableSeats: [{ type: String }],
  imageUrls: [{ type: String }],
});
const PerformanceShema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
    location: {
      venueName: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    performers: [
      {
        name: {
          type: String,
          required: true,
        },
        genre: {
          type: String,
        },
      },
    ],
    cost: {
      type: Number,
      required: true,
    },
    ticketing: {
      prices: [
        {
          type: {
            type: String, // Example: "General Admission", "VIP"
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      availability: {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
      isSoldOut: {
        type: Boolean,
        default: false,
      },
    },
   
  },
  { timestamps: true }
);

const GamingShema = new mongoose.Schema({
  name: { type: String },
  cost: { type: Number },
  age: { type: String },
  groupsize: { type: String },
  duration: { type: String },
  requiredequipmwnts: { type: String },
});

const SubcategorySchema = new mongoose.Schema({
  subcategory: { type: String, required: true },
  count: { type: Number }, // Change count to Number for consistency
  rooms: [RoomSchema],
  menuItems: [MenuItemSchema],
  EntertainmentItems: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  CultureItems: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  EducationItems: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  HealthItems: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  ServicesItems: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  ShoppingItems: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategories: [SubcategorySchema],
});

const PropertyInfoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    amenities: [{ type: String }],
    imageUrls: [{ type: String }], // Change to array of Strings
    category: [CategorySchema],
    hours: [HoursSchema],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      location: {
        address: { type: String, required: true },
        lat: { type: Number, required: true }, // Ensure these are Numbers
        lng: { type: Number, required: true },
      },
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", PropertyInfoSchema); // Fix model name

export default Property;
