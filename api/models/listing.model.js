import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    imageUrls: {
      type: [String], // Array of image URLs
      default: [],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    contact: {
      type: Number,
      required: true,
    },
    selectedCategory: {
      type: String,
      required: false,
    },
    selectedSubcategory: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    selectedCounty: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["rent", "sale"], // Type can only be 'rent' or 'sale'
      default: "rent",
    },
    openinghour: {
      type: String,
      required: false,
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    regularPrice: {
      type: Number,
      default: 50,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    recreation:{
      type:Boolean,
      default:false,
    },
    eventfacilities:{
      type:Boolean,
      default:false,
    },
    security:{
      type:Boolean,
      default:false,
    },
    transportation:{
      type:Boolean,
      default:false,
    },
    rooms:{
      type:Number,
      default: 1 ,
    }

  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
