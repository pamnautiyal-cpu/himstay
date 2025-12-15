import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
      <Footer />   {/* 👈 FOOTER YAHI ADD HOTA HAI */}
    </BrowserRouter>
  );
}

export default App;
