import hotels from "../Data/hotels";

export default function AllStays() {
  return (
    <div className="stays-container">
      <h2>All Stays</h2>

      <div className="stays-list">
        {hotels.map((hotel) => (
          <div className="stay-row" key={hotel.id}>
            
            {/* ✅ SMALL IMAGE */}
            <img
              src={hotel.image}
              alt={hotel.name}
              className="stay-thumb"
            />

            {/* INFO */}
            <div className="stay-text">
              <h3>{hotel.name}</h3>
              <p className="location">📍 {hotel.location}</p>

              <p className="rating">
                ⭐ {hotel.rating} &nbsp; ₹{hotel.price} / night
              </p>

              <button className="details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
