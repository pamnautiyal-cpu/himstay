const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    images: { type: [String], required: true }, // ✅ Array of Strings
    description: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);