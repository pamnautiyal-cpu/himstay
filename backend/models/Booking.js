const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    hotelId: String,
    hotelName: String,
    checkIn: String,
    checkOut: String,
    guests: String,
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
