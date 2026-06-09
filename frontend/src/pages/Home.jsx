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
  const handleDestinationClick = (dest) => { if(dest.isLive) navigate(`/hotels?city=${encodeURIComponent(dest.targetCity)}`); else { setModalFeature(dest.name); setShowModal(true); } };
  const handleExperienceClick = (exp) => { setModalFeature(exp.name); setShowModal(true); };
  const handlePropertyClick = (type) => { if(type.isLive) navigate("/hotels"); else { setModalFeature(type.name); setShowModal(true); } };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#fff", minHeight: "100vh" }}>
      {/* 🌌 HERO SECTION */}
      <div style={{ background: "linear-gradient(180deg, #1c2541 0%, #0b132b 100%)", padding: "80px 20px 100px", color: "#fff", textAlign: "center" }}>
        <h1 style={{ fontSize: "3.2rem", fontWeight: "800", margin: "0 0 16px 0" }}>Find your next Himalayan stay</h1>
        <p style={{ fontSize: "1.3rem", color: "#94a3b8" }}>Explore premium hotels, cozy homestays, and unique experiences.</p>
      </div>

      {/* 🟨 SEARCH BAR */}
      <div style={{ maxWidth: "1100px", margin: "-40px auto 0", padding: "0 20px", position: "relative", zIndex: "10" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", background: "#1e293b", padding: "6px", borderRadius: "12px", gap: "6px" }}>
          <input type="text" placeholder="Where are you going?" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, padding: "16px", borderRadius: "8px", border: "none" }} />
          <button type="submit" style={{ padding: "0 36px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Search</button>
        </form>
      </div>

      {/* 📄 CONTENT */}
      <div style={{ maxWidth: "1100px", margin: "50px auto", padding: "0 20px" }}>
        {/* Property Types */}
        <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>Browse by property type</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "50px" }}>
          {propertyTypes.map((t) => <div key={t.name} onClick={() => handlePropertyClick(t)} style={{ cursor: "pointer" }}><img src={t.image} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }} /><h4>{t.name}</h4></div>)}
        </div>

        {/* Destinations */}
        <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>Explore Uttarakhand</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "50px" }}>
          {uttarakhandDestinations.map((d) => <div key={d.name} onClick={() => handleDestinationClick(d)} style={{ cursor: "pointer", height: "160px", background: `url(${d.image}) center/cover`, borderRadius: "12px", display: "flex", alignItems: "flex-end", padding: "15px", color: "#fff", fontWeight: "bold" }}>{d.name}</div>)}
        </div>

        {/* Experiences */}
        <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>Trending Experiences</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {uttarakhandExperiences.map((e) => <div key={e.name} onClick={() => handleExperienceClick(e)} style={{ cursor: "pointer", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}><img src={e.image} style={{ width: "100%", height: "160px", objectFit: "cover" }} /><div style={{ padding: "10px" }}><h4>{e.name}</h4></div></div>)}
        </div>
      </div>
    </div>
  );
}