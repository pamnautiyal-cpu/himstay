import { useEffect, useState } from "react";
import API, { getHotels } from "../api/api";
import { Link } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  const loadHotels = async () => {
    const res = await API.get("/hotels/filter", { params: filters });
    setHotels(res.data);
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const applyFilters = () => loadHotels();

  return (
    <div className="hs-container">
      <h2 className="hs-page-title">Search Hotels</h2>

      {/* Filters */}
      <div
        className="hs-card"
        style={{ padding: 20, marginBottom: 20, display: "grid", gap: 10 }}
      >
        <input
          className="hs-input"
          placeholder="City"
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value })
          }
        />

        <div style={{ display: "flex", gap: 10 }}>
          <input
            className="hs-input"
            placeholder="Min Price"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            className="hs-input"
            placeholder="Max Price"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>

        <select
          className="hs-input"
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        >
          <option value="">Rating</option>
          <option value="3">3★+</option>
          <option value="4">4★+</option>
          <option value="4.5">4.5★+</option>
        </select>

        <button className="hs-btn-primary" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      {/* Hotels List */}
      <div className="hs-grid">
        {hotels.map((h) => (
          <Link key={h._id} to={`/hotel/${h._id}`} className="hs-card">
            <div
              style={{
                height: 170,
                borderRadius: 12,
                background: h.image
                  ? `url(${h.image}) center/cover`
                  : "gray",
                marginBottom: 10,
              }}
            ></div>
            <h3>{h.name}</h3>
            <p className="hs-muted">
              {h.city} • ⭐ {h.rating}
            </p>
            <p className="hs-price">₹{h.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
