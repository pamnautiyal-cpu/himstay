import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ FOOTER IMPORT

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
      <Footer /> {/* ✅ FOOTER ADDED HERE */}
    </BrowserRouter>
  );
}

export default App;
