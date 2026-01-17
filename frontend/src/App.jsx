import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AllStays from "./pages/AllStays";
import HotelDetails from "./pages/HotelDetails";

export default function App() {
  return (
    <BrowserRouter>

      {/* HOME PAGE */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        {/* HOTELS PAGE — NO HOME LAYOUT */}
        <Route
          path="/hotels"
          element={
            <>
              <Navbar />
              <AllStays />
              <Footer />
            </>
          }
        />

        <Route
          path="/hotels/:id"
          element={
            <>
              <Navbar />
              <HotelDetails />
              <Footer />
            </>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}
