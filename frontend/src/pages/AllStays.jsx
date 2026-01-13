import { useEffect } from "react";
import hotels from "../Data/hotels";

export default function AllStays() {
  useEffect(() => {
    // 🔥 FORCE REMOVE ANY BIG IMAGE ABOVE HOTELS PAGE
    const imgs = document.querySelectorAll("body > img, img.hero-img, img");
    imgs.forEach((img) => {
      // only remove very tall/fullscreen images
      if (img.naturalHeight > 400) {
        img.remove();
      }
    });
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
