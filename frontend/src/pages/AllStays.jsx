import hotels from "../Data/hotels";
import { useState } from "react";

export default function AllStays() {
  const [sort, setSort] = useState("high");
  const [maxPrice, setMaxPrice] = useState(20000);

  const filtered = hotels
    .filter(h => h.price <= maxPrice)
    .sort((a, b) =>
      sort === "high" ? b.price - a.price : a.price - b.price
    );

  return (
    <div className="hotels-page">
      {/* LEFT FILTER */}
      <aside className="filters">
        <h3>Sort & Filters</h3>

        <label>Sort by</label>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="high">Price: High → Low</option>
          <option value="low">Price: Low → High</option>
        </select>

        <label>Max Price ₹{maxPrice}</label>
        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
        />
      </aside>

      {/* RIGHT LIST */}
      <section className="hotel-list">
        <h2>Stays in Uttarakhand</h2>

        {filtered.map(hotel => (
          <div key={hotel.id} className="hotel-row">
            <img src={hotel.image} alt={hotel.name} />

            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p>📍 {hotel.location}</p>
              <p>⭐ {hotel.rating}</p>
            </div>

            <div className="hotel-price">
              <div>₹{hotel.price}</div>
              <span>/ night</span>
              <button>View Deal</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
