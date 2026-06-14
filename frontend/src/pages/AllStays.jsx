import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function AllStays() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const localUttarkashiHotels = [
    { _id: "local_01", name: "Hotel Nagraja Palace", city: "Matli", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", location: "Gangotri Hwy" },
    { _id: "local_02", name: "Grandparents Homestay", city: "Matli",  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600", location: "NH 34" },
    { _id: "local_03", name: "Hotel Prisha Pahal", city: "Matli", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", location: "Barahat Range" },
    { _id: "local_04", name: "Hotel K.P Residency", city: "Matli", image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600", location: "Near Medicose" },
    { _id: "local_05", name: "Dhruvnanda Homestay", city: "Athali", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600", location: "ITBP Rd" },
    { _id: "local_06", name: "Himalayan Abode", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600", location: "Main Market" },
    { _id: "local_07", name: "Riverside Retreat", city: "Maneri", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", location: "Bhagirathi Bank" },
    { _id: "local_08", name: "Gangotri View Inn", city: "Gangori", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600", location: "Gangori Bridge" },
    { _id: "local_09", name: "Green Valley Homestay", city: "Matli", image: "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=600", location: "Village Road" },
    { _id: "local_10", name: "Uttarkashi Guest House", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600", location: "Old Town" },
    { _id: "local_11", name: "Mountain Peak Hotel", city: "Dunda", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", location: "Dunda Main Rd" },
    { _id: "local_12", name: "Peaceful Stay", city: "Matli", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600", location: "Valley View" },
    { _id: "local_13", name: "Char Dham Camp", city: "Gangotri Rd", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", location: "Near Highway" },
    { _id: "local_14", name: "Sunrise Residency", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=600", location: "Tiloth Road" },
    { _id: "local_15", name: "Nature's Nest", city: "Athali", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600", location: "Orchard Side" },
    { _id: "local_16", name: "Skyline Hotel", city: "Uttarkashi", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600", location: "City Center" }
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

  if (loading) return <div style={{textAlign: "center", padding: "50px", fontSize: "20px"}}>🏔️ Loading Stays...</div>;

  return (
    <div className="stays-page-wrap" style={{ padding: "20px" }}> 
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Stays in Uttarakhand</h1>
      
      {/* अपडेटेड CSS Grid जो कार्ड्स को छोटा और रिस्पॉन्सिव रखेगा */}
      <div className="hotel-grid-container" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
        gap: "20px" 
      }}> 
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card" style={{ 
            border: "1px solid #ddd", 
            borderRadius: "10px", 
            overflow: "hidden", 
            transition: "transform 0.2s" 
          }}> 
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              style={{ width: "100%", height: "150px", objectFit: "cover" }} 
            />
            
            <div className="hotel-info" style={{ padding: "10px" }}>
              <h3 style={{ fontSize: "16px", margin: "5px 0" }}>{hotel.name}</h3>
              <p style={{ fontSize: "12px", color: "#666", margin: "5px 0" }}>📍 {hotel.location || hotel.city}</p>
              <div className="price" style={{ fontSize: "14px", fontWeight: "bold", color: "#f97316", margin: "10px 0" }}>
                ₹{hotel.price} <small style={{ color: "#999" }}>per night</small>
              </div>
              <button className="view-btn" style={{ 
                  width: "100%", padding: "8px", background: "#006ce4", 
                  color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" 
                }}
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}