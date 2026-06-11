import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", price: 3500, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", price: 1800, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800" },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range", price: 2200, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800" },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose", price: 2800, image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800" },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd", price: 1500, image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800" },
    "local_06": { name: "Himalayan Abode", location: "Main Market", price: 4000, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },
    "local_07": { name: "Riverside Retreat", location: "Bhagirathi Bank", price: 3200, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge", price: 2500, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800" },
    "local_09": { name: "Green Valley Homestay", location: "Village Road", price: 1200, image: "https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=800" },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town", price: 1000, image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800" },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd", price: 2900, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" },
    "local_12": { name: "Peaceful Stay", location: "Valley View", price: 1700, image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800" },
    "local_13": { name: "Char Dham Camp", location: "Near Highway", price: 4500, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800" },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road", price: 2100, image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=800" },
    "local_15": { name: "Nature's Nest", location: "Orchard Side", price: 2600, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800" },
    "local_16": { name: "Skyline Hotel", location: "City Center", price: 3300, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" }
  };

  useEffect(() => {
    console.log("Searching for ID:", id); // Ye check karega ki console mein ID kya aa rahi hai
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.log("Backend pe nahi mila:", err));
    }
  }, [id]);

  if (!hotel) return <div style={{padding:"50px", textAlign:"center"}}><h2>Hotel data nahi mil raha (ID: {id})</h2></div>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>{hotel.name}</h1>
      <img src={hotel.image} style={{width:"100%", borderRadius:"10px"}} />
      <p style={{fontSize:"18px", marginTop:"15px"}}>📍 {hotel.location}</p>
      <h2>Price: ₹{hotel.price}</h2>
      <button onClick={() => alert("Payment feature active!")}>Reserve</button>
    </div>
  );
}