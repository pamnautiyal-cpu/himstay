export default function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} />
      
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p>📍 {hotel.location}</p>
        <p>👥 {hotel.guests} Guests</p>
        <div className="price">₹{hotel.price} <span style={{fontSize: '12px', color: '#666'}}>/night</span></div>
      </div>

      <button className="view-btn">View</button>
    </div>
  );
}