import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import YogaDetail from "./pages/YogaDetail"; // ✅ SINGULAR
import Login from "./pages/Login";
import Register from "./pages/Register";
import DestinationDetail from "./pages/DestinationDetail";
import CharDhamDetail from "./pages/CharDhamDetail";


export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />

      <Route path="/booking" element={<Booking />} />

      {/* ✅ YOGA ROUTE */}
      <Route
        path="/yoga/himalayan-retreat"
        element={<YogaDetail />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
<Route path="/destination/:slug" element={<DestinationDetail />} />
<Route path="/chardham/:slug" element={<CharDhamDetail />} />

    </Routes>
  );
}
