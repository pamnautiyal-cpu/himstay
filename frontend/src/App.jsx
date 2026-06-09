import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import MyTrips from "./pages/MyTrips";
import AdminBookings from "./pages/AdminBookings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<AllStays />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/mytrips" element={<MyTrips />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
    </Routes>
  );
}