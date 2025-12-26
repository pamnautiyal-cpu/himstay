import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Discover from "./pages/Discover";
import About from "./pages/About";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/support" element={<Support />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
