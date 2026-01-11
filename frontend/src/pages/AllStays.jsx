import hotels from "../data/hotels";

export default function AllStays() {
  return (
    <div className="stays-container">
      <h2>All Stays</h2>

      <div className="stays-grid">
        {hotels.map((hotel) => (
          <div className="stay-card" key={hotel.id}>
            <img src={hotel.image} alt={hotel.name} />

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
