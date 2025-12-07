import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHotel } from "../api/api";

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    getHotel(id).then((res) => setHotel(res.data));
  }, [id]);

  if (!hotel) return <div className="hs-container">Loading…</div>;

  return (
    <div className="hs-app">
      <div className="hs-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                borderRadius: 18,
                height: 260,
                marginBottom: 14,
                background: hotel.image
                  ? `url(${hotel.image}) center/cover`
                  : "linear-gradient(135deg,#1d4ed8,#22c55e)",
              }}
            />
            <h1 style={{ marginBottom: 4 }}>{hotel.name}</h1>
            <div className="hs-muted" style={{ marginBottom: 12 }}>
              {hotel.city} • ⭐ {hotel.rating || 4.4}
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.55 }}>
              {hotel.description ||
                "A cozy hillside property with warm hosts, fast Wi-Fi and great views — perfect for remote work and slow travel."}
            </p>
          </div>

          <aside className="hs-card">
            <div className="hs-muted" style={{ marginBottom: 4 }}>
              From
            </div>
            <div className="hs-price">₹{hotel.price}</div>
            <div className="hs-muted">per night, taxes extra</div>

            <div style={{ marginTop: 18, fontSize: 13.5 }}>
              <div>• Free cancellation on most stays</div>
              <div>• Instant booking confirmation</div>
              <div>• Verified HimStay partner</div>
            </div>

            <Link to={`/booking/${hotel._id}`} style={{ marginTop: 18, display: "block" }}>
              <button className="hs-btn-primary" style={{ width: "100%" }}>
                Book this stay
              </button>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
