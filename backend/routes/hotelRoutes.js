const express = require("express");
const Hotel = require("../models/Hotel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// Cloudinary Configuration (Ye wahi keys use karega jo process.env mein hain)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "himstay_properties",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage: storage });

// ============================
// ADD HOTEL (ADMIN) - UPDATED WITH CLOUDINARY
// ============================
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    // Cloudinary se milne wala secure_url save karenge
    const imageUrl = req.file ? req.file.path : null;

    const hotelData = {
      ...req.body,
      image: imageUrl, // Yahan ab asali Cloudinary URL aayega
    };

    const hotel = await Hotel.create(hotelData);
    res.json({ message: "Hotel added!", hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// SEARCH, FILTER, GET, UPDATE, DELETE (Purana code same rakha hai)
// ============================

router.get("/search/city", async (req, res) => {
  const { city } = req.query;
  const hotels = await Hotel.find({
    city: { $regex: city, $options: "i" },
  });
  res.json(hotels);
});

router.get("/filter", async (req, res) => {
  const { city, minPrice, maxPrice, rating } = req.query;
  let filter = {};
  if (city) filter.city = { $regex: city, $options: "i" };
  if (rating) filter.rating = { $gte: rating };
  if (minPrice && maxPrice)
    filter.price = { $gte: minPrice, $lte: maxPrice };

  const hotels = await Hotel.find(filter);
  res.json(hotels);
});

router.get("/", async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
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

router.get("/:id", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
});

module.exports = router;