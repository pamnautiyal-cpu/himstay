import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminAddHotel from "./pages/AdminAddHotel";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/booking/:id" element={<Booking />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ADMIN ADD HOTEL PAGE */}
        <Route path="/admin/add-hotel" element={<AdminAddHotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
