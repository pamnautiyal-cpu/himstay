import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Dashboard from "./pages/Dashboard";
import MyTrips from "./pages/MyTrips";
import AdminAddHotel from "./pages/AdminAddHotel";
import HotelDetails from "./pages/HotelDetails";

// Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />

      {/* ✔ MyTrips new page */}
      <Route
        path="/mytrips"
        element={
          <ProtectedRoute>
            <MyTrips />
          </ProtectedRoute>
        }
      />

      {/* Old Dashboard route (optional) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/add-hotel"
        element={
          <ProtectedRoute>
            <AdminAddHotel />
          </ProtectedRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default MainRoutes;
