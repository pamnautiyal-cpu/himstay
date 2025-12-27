import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrekDetails from "./pages/TrekDetails";
import YogaDetails from "./pages/YogaDetails";
import Booking from "./pages/Booking";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/treks/:slug" element={<TrekDetails />} />
      <Route path="/yoga/:slug" element={<YogaDetails />} />
<Route path="/booking" element={<Booking />} />

    </Routes>
  );
}
