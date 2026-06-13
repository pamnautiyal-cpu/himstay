import React from "react";
import { useParams } from "react-router-dom";
import { destinationData } from "../data"; // ✅ सुनिश्चित करें कि आपने data.js फाइल बना ली है

export default function DetailsPage() {
  const { category, id } = useParams();
  
  // 'id' के आधार पर डेटा ढूँढें (अगर id match न हो तो एक default message)
  const data = destinationData[id];

  if (!data) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>{id}</h1>
        <p>Category: {category}</p>
        <p>Information coming soon for this destination!</p>
        <button className="view-btn" onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="details-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* 1. हेडर */}
      <h1>{data.name}</h1>
      <p><strong>Category:</strong> {category.toUpperCase()}</p>
      <p>{data.description}</p>

      {/* 2. इकोसिस्टम (Nearby Items) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", margin: "30px 0" }}>
        
        <div className="info-box" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h3>Nearby Hotels</h3>
          {data.hotels.map((h, i) => <p key={i}>• {h.name} - ₹{h.price}</p>)}
        </div>

        <div className="info-box" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h3>Yoga & Wellness</h3>
          {data.yoga.length > 0 ? data.yoga.map((y, i) => <p key={i}>• {y.name}</p>) : <p>No specific centers listed.</p>}
        </div>

        <div className="info-box" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h3>Popular Treks</h3>
          {data.treks.map((t, i) => <p key={i}>• {t.name} ({t.difficulty})</p>)}
        </div>
      </div>

      {/* 3. बुकिंग सेक्शन */}
      <div className="booking-box" style={{ border: "1px solid #006ce4", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
        <h3>Ready to book your {id} experience?</h3>
        <button className="view-btn">Book Now</button>
      </div>
    </div>
  );
}