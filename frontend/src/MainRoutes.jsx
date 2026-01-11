import { Routes, Route } from "react-router-dom";

/* PAGES */
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";      // ✅ ADD
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import YogaDetail from "./pages/YogaDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DestinationDetail from "./pages/DestinationDetail";
import CharDhamDetail from "./pages/CharDhamDetail";

/* ADMIN */
import AdminAddHotel from "./pages/AdminAddHotel";
import AdminBookings from "./pages/AdminBookings";

export default function MainRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />

      {/* ✅ FIX HERE */}
      <Route path="/hotels" element={<AllStays />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />

      <Route path="/booking" element={<Booking />} />

      <Route
        path="/yoga/himalayan-retreat"
        element={<YogaDetail />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/destination/:slug" element={<DestinationDetail />} />
      <Route path="/chardham/:slug" element={<CharDhamDetail />} />

      {/* ADMIN */}
      <Route path="/admin/add-hotel" element={<AdminAddHotel />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
    </Routes>
  );
}
