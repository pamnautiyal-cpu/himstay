import { useState } from "react";
import API from "../api/api";

function AdminAddHotel() {
  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    price: "",
    rating: "",
    image: "",
    description: "",
  });

  const addHotel = async (e) => {
    e.preventDefault();
    const res = await API.post("/hotels/add", hotel);
    alert("Hotel Added!");
  };

  return (
    <div className="hs-center-wrapper">
      <div className="hs-form-card" style={{ maxWidth: 500 }}>
        <h2 className="hs-form-title">Add New Hotel</h2>

        <form onSubmit={addHotel}>
          {Object.keys(hotel).map((key) => (
            <div className="hs-form-field" key={key}>
              <label className="hs-label">{key.toUpperCase()}</label>
              <input
                className="hs-input"
                value={hotel[key]}
                onChange={(e) =>
                  setHotel({ ...hotel, [key]: e.target.value })
                }
                required
              />
            </div>
          ))}

          <button className="hs-btn-primary" style={{ width: "100%" }}>
            Add Hotel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddHotel;
