const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ message: "Booking successful", booking });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Get all bookings of one user
router.get("/:userId", async (req, res) => {
  const bookings = await Booking.find({ userId: req.params.userId })
    .populate("hotelId")
    .populate("userId");

  res.json(bookings);
});

module.exports = router;
