import hotels from "../Data/hotels";

export default function AllStays() {
  return (
    <div className="stays-container">
      <h2>Stays in Uttarakhand</h2>

      <div className="stays-list">
        {hotels.map((hotel) => (
          <div className="stay-row glass" key={hotel.id}>
            <div className="stay-icon">🏨</div>

            <div className="stay-text">
              <h3>{hotel.name}</h3>
              <div className="location">📍 {hotel.location}</div>
              <div className="rating">⭐ {hotel.rating}</div>
            </div>

            <div className="stay-price">
              <div className="amount">₹{hotel.price}</div>
              <span>/ night</span>
              <button className="details-btn">View Deal</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
