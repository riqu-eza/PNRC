import mongoose from "mongoose";

const HoursSchema = new mongoose.Schema({
    open: { type: String, required: true },  // Opening time, e.g., "12:00 PM"
    close: { type: String, required: true }  // Closing time, e.g., "10:00 PM"
});

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    ingredients: [{ type: String }],  
    allergens: [{ type: String }],  
    dishType: { type: String, required: true },  
    available: { type: Boolean, default: true },  
    orderable: { type: Boolean, default: true },  
    specialInstructions: { type: String }  
});

const PenaltySchema = new mongoose.Schema({
    hoursBeforeCheckin: { type: Number,  }, 
    penaltyType: { type: String, enum: ["fixed", "percentage"],  }, 
    penaltyAmount: { type: Number, },
});

const CancellationPolicySchema = new mongoose.Schema({
    freeCancellationWindow: { type: Number, }, 
    refundType: { type: String, enum: ["full", "partial", "none"], required: true }, 
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
    imageUrls: [{ type: String }],  // Change to array of Strings
    amenities: [{ type: String,}], // Change to array of Strings
    pricePerNight: { type: Number, required: true }, // Change to Number
    discount: { type: Number, required: false },
    available: { type: Boolean, default: true },  

    returnPolicy: [CancellationPolicySchema],
});

const SubcategorySchema = new mongoose.Schema({
    subcategory: { type: String, required: true },
    count: { type: Number,  }, // Change count to Number for consistency
    rooms: [RoomSchema], 
    menuItems: [MenuItemSchema], 
});

const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    subcategories: [SubcategorySchema], 
});

const PropertyInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
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
}, { timestamps: true });

const Property = mongoose.model("Property", PropertyInfoSchema); // Fix model name

export default Property;
