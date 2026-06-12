const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    name: String,
    email: String,
    phone: String,
    city: String,
    guests: Number,
    checkIn: String,
    packageType: String,
    notes: String,
    // ✅ Naya field add kiya: Purane data par koi asar nahi padega
    status: {
      type: String,
      default: "Pending", // Purani saari bookings automatically 'Pending' ho jayengi
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);