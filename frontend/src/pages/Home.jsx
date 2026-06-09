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
    <div className="home-page">
      <div className="home-header">
        <h1>Find your next Himalayan stay</h1>
        <p>Explore premium hotels, cozy homestays, and unique experiences.</p>
      </div>

      <div className="home-wrap">
        {/* 1. Property Types */}
        <section className="home-section">
          <h2>Browse by property type</h2>
          <div className="home-grid">
            {propertyTypes.map((t) => <div key={t.name} className="home-card" onClick={() => handlePropertyClick(t)}><img src={t.image} alt={t.name} /><div className="card-body"><h3>{t.name}</h3></div></div>)}
          </div>
        </section>

        {/* 2. Uttarakhand Destinations */}
        <section className="home-section">
          <h2>Explore Uttarakhand</h2>
          <div className="home-grid">
            {uttarakhandDestinations.map((d) => <div key={d.name} className="home-card" onClick={() => handleDestinationClick(d)}><img src={d.image} alt={d.name} /><div className="card-body"><h3>{d.name}</h3><p>{d.stays}</p></div></div>)}
          </div>
        </section>

        {/* 3. Trending Experiences */}
        <section className="home-section">
          <h2>Trending Experiences</h2>
          <div className="home-grid">
            {uttarakhandExperiences.map((e) => <div key={e.name} className="home-card" onClick={() => handleExperienceClick(e)}><img src={e.image} alt={e.name} /><div className="card-body"><h3>{e.name}</h3><p>{e.desc}</p></div></div>)}
          </div>
        </section>
      </div>
    </div>
  );
}