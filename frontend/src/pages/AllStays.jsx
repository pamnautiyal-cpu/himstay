import hotels from "../Data/hotels";
import { useNavigate } from "react-router-dom";

export default function AllStays() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 40 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        
        <h1>🏔️ Stays in Uttarakhand</h1>

        <p style={{ color: "#64748b" }}>
          Discover luxury resorts, cozy homestays and unforgettable Himalayan experiences.
        </p>

        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              background: "#fff",
              borderRadius: 20,
              marginTop: 20,
              display: "flex",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            {/* IMAGE */}
            <div style={{ width: 300 }}>
              <img
                src={hotel.image}
                alt={hotel.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ flex: 1, padding: 20 }}>
              <h2>{hotel.name}</h2>
              <p>📍 {hotel.location}</p>
              <p>⭐ {hotel.rating}</p>

              <h3 style={{ color: "green" }}>₹{hotel.price}</h3>

              <button
                onClick={() => navigate(`/hotels/${hotel.id}`)}
                style={{
                  marginTop: 10,
                  padding: "12px 20px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
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