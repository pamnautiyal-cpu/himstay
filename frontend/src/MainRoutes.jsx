import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import YogaDetails from "./pages/YogaDetails";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />

      <Route path="/booking" element={<Booking />} />

      {/* ✅ YOGA DETAIL PAGE */}
      <Route path="/yoga/:slug" element={<YogaDetails />} />

      {/* fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
