const express = require("express");
const Hotel = require("../models/Hotel");

const router = express.Router();

// ADD HOTEL  (ADMIN)
router.post("/add", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.json({ message: "Hotel added!", hotel });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET ALL HOTELS
router.get("/", async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

// GET HOTEL BY ID
router.get("/:id", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
});

// SEARCH HOTELS BY CITY
router.get("/search/city", async (req, res) => {
  const { city } = req.query;
  const hotels = await Hotel.find({
    city: { $regex: city, $options: "i" },
  });
  res.json(hotels);
});

// FILTER HOTELS
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

module.exports = router;
