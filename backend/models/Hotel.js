const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    listingCategory: { type: String },
    propertyType: { type: String },
    city: { type: String, required: true },
    locality: { type: String },
    pincode: { type: String },
    state: { type: String },
    country: { type: String },
    price: { type: Number, required: true },
    maxGuests: { type: String },
    roomDetails: { type: String },
    roomType: { type: String },
    roomView: { type: String },
    roomSize: { type: String },
    sizeUnit: { type: String },
    numberOfRooms: { type: String },
    phone: { type: String },
    ownerEmail: { type: String },
    description: { type: String },
    images: { type: [String], required: true },
    isApproved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);