const express = require("express");
const Hotel = require("../models/Hotel");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// ============================
// ADD HOTEL (ADMIN) - UPDATED WITH MULTER
// ============================
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    // Agar file upload hui hai, to uska path lo, warna null
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const hotelData = {
      ...req.body,
      image: imagePath,
    };

    const hotel = await Hotel.create(hotelData);
    res.json({ message: "Hotel added!", hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// SEARCH HOTELS BY CITY
// ============================
router.get("/search/city", async (req, res) => {
  const { city } = req.query;
  const hotels = await Hotel.find({
    city: { $regex: city, $options: "i" },
  });
  res.json(hotels);
});

// ============================
// FILTER HOTELS
// ============================
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

// ============================
// GET ALL HOTELS
// ============================
router.get("/", async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

// ============================
// UPDATE HOTEL (ADMIN)
// ============================
router.put("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Hotel updated", hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// DELETE HOTEL (ADMIN)
// ============================
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// GET HOTEL BY ID (ALWAYS LAST)
// ============================
router.get("/:id", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
});

module.exports = router;