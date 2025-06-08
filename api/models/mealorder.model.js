// models/Order.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  contact: {
    type: String,
    required: true,
  },
 orderType:{
    type: String,
    required: true,
  },
  mealCount: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },
  mealname:{
    type: String,
    required: true,
  }
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

export default Order;
