// models/Order.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    ticketCount: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    listingEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    listingName: {
      type: String,
      required: true,
      trim: true,
    },
    
    eventType: {
      type: String,
      required: true,
      trim: true,
    },
    eventTime: {
      type: String, // or Date if it's ISO-formatted and needs to be stored as a date
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const EntertainmentOrder = mongoose.model('EntertainmentOrder', orderSchema);

export default EntertainmentOrder;
