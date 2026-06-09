const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// 1️⃣ एंडपॉइंट: डेटाबेस में नई बुकिंग सेव करने के लिए
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ message: "Booking saved", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2️⃣ एंडpॉइंट: विशिष्ट यूजर की ईमेल के आधार पर बुकिंग्स खोजना (✨ NEW DYNAMIC FILTER)
router.get("/user/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    
    // डेटाबेस में खोजना जहाँ 'email' या 'bookingData.email' यूजर की लॉगिन ईमेल से मैच करे
    const userBookings = await Booking.find({
      $or: [
        { email: userEmail },
        { "bookingData.email": userEmail }
      ]
    })
    .populate("hotelId", "name city price")
    .sort({ createdAt: -1 });

    res.json(userBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3️⃣ एंडपॉइंट: सभी बुकिंग्स निकालना (एडमिन पैनल के लिए)
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