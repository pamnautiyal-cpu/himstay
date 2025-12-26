import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrekDetails from "./pages/TrekDetails";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/treks/:slug" element={<TrekDetails />} />
    </Routes>
  );
}
