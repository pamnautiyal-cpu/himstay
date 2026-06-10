import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Import all pages
import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import MyTrips from "./pages/MyTrips";
import Contact from "./pages/Contact";
import ListProperty from "./pages/ListProperty";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<AllStays />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  );
}