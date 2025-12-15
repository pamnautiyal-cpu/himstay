const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// CREATE booking
router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ success: true });
});

// GET all bookings (admin)
router.get("/", async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

module.exports = router;
