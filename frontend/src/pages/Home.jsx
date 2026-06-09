import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalFeature, setModalFeature] = useState("");

  const uttarakhandDestinations = [
    { name: "Char Dham", stays: "350 properties", isLive: true, targetCity: "Uttarkashi", image: "https://images.unsplash.com/photo-1626621422537-37b2319addef?w=500&q=80" },
    { name: "Haridwar", stays: "1,041 properties", isLive: false, image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=500&q=80" },
    { name: "Dehradun", stays: "960 properties", isLive: false, image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&q=80" },
    { name: "Mussoorie", stays: "1,240 properties", isLive: false, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80" },
    { name: "Nainital", stays: "967 properties", isLive: false, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80" },
    { name: "Rishikesh", stays: "2,150 properties", isLive: false, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&q=80" }
  ];

  const uttarakhandExperiences = [
    { name: "Trekking", desc: "Explore alpine trails", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80" },
    { name: "Yoga & Meditation", desc: "Spiritual healing centers", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80" },
    { name: "Hillstations", desc: "Escape to cold peaks", image: "https://images.unsplash.com/photo-1486873249359-2731bd6da553?w=500&q=80" },
    { name: "Spa & Wellness", desc: "Luxury mountain rejuvenation", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80" },
    { name: "River Rafting", desc: "Conquer white water rapids", image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=500&q=80" },
    { name: "Climbing Adventure", desc: "Rock scaling & mountaineering", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&q=80" }
  ];

  const propertyTypes = [
    { name: "Hotels", isLive: true, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { name: "Apartments", isLive: false, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
    { name: "Resorts", isLive: false, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400" },
    { name: "Villas", isLive: false, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" }
  ];

  const handleSearch = (e) => { e.preventDefault(); navigate(search.trim() ? `/hotels?city=${encodeURIComponent(search.trim())}` : "/hotels"); };
  
  const handleDestinationClick = (dest) => {
    if (dest.isLive) {
      navigate(`/hotels?city=${encodeURIComponent(dest.targetCity)}`);
    } else {
      setModalFeature(dest.name);
      setShowModal(true);
    }
  };

  const handleExperienceClick = (exp) => { setModalFeature(exp.name); setShowModal(true); };
  
  const handlePropertyClick = (type) => {
    if (type.isLive) {
      navigate("/hotels");
    } else {
      setModalFeature(type.name);
      setShowModal(true);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Search Section */}
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1>Find your next Himalayan stay</h1>
        <form onSubmit={handleSearch} style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <input type="text" placeholder="Where are you going?" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "10px", width: "300px" }} />
          <button type="submit" style={{ padding: "10px 20px" }}>Search</button>
        </form>
      </div>

      <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
        {/* Property Types */}
        <h3>Browse by property type</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {propertyTypes.map((t) => <div key={t.name} onClick={() => handlePropertyClick(t)} style={{ cursor: "pointer" }}><img src={t.image} style={{ width: "100%", height: "100px" }} /><h4>{t.name}</h4></div>)}
        </div>

        {/* Explore Uttarakhand */}
        <h3>Explore Uttarakhand</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {uttarakhandDestinations.map((d) => (
            <div key={d.name} onClick={() => handleDestinationClick(d)} style={{ cursor: "pointer", height: "150px", background: `url(${d.image}) center/cover`, borderRadius: "8px", display: "flex", alignItems: "flex-end", padding: "10px", color: "#fff" }}>
              <h4>{d.name}</h4>
            </div>
          ))}
        </div>

        {/* Experiences */}
        <h3>Trending Experiences</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {uttarakhandExperiences.map((e) => <div key={e.name} onClick={() => handleExperienceClick(e)} style={{ cursor: "pointer" }}><img src={e.image} style={{ width: "100%", height: "150px" }} /><h4>{e.name}</h4></div>)}
        </div>
      </div>
    </div>
  );
}