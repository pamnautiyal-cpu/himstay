import React from "react";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { category, id } = useParams(); // URL से कैटेगरी और ID पकड़ेगा

  return (
    <div className="details-container" style={{ padding: "20px" }}>
      <h1>Details for: {id}</h1>
      <p>Category: {category}</p>
      {/* यहाँ हम इमेज, प्राइस और 'Book Now' बटन डालेंगे */}
      <div className="booking-box" style={{ border: "1px solid #ccc", padding: "20px" }}>
        <button className="view-btn">Book Now</button>
      </div>
    </div>
  );
}