import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const uttarakhandDestinations = [
    { name: "Char Dham", stays: "350 properties", isLive: true, targetCity: "Uttarkashi", image: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=500&q=80" },
    { name: "Haridwar", stays: "1,041 properties", isLive: false, image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=500&q=80" },
    { name: "Dehradun", stays: "960 properties", isLive: false, image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&q=80" },
    { name: "Mussoorie", stays: "1,240 properties", isLive: false, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80" },
    { name: "Nainital", stays: "967 properties", isLive: false, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80" },
    { name: "Rishikesh", stays: "2,150 properties", isLive: false, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&q=80" }
  ];

  const propertyTypes = [
    { name: "Hotels", isLive: true, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Apartments", isLive: false, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
    { name: "Resorts", isLive: false, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400" },
    { name: "Villas", isLive: false, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/hotels?city=${encodeURIComponent(search.trim())}` : "/hotels");
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Find your next Himalayan stay</h1>
        <form onSubmit={handleSearch} style={{ marginTop: "20px" }}>
          <input type="text" placeholder="Where are you going?" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="home-wrap">
        <section className="home-section">
          <h2>Browse by property type</h2>
          <div className="home-grid">
            {propertyTypes.map((t) => (
              <div key={t.name} className="home-card">
                <img src={t.image} alt={t.name} />
                <div className="card-body"><h3>{t.name}</h3></div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2>Explore Uttarakhand</h2>
          <div className="home-grid">
            {uttarakhandDestinations.map((d) => (
              <div key={d.name} className="home-card">
                <img src={d.image} alt={d.name} />
                <div className="card-body"><h3>{d.name}</h3><p>{d.stays}</p></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}