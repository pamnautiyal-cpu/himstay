import React from "react";

export default function Home() {
  const sectionStyle = {
    maxWidth: 1200,
    margin: "60px auto",
    padding: "0 20px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 22,
    marginTop: 26,
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: 700,
  };

  const imgStyle = {
    width: "100%",
    height: 160,
    objectFit: "cover",
  };

  const titleStyle = {
    padding: 14,
    textAlign: "center",
    fontSize: 16,
  };

  const Card = ({ title, query }) => (
    <a
      href={`https://source.unsplash.com/800x600/?${query}`}
      target="_blank"
      rel="noreferrer"
      style={cardStyle}
    >
      <img
        src={`https://source.unsplash.com/800x600/?${query}`}
        alt={title}
        style={imgStyle}
      />
      <div style={titleStyle}>{title}</div>
    </a>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#eaf2ff 0%,#f4f8ff 45%,#ffffff 100%)",
      }}
    >
      {/* HERO */}
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: "52px 40px",
          borderRadius: 32,
          background: "linear-gradient(135deg,#ffffff,#eef2ff)",
          boxShadow: "0 30px 70px rgba(15,23,42,0.15)",
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: 800 }}>
          Find your next stay
        </h1>
        <p style={{ color: "#475569" }}>
          Hotels, treks & wellness across Uttarakhand
        </p>
      </div>

      {/* TOP DESTINATIONS */}
      <section style={sectionStyle}>
        <h2>Top destinations in Uttarakhand</h2>
        <div style={gridStyle}>
          <Card title="Mussoorie" query="Mussoorie Uttarakhand hills" />
          <Card title="Nainital" query="Nainital lake Uttarakhand" />
          <Card title="Dehradun" query="Dehradun Uttarakhand city" />
          <Card title="Haldwani" query="Haldwani Uttarakhand" />
        </div>
      </section>

      {/* CHAR DHAM */}
      <section style={sectionStyle}>
        <h2>Char Dham Yatra Destinations</h2>
        <div style={gridStyle}>
          <Card title="Kedarnath" query="Kedarnath temple Himalayas" />
          <Card title="Badrinath" query="Badrinath temple Uttarakhand" />
          <Card title="Gangotri" query="Gangotri temple glacier" />
          <Card title="Yamunotri" query="Yamunotri temple Uttarakhand" />
          <Card title="Hemkund Sahib" query="Hemkund Sahib gurudwara" />
        </div>
      </section>

      {/* TREKKING */}
      <section style={sectionStyle}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={gridStyle}>
          <Card title="Kedarkantha Trek" query="Kedarkantha trek snow" />
          <Card title="Har Ki Dun Trek" query="Har Ki Dun valley trek" />
          <Card title="Nag Tibba Trek" query="Nag Tibba trek" />
          <Card title="Valley of Flowers" query="Valley of Flowers Uttarakhand" />
          <Card title="Roopkund Trek" query="Roopkund trek lake" />
        </div>
      </section>

      {/* YOGA & NATURAL THERAPY */}
      <section style={sectionStyle}>
        <h2>Yoga & Natural Therapy Retreats</h2>
        <div style={gridStyle}>
          <Card
            title="Himalayan Yoga Retreat"
            query="Himalayan yoga retreat meditation"
          />
          <Card
            title="Naturopathy Healing"
            query="naturopathy healing nature"
          />
          <Card
            title="Meditation & Pranayama"
            query="meditation pranayama mountains"
          />
          <Card
            title="Ayurvedic Therapy"
            query="ayurvedic therapy spa"
          />
          <Card
            title="Panchakarma Detox"
            query="panchakarma ayurveda detox"
          />
        </div>
      </section>
    </div>
  );
}
