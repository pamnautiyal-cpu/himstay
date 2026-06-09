import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_URL = "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const cityQuery = queryParams.get("city");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        setHotels(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    if (!cityQuery) return true;
    return hotel.city?.toLowerCase().includes(cityQuery.toLowerCase());
  });

  if (loading) return <div style={{ padding: 40 }}>Loading your Himalayan stays... 🏔️</div>;

  return (
    <div style={{ padding: 40, background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1>Stays in Uttarakhand</h1>
        {cityQuery && <p style={{ color: "#2563eb" }}>Showing stays in "{cityQuery}"</p>}

        {filteredHotels.map((hotel) => (
          <div key={hotel._id} style={{ display: "flex", background: "#fff", borderRadius: "16px", marginBottom: "20px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <img src={hotel.image} alt={hotel.name} style={{ width: "300px", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h2>{hotel.name}</h2>
                <p>📍 {hotel.city || hotel.location}</p>
                <p>⭐ {hotel.rating || 4.5}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ color: "green" }}>₹{hotel.price} / night</h3>
                <button onClick={() => navigate(`/hotels/${hotel._id}`)} style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}