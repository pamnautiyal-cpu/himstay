import { useEffect, useState } from "react";
import hotels from "../Data/hotels";

export default function AllStays() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="stays-container">
      <h2>All Stays</h2>

      <div className="stays-list">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div className="stay-row skeleton" key={i}>
                <div className="skeleton-thumb" />
                <div className="skeleton-text">
                  <div className="line short" />
                  <div className="line" />
                  <div className="line small" />
                </div>
              </div>
            ))
          : hotels.map((hotel) => (
              <div className="stay-row glass" key={hotel.id}>
                <div className="stay-icon">🏔️</div>

                <div className="stay-text">
                  <h3>{hotel.name}</h3>
                  <p className="location">📍 {hotel.location}</p>
                  <p className="rating">
                    ⭐ {hotel.rating} &nbsp; | &nbsp;
                    <span className="price">₹{hotel.price} / night</span>
                  </p>
                </div>

                <button className="details-btn">View</button>
              </div>
            ))}
      </div>
    </div>
  );
}
