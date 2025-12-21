import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://himstay.onrender.com";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/hotels`)
      .then((res) => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hotel fetch error", err);
        setLoading(false);
      });
  }, []);

  const filteredHotels = cityFilter
    ? hotels.filter(
        (h) =>
          h.city &&
          h.city.toLowerCase() === cityFilter.toLowerCase()
      )
    : hotels;

  if (loading) {
    return <div style={{ padding: 40 }}>Loading hotels…</div>;
  }

  return (
    <div style={{ padding: "40px 6vw" }}>
      <h1 style={{ marginBottom: 6 }}>
        {cityFilter ? `Stays in ${cityFilter}` : "All Stays"}
      </h1>

      {cityFilter && (
        <div style={{ marginBottom: 20 }}>
          <Link
            to="/hotels"
            style={{
              fontSize: 13,
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            ← View all destinations
          </Link>
        </div>
      )}

      {filteredHotels.length === 0 ? (
        <p>No hotels found for this destination.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow:
                  "0 20px 40px rgba(15,23,42,0.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 180,
                  background: hotel.image
                    ? `url(${hotel.image}) center/cover`
                    : "linear-gradient(135deg,#2563eb,#22c55e)",
                }}
              />

              <div style={{ padding: 16 }}>
                <h3 style={{ marginBottom: 4 }}>
                  {hotel.name}
                </h3>

                <div
                  style={{
                    fontSize: 13,
                    color: "#64748b",
                    marginBottom: 10,
                  }}
                >
                  {hotel.city} • ⭐ {hotel.rating || 4.5}
                </div>

                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  ₹{hotel.price} / night
                </div>

                <Link to={`/hotel/${hotel._id}`}>
                  <button
                    className="hs-btn-primary"
                    style={{ width: "100%" }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotels;
