import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDescription: { type: String, required: true },
  productImage: { type: [String], required: true },
});

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  category: {
    selectedCategory: { type: String, required: true },
    selectedSubcategory: { type: String, required: true },
  },
  location: { type: String, required: true },
  selectedCounty: { type: String, required: true },
  address: { type: String, required: true },
  imageUrls: { type: [String], required: true }, 
  products: { type: [productSchema], default: [] },
});

const Business = mongoose.model("Business", businessSchema);

export default Business;
