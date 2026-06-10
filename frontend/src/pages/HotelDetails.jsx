import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  // 16 Hotels ka complete database
  const localHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy", price: 3500, rating: 4.8, reviews: 19, images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], description: "Gangotri Hwy par sthit shandaar luxury stay.", amenities: ["Wi-Fi", "Parking", "River View"] },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", price: 1800, rating: 4.6, reviews: 61, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], description: "Ekdum ghar jaisa mahaul aur mountain view.", amenities: ["Food", "Balcony"] },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range", price: 2200, rating: 4.9, reviews: 360, images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"], description: "Saaf-suthra aur shant vatavaran.", amenities: ["Wi-Fi", "TV"] },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose, Matli", price: 2800, rating: 4.6, reviews: 117, images: ["https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800"], description: "Modern suvidhaon se lais residency.", amenities: ["AC", "Dining"] },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd, Athali", price: 1500, rating: 4.6, reviews: 46, images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"], description: "Prakriti ki god mein rehne ka anubhav.", amenities: ["Bonfire", "Kitchen"] },
    "local_06": { name: "Himalayan Abode", location: "Main Market, Uttarkashi", price: 4000, rating: 4.7, reviews: 88, images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"], description: "Premium stay in main market.", amenities: ["Parking", "Wi-Fi"] },
    "local_07": { name: "Riverside Retreat", location: "Maneri", price: 3200, rating: 4.5, reviews: 52, images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"], description: "Bhagirathi nadi ke kinare sukoon.", amenities: ["Cafe", "View"] },
    "local_08": { name: "Gangotri View Inn", location: "Gangori Bridge", price: 2500, rating: 4.4, reviews: 29, images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"], description: "Gangotri road par behtareen vistaar.", amenities: ["Parking"] },
    "local_09": { name: "Green Valley Homestay", location: "Village Road, Matli", price: 1200, rating: 4.3, reviews: 22, images: ["https://images.unsplash.com/photo-1449157291145-7efd059a4dc0?w=800"], description: "Budget friendly aur shant.", amenities: ["Garden"] },
    "local_10": { name: "Uttarkashi Guest House", location: "Old Town, Uttarkashi", price: 1000, rating: 4.0, reviews: 15, images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"], description: "Simple aur sasta stay.", amenities: ["Basic"] },
    "local_11": { name: "Mountain Peak Hotel", location: "Dunda Main Rd", price: 2900, rating: 4.5, reviews: 41, images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"], description: "Pahadi nazarein har taraf.", amenities: ["Wi-Fi", "View"] },
    "local_12": { name: "Peaceful Stay", location: "Valley View, Matli", price: 1700, rating: 4.7, reviews: 33, images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"], description: "Ek sukoon bhara anubhav.", amenities: ["Balcony"] },
    "local_13": { name: "Char Dham Camp", location: "Near Highway, Gangotri", price: 4500, rating: 4.9, reviews: 99, images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800"], description: "Yatriyon ke liye sabse best.", amenities: ["Parking", "Restaurant"] },
    "local_14": { name: "Sunrise Residency", location: "Tiloth Road", price: 2100, rating: 4.2, reviews: 27, images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0b655a?w=800"], description: "Subah ki pehli kiranon ka swagat.", amenities: ["AC"] },
    "local_15": { name: "Nature's Nest", location: "Orchard Side, Athali", price: 2600, rating: 4.8, reviews: 55, images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"], description: "Bagon ke beech ek sunder stay.", amenities: ["Garden", "Parking"] },
    "local_16": { name: "Skyline Hotel", location: "City Center, Uttarkashi", price: 3300, rating: 4.4, reviews: 38, images: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"], description: "Shehar ka shandaar view.", amenities: ["Wi-Fi", "Balcony"] }
  };

  useEffect(() => {
    if (localHotels[id]) {
      setHotel(localHotels[id]);
    } else {
      axios.get(`${BACKEND_URL}/api/hotels/${id}`)
        .then((res) => setHotel(res.data))
        .catch((err) => console.error("Error fetching hotel:", err));
    }
  }, [id]);

  // ... baaki payment logic waisa hi rahega jaisa tumne likha tha ...
  
  if (!hotel) return <div>🏔️ Loading luxury property configurations...</div>;

  return (
    // ... wahi return structure jo tumne upar likha tha ...
  );
}