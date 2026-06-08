import React, { useEffect, useState } from "react";
import { getHotels } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHotels()
      .then((res) => setHotels(res.data || []))
      .catch(() => setHotels([]));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>🏔 Hotels</h1>

      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          style={{
            padding: 20,
            margin: 10,
            background: "#f8fafc",
            borderRadius: 10,
          }}
        >
          <h3>{hotel.name}</h3>
          <p>{hotel.city}</p>
          <h4>₹ {hotel.price}</h4>

          <button
            onClick={() => navigate(`/hotels/${hotel._id}`)}
            style={{
              padding: 10,
              background: "#0ea5e9",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}