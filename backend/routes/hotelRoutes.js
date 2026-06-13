const express = require("express");
const Hotel = require("../models/Hotel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

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
// ADD HOTEL (ADMIN) - UPDATED FOR MULTIPLE IMAGES
// ============================
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    // ✅ req.files array se saare Cloudinary URLs nikalenge
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    const hotelData = {
      ...req.body,
      images: imageUrls, // ✅ Ab yahan array of URLs store hoga
    };

    const hotel = await Hotel.create(hotelData);
    res.json({ message: "Hotel added with multiple images!", hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================
// SEARCH, FILTER, GET, UPDATE, DELETE
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