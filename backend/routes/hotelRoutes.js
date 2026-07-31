const express = require("express");
const Hotel = require("../models/Hotel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");

const router = express.Router();

// Nodemailer Transporter Setup for OTP (Fixed with Host, Port & IPv4 for Render)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // port 465 के लिए true होना जरूरी है
  family: 4,    // Render के IPv6 नेटवर्क एरर को रोकने के लिए
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Cloudinary Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "himstay_properties",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage: storage });

// ============================
// SEND OTP ROUTE FOR PROPERTY VERIFICATION
// ============================
router.post("/send-otp", async (req, res) => {
  const { email, otp, propertyName } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" });
  }

  const mailOptions = {
    from: '"The Himalayans" <infothehimalayans@gmail.com>',
    to: email,
    subject: "Property Listing Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0284c7;">The Himalayans - Property Verification</h2>
        <p>Hello Partner,</p>
        <p>Your verification OTP for listing <b>'${propertyName || "Your Property"}'</b> is:</p>
        <h1 style="background: #f1f5f9; padding: 10px 20px; display: inline-block; letter-spacing: 4px; color: #1e293b; border-radius: 6px;">${otp}</h1>
        <p style="font-size: 12px; color: #64748b; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "OTP sent successfully to email!" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email via server" });
  }
});

// ============================
// ADD HOTEL (PENDING FOR APPROVAL)
// ============================
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    const hotelData = {
      ...req.body,
      images: imageUrls,
      isApproved: false, // Default status pending
    };

    const hotel = await Hotel.create(hotelData);
    res.json({ message: "Property submitted for approval!", hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// ADMIN: GET PENDING PROPERTIES
// ============================
router.get("/pending", async (req, res) => {
  try {
    const hotels = await Hotel.find({ isApproved: false });
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// ADMIN: GET ALL HOTELS (Pending + Approved)
// ============================
router.get("/admin/all", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// ADMIN: APPROVE PROPERTY
// ============================
router.put("/approve/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id, 
      { isApproved: true }, 
      { new: true }
    );
    res.json({ message: "Property Approved & Live!", hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// PUBLIC: GET ONLY APPROVED PROPERTIES
// ============================
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find({ isApproved: true });
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// SEARCH, FILTER, UPDATE, DELETE
// ============================

router.get("/search/city", async (req, res) => {
  try {
    const { city } = req.query;
    const hotels = await Hotel.find({
      city: { $regex: city, $options: "i" },
      isApproved: true
    });
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { city, minPrice, maxPrice, rating } = req.query;
    let filter = { isApproved: true };
    if (city) filter.city = { $regex: city, $options: "i" };
    if (rating) filter.rating = { $gte: rating };
    if (minPrice && maxPrice)
      filter.price = { $gte: minPrice, $lte: maxPrice };

    const hotels = await Hotel.find(filter);
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Hotel updated", hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// GET HOTEL BY ID (इसे हमेशा नीचे रखें)
// ============================
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;