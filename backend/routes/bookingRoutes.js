const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ message: "Booking saved", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Status updated", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ error: "Update karne mein error: " + err.message });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userBookings = await Booking.find({
      $or: [{ email: userEmail }, { "bookingData.email": userEmail }]
    })
    .populate("hotelId", "name city price")
    .sort({ createdAt: -1 });

    res.json(userBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("hotelId", "name city price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;