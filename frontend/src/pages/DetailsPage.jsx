import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://himstay.onrender.com";

export default function DetailsPage() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  // लोकल होटल्स का डेटा ताकि local_ वाले आइटम्स सीधे यहाँ से मिल जाएं
  const localUttarkashiHotels = {
    "local_01": { name: "Hotel Nagraja Palace", location: "Gangotri Hwy, Matli", image: "/images/hotals/Hotel Nagraja Palac1.jpg", price: "2,499", rating: "4.8", description: "Luxury stay at Gangotri with traditional architecture and modern comfort.", facilities: "Food, Parking, CCTV, Wi-Fi" },
    "local_02": { name: "Grandparents Homestay", location: "NH 34, Matli", image: "/images/hotals/Grandparents Homestay1.jpg", price: "1,899", rating: "4.9", description: "Peaceful family homestay offering authentic mountain hospitality.", facilities: "Home-cooked food, Parking" },
    "local_03": { name: "Hotel Prisha Pahal", location: "Barahat Range, Matli", image: "/images/hotals/Hotel Prisha Pahal1.jpg", price: "2,199", rating: "4.7", description: "Scenic valley views with comfortable modern rooms.", facilities: "Parking, Wi-Fi, Room Service" },
    "local_04": { name: "Hotel K.P Residency", location: "Near Medicose, Matli", image: "/images/hotals/Hotel K.P Residency1.jpg", price: "2,200", rating: "4.6", description: "Comfortable stay close to the main highway and market.", facilities: "Parking, Power Backup" },
    "local_05": { name: "Dhruvnanda Homestay", location: "ITBP Rd, Athali", image: "/images/hotals/Dhruvnanda Homestay1.jpg", price: "1,599", rating: "4.8", description: "Cozy retreat surrounded by nature and apple orchards.", facilities: "Organic food, Garden" },
    "local_06": { name: "Himalayan Abode", location: "Main Market, Uttarkashi", image: "/images/hotals/Himalayan Abode home stay.jpg", price: "2,799", rating: "4.9", description: "Right in the heart of Uttarkashi with premium amenities.", facilities: "Wi-Fi, Restaurant, Hot Water" },
    "local_07": { name: "Ganges Riverside Ashram & Yoga Stay", location: "Bhagirathi Bank, Rishikesh", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", price: "1,899", rating: "4.9", description: "Spiritual sanctuary right by the sacred river flow.", facilities: "Yoga sessions, Meditation hall" },
    "local_08": { name: "Kedarkantha Base Camp Wooden Cottage", location: "Sankri, Kedarkantha", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600", price: "3,199", rating: "4.7", description: "Wooden alpine cottages designed for trekkers and nature lovers.", facilities: "Bonfire, Trek guide, Heater" }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (id && id.startsWith("local_")) {
          if (localUttarkashiHotels[id]) {
            setData({ id, ...localUttarkashiHotels[id] });
          }
          setLoading(false);
          return;
        }

        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else if (localUttarkashiHotels[id]) {
          setData({ id, ...localUttarkashiHotels[id] });
        }
      } catch (err) { 
        console.error(err);
        if (localUttarkashiHotels[id]) {
          setData({ id, ...localUttarkashiHotels[id] });
        }
      } finally { 
        setLoading(false); 
      }
    };
    fetchListing();
  }, [id]);

  const handleConfirmBooking = async () => {
    if (!bookingName || !bookingDate) { alert("Fill details!"); return; }
    const price = data?.price ? parseInt(data.price.replace(/,/g, "")) : 500;
    try {
      const { data: orderData } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, { amount: price });
      const options = {
        key: "rzp_test_RxW3zOEiOiGN69",
        amount: orderData.amount,
        currency: "INR",
        name: "The Himalayans",
        description: `Booking for ${data?.name}`,
        order_id: orderData.id,
        handler: async (response) => {
          const res = await axios.post(`${BACKEND_URL}/api/payment/verify`, response);
          if (res.data.success) {
            const existingTrips = JSON.parse(localStorage.getItem("myTrips") || "[]");
            localStorage.setItem("myTrips", JSON.stringify([...existingTrips, { id, name: bookingName, date: bookingDate, amount: price, status: "Confirmed" }]));
            alert("🎉 Booking Confirmed!");
            setShowModal(false);
            navigate("/mytrips");
          }
        }
      };
      new window.Razorpay(options).open();
    } catch (err) { alert("Payment failed."); }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "80px", fontSize: "18px" }}>Loading Details...</div>;

  return (
    <div className="details-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer", background: "none", border: "none", color: "#0284c7", fontWeight: "700", fontSize: "15px" }}>← Back</button>
      <h1>{data?.name}</h1>
      <p style={{ color: "#64748b", fontWeight: "600" }}>📍 {data?.location || data?.city}</p>
      
      <img 
        src={data?.image || "/images/hotals/Hotel Nagraja Palac1.jpg"} 
        alt={data?.name} 
        style={{ width: "100%", borderRadius: "12px", height: "400px", objectFit: "cover", marginTop: "10px" }} 
        onError={(e) => { e.target.src = "/images/hotals/Hotel Nagraja Palac1.jpg"; }}
      />
      
      <p style={{ marginTop: "20px", fontSize: "16px", color: "#334155", lineHeight: "1.6" }}>{data?.description}</p>

      {/* Facilities & Check-in */}
      <div style={{ border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px", margin: "20px 0", display: "flex", gap: "40px", background: "#fff" }}>
        <div><h3>Facilities:</h3><p>{data?.facilities || "Food, Parking, CCTV"}</p></div>
        <div><h3>Check-in:</h3><p>12:00 PM | Check-Out: 11:00 AM</p></div>
      </div>

      {/* DYNAMIC ROOM TYPES */}
      <div style={{ margin: "30px 0", background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3>Hotel Rooms</h3>
        {data?.rooms && data.rooms.length > 0 ? (
          data.rooms.map((room, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderBottom: "1px solid #eee" }}>
              <span><strong>{room.type}</strong></span>
              <span>₹{room.price}</span>
              <button onClick={() => setShowModal(true)} style={{ background: "#f97316", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Book Now</button>
            </div>
          ))
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px" }}>
            <span><strong>Base Room</strong></span>
            <span style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>₹{data?.price || "2,499"}</span>
            <button onClick={() => setShowModal(true)} style={{ background: "#f97316", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Book Now</button>
          </div>
        )}
      </div>

      {/* TERMS & CONDITIONS */}
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", fontSize: "0.85rem", color: "#64748b", marginTop: "30px", border: "1px solid #e2e8f0" }}>
        <h3>Terms & Conditions</h3>
        <p style={{ whiteSpace: "pre-line" }}>
          {data?.terms || `1. According to government rules, all guests must bring a valid government ID proof at the time of check-in. Guests are not allowed under the age of 18.
          2. Guest cannot bring any illegal things at the accommodation.
          3. Room capacity limit is strictly followed.
          4. Check-in: 12:00 PM, Check-out: 11:00 AM. No early check-in/late check-out allowed.
          5. Pay at check-in guests must arrive before 3:00 PM.
          6. Certain religious properties only for specific Yatris.
          7. Selected properties have no refund policy.
          8. Food choices are limited; fixed North Indian vegetarian meals.
          9. Basic facilities only; be prepared for power outages.
          10. No refunds for natural disasters, weather, or travel issues.
          11. Any dispute subject to Dehradun (Uttarakhand) jurisdiction.`}
        </p>
      </div>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2>Booking for {data?.name}</h2>
            <input type="text" placeholder="Your Name" style={inputStyle} value={bookingName} onChange={(e) => setBookingName(e.target.value)} />
            <input type="date" style={inputStyle} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            <button onClick={handleConfirmBooking} style={btnStyle}>Pay Now</button>
            <button onClick={() => setShowModal(false)} style={{ marginLeft: "10px", padding: "10px 15px", cursor: "pointer", borderRadius: "5px" }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "320px", textAlign: "center" };
const inputStyle = { width: "90%", padding: "10px", margin: "10px 0" };
const btnStyle = { padding: "10px 20px", background: "#006ce4", color: "white", border: "none", cursor: "pointer" };