import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema(
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
        openinghour: {
            type: String,
            required: false,
        },
        productName: {
            type: String,
            required: true,
        },
        productprice: {
            type: String,
            required: true,
        },      
          productdescription: {

            type: String,
            required: true,
        },
        // username: {
        //     type: String,
        //     required: true,
        // }

    },
    { timestamps: true }
);

const Business = mongoose.model("Business", BusinessSchema);

export default Business;
