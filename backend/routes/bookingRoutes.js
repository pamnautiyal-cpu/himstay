const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// ADD BOOKING (already used by frontend)
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ message: "Booking saved", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL BOOKINGS (ADMIN)
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
