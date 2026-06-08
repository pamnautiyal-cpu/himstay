import { Link } from "react-router-dom";
import hotels from "../Data/hotels";

export default function AllStays() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          🏔️ Stays in Uttarakhand
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          Discover luxury resorts, cozy homestays and unforgettable Himalayan
          experiences.
        </p>

        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              background: "#fff",
              borderRadius: "24px",
              overflow: "hidden",
              marginBottom: "28px",
              boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
              display: "flex",
              flexWrap: "wrap",
              transition: "0.3s",
            }}
          >
            {/* IMAGE */}
            <div
              style={{
                flex: "0 0 340px",
                minHeight: "260px",
              }}
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* INFO */}
            <div
              style={{
                flex: "1",
                padding: "28px",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#dcfce7",
                    color: "#166534",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  Top Rated Stay
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    color: "#0f172a",
                  }}
                >
                  {hotel.name}
                </h2>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#64748b",
                    fontSize: "16px",
                  }}
                >
                  📍 {hotel.location}
                </p>

                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span>🏔 Mountain View</span>
                  <span>📶 Free WiFi</span>
                  <span>🍳 Breakfast</span>
                  <span>🚗 Parking</span>
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    display: "inline-block",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    fontWeight: "700",
                  }}
                >
                  ⭐ {hotel.rating}
                </div>
              </div>

              {/* PRICE */}
              <div
                style={{
                  minWidth: "220px",
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    color: "#16a34a",
                    fontSize: "36px",
                    fontWeight: "800",
                  }}
                >
                  ₹{hotel.price}
                </div>

                <div
                  style={{
                    color: "#64748b",
                    marginBottom: "18px",
                  }}
                >
                  per night
                </div>

                <Link to={`/hotels/${hotel.id}`}>
                  <button
                    style={{
                      background:
                        "linear-gradient(135deg,#2563eb,#1d4ed8)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      padding: "14px 28px",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow:
                        "0 10px 20px rgba(37,99,235,0.35)",
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}