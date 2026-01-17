import { useEffect } from "react";
import hotels from "../Data/hotels";

export default function AllStays() {
  useEffect(() => {
    // HARD RESET BODY BACKGROUND
    document.body.classList.add("no-hero");
    document.body.style.backgroundImage = "none";
    document.body.style.background = "#ffffff";

    return () => {
      document.body.classList.remove("no-hero");
      document.body.style.backgroundImage = "";
      document.body.style.background = "";
    };
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
