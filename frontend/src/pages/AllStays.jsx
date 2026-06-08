import { Link } from "react-router-dom";
import hotels from "../Data/hotels";

export default function AllStays() {
  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          🏔️ Stays in Uttarakhand
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Discover handpicked Himalayan stays, resorts and homestays.
        </p>

        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                display: "grid",
                gridTemplateColumns: "320px 1fr",
              }}
            >
              <img
                src={
                  hotel.image ||
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                }
                alt={hotel.name}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "28px",
                    }}
                  >
                    {hotel.name}
                  </h2>

                  <p
                    style={{
                      color: "#64748b",
                      marginTop: "10px",
                    }}
                  >
                    📍 {hotel.location}
                  </p>

                  <p
                    style={{
                      marginTop: "10px",
                      fontWeight: "600",
                    }}
                  >
                    ⭐ {hotel.rating}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "30px",
                        fontWeight: "800",
                        color: "#16a34a",
                      }}
                    >
                      ₹{hotel.price}
                    </div>

                    <span
                      style={{
                        color: "#64748b",
                      }}
                    >
                      per night
                    </span>
                  </div>

                  <Link to={`/hotels/${hotel.id}`}>
                    <button
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        padding: "14px 24px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "700",
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
    </div>
  );
}