import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getHotels } from "../api/api";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");
  const [price, setPrice] = useState("all");

  useEffect(() => {
    getHotels().then((res) => {
      let data = res.data;

      if (city) {
        data = data.filter(
          (h) => h.city?.toLowerCase() === city.toLowerCase()
        );
      }

      setHotels(data);
      setFiltered(data);
    });
  }, [city]);

  useEffect(() => {
    if (price === "all") {
      setFiltered(hotels);
    } else if (price === "low") {
      setFiltered(hotels.filter((h) => h.price <= 3000));
    } else if (price === "mid") {
      setFiltered(hotels.filter((h) => h.price > 3000 && h.price <= 6000));
    } else if (price === "high") {
      setFiltered(hotels.filter((h) => h.price > 6000));
    }
  }, [price, hotels]);

  return (
    <div className="hs-dashboard">
      <h2 className="hs-section-title">
        {city ? `Stays in ${city}` : "All Hotels"}
      </h2>

      {/* PRICE FILTER */}
      <div style={{ marginBottom: 24 }}>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #cbd5f5",
          }}
        >
          <option value="all">All Prices</option>
          <option value="low">Up to ₹3,000</option>
          <option value="mid">₹3,000 – ₹6,000</option>
          <option value="high">₹6,000+</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map((hotel) => (
          <Link
            key={hotel._id}
            to={`/hotel/${hotel._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="hs-card">
              <div
                style={{
                  height: 180,
                  borderRadius: 14,
                  marginBottom: 12,
                  background: hotel.image
                    ? `url(${hotel.image}) center/cover`
                    : "linear-gradient(135deg,#2563eb,#22c55e)",
                }}
              />
              <h3>{hotel.name}</h3>
              <p className="hs-muted">{hotel.city}</p>
              <strong>₹{hotel.price} / night</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
