import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  // ... (baki tumhara wahi code hai jo tumne bheja tha)

  // Listing loop ke andar button ko yahan se replace karo:
  <button 
    onClick={() => navigate(`/hotels/${hotel._id}`)} 
    style={{ padding: "12px 28px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
  >
    View Details
  </button>
}