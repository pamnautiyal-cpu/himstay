import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrekDetails from "./pages/TrekDetails";


function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/treks/:trekId" element={<TrekDetails />} />

    </Routes>
  );
}

export default MainRoutes;
