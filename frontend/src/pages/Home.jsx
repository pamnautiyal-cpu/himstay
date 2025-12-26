import React from "react";

export default function Home() {
  const sectionStyle = {
    maxWidth: 1200,
    margin: "60px auto",
    padding: "0 20px",
  };

  const isMobile = window.innerWidth < 768;

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 22,
    marginTop: 24,
  };

  const slider = {
    display: "flex",
    gap: 18,
    overflowX: "auto",
    marginTop: 24,
    paddingBottom: 10,
    scrollSnapType: "x mandatory",
  };

  const card = {
    minWidth: 220,
    background: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 14px 35px rgba(15,23,42,0.15)",
    textDecoration: "none",
    color: "#0f172a",
    scrollSnapAlign: "start",
  };

  const imgWrap = { height: 150 };
  const img = { width: "100%", height: "100%", objectFit: "cover" };
  const title = { padding: 14, fontWeight: 700, textAlign: "center" };

  const Card = ({ name, image }) => (
    <a href={image} target="_blank" rel="noreferrer" style={card}>
      <div style={imgWrap}>
        <img src={image} alt={name} style={img} />
      </div>
      <div style={title}>{name}</div>
    </a>
  );

  const layout = isMobile ? slider : grid;

  return (
    <div style={{ background: "#f4f8ff", minHeight: "100vh" }}>

      {/* TOP DESTINATIONS */}
      <section style={sectionStyle}>
        <h2>Top destinations in Uttarakhand</h2>
        <div style={layout}>
          <Card name="Mussoorie" image="https://unsplash.com/photos/a-village-on-a-hill-with-a-mountain-in-the-background-uV7UxLPnruU" />
          <Card name="Nainital" image="https://unsplash.com/photos/a-large-building-with-a-clock-tower-in-the-middle-of-it-hDxBAXQB3Zs?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink" />
          <Card name="Dehradun" image="https://unsplash.com/photos/a-large-building-with-a-clock-tower-in-the-middle-of-it-hDxBAXQB3Zs?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink" />
          <Card name="Haldwani" image="https://unsplash.com/photos/boat-on-sea-near-mountain-under-white-clouds-and-blue-sky-during-daytime-58E1ZA9CXBA?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink" />
        </div>
      </section>

      {/* CHAR DHAM */}
      <section style={sectionStyle}>
        <h2>Char Dham Yatra Destinations</h2>
        <div style={layout}>
          <Card name="Kedarnath" image="https://images.unsplash.com/photo-1610552050890-fe99536c2615" />
          <Card name="Badrinath" image="https://images.unsplash.com/photo-1620044307310-5b6b5e0cbe9a" />
          <Card name="Gangotri" image="https://images.unsplash.com/photo-1618826411640-d6df2cfd2a3b" />
          <Card name="Yamunotri" image="https://images.unsplash.com/photo-1630650053235-7b77c1d45d0a" />
          <Card name="Hemkund Sahib" image="https://images.unsplash.com/photo-1598091383021-15ddea10925d" />
        </div>
      </section>

      {/* TREKKING */}
      <section style={sectionStyle}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={layout}>
          <Card name="Kedarkantha Trek" image="https://images.unsplash.com/photo-1605540436563-5bca919ae766" />
          <Card name="Har Ki Dun Trek" image="https://images.unsplash.com/photo-1626621341517-bbf3d9990f8c" />
          <Card name="Nag Tibba Trek" image="https://images.unsplash.com/photo-1622030411594-cd1b7c50fd14" />
          <Card name="Valley of Flowers" image="https://images.unsplash.com/photo-1590130904419-2f9c77b0b1ef" />
          <Card name="Roopkund Trek" image="https://images.unsplash.com/photo-1597501412226-8e5f56d6b3f1" />
        </div>
      </section>

      {/* 🧘 YOGA & NATURAL THERAPY (FIXED & BACK) */}
      <section style={sectionStyle}>
        <h2>Yoga & Natural Therapy Retreats</h2>
        <div style={layout}>
          <Card name="Himalayan Yoga Retreat" image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" />
          <Card name="Naturopathy Healing" image="https://images.unsplash.com/photo-1556228724-4a1f9b3b2b1c" />
          <Card name="Meditation & Pranayama" image="https://images.unsplash.com/photo-1506126613408-eca07ce68773" />
          <Card name="Ayurvedic Therapy" image="https://images.unsplash.com/photo-1600334129128-685c5582fd35" />
          <Card name="Panchakarma Detox" image="https://images.unsplash.com/photo-1625631980641-9a35a6adf46a" />
        </div>
      </section>

    </div>
  );
}
