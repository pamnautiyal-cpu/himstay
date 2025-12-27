import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import YogaDetails from "./pages/YogaDetails";
import Booking from "./pages/Booking";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/yoga/:slug" element={<YogaDetails />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
}
