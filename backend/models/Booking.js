const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guests: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
