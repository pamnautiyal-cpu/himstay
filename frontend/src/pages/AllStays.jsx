import { useState, useMemo } from "react";
import hotels from "../Data/hotels";

export default function AllStays() {
  const [sort, setSort] = useState("priceLow");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);

  const filteredHotels = useMemo(() => {
    let data = hotels.filter(
      (h) => h.price <= maxPrice && h.rating >= minRating
    );

    if (sort === "priceLow") {
      data.sort((a, b) => a.price - b.price);
    }
    if (sort === "priceHigh") {
      data.sort((a, b) => b.price - a.price);
    }
    if (sort === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [sort, maxPrice, minRating]);

  return (
    <div className="agoda-container">
      <h2>Stays in Uttarakhand</h2>

      {/* FILTER BAR */}
      <div className="filter-bar glass">
        <div>
          <label>Sort by</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div>
          <label>Max Price ₹{maxPrice}</label>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Min Rating</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value="0">All</option>
            <option value="3">3★+</option>
            <option value="4">4★+</option>
            <option value="4.5">4.5★+</option>
          </select>
        </div>
      </div>

      {/* LIST */}
      <div className="agoda-list">
        {filteredHotels.map((hotel) => (
          <div className="agoda-row glass" key={hotel.id}>
            <div className="agoda-icon">🏨</div>

            <div className="agoda-info">
              <h3>{hotel.name}</h3>
              <p className="location">📍 {hotel.location}</p>
              <p className="rating">⭐ {hotel.rating}</p>
            </div>

            <div className="agoda-price">
              <div className="amount">₹{hotel.price}</div>
              <span>/ night</span>
              <button>View Deal</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
