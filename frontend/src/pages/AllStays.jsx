import { useEffect } from "react";
import hotels from "../Data/hotels";

export default function AllStays() {
  useEffect(() => {
    // 🔥 HARD NUKE: remove any full-width image inside root
    const root = document.getElementById("root");

    if (root) {
      const killers = root.querySelectorAll("img, picture, video, section, div");

      killers.forEach((el) => {
        const h = el.offsetHeight;
        const w = el.offsetWidth;

        // kill only BIG elements (hero-like)
        if (h > 300 && w > 600 && !el.closest(".stays-container")) {
          el.remove();
        }
      });
    }

    // extra safety
    document.body.style.backgroundImage = "none";
    document.body.style.background = "#fff";
  }, []);

  return (
    <div className="stays-container">
      <h2>All Stays</h2>

      <div className="stays-grid">
        {hotels.map((hotel) => (
          <div className="stay-card" key={hotel.id}>
            <div className="stay-image">
              <img src={hotel.image} alt={hotel.name} />
            </div>

            <div className="stay-info">
              <h3>{hotel.name}</h3>
              <p className="location">📍 {hotel.location}</p>

              <div className="rating-price">
                <span>⭐ {hotel.rating}</span>
                <span className="price">₹{hotel.price} / night</span>
              </div>

              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
