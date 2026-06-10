import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const localUttarkashiHotels = [
    { _id: "local_nagraja_01", name: "Hotel Nagraja Palace", city: "Matli, Uttarkashi", price: 3500, rating: 4.8, reviews: 19, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", roomType: "Luxury View Room", guests: 3, view: "River View", location: "Gangotri Hwy" },
    { _id: "local_grandparents_02", name: "Grandparents Homestay", city: "Matli, Uttarkashi", price: 1800, rating: 4.6, reviews: 61, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600", roomType: "Traditional Room", guests: 2, view: "Mountain View", location: "NH 34" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        const merged = [...localUttarkashiHotels, ...res.data.filter(bh => !bh._id.startsWith("local_"))];
        setHotels(merged);
        setLoading(false);
      })
      .catch(() => {
        setHotels(localUttarkashiHotels);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>🏔️ Loading...</div>;

  return (
    <div className="home-wrap"> 
      <h1>Stays in Uttarakhand</h1>
      <div className="hotel-list"> 
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card"> 
            <img src={hotel.image} alt={hotel.name} />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p>{hotel.location || hotel.city}</p>
              {hotel.view && <p><small>View: {hotel.view}</small></p>}
              <div className="price">₹{hotel.price} per night</div>
              <button className="view-btn" onClick={() => navigate(`/hotels/${hotel._id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}