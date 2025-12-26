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
    marginTop: 24,
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    textDecoration: "none",
    color: "#0f172a",
    boxShadow: "0 14px 35px rgba(15,23,42,0.15)",
    transition: "all .35s ease",
  };

  const imgWrap = {
    overflow: "hidden",
    height: 150,
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform .5s ease",
  };

  const titleStyle = {
    padding: "14px 12px",
    fontWeight: 700,
    textAlign: "center",
    background: "#fff",
  };

  const data = {
    destinations: [
      ["Mussoorie","https://images.unsplash.com/photo-1593693397690-362cb9666fc2"],
      ["Nainital","https://images.unsplash.com/photo-1588416936097-41850ab3d86d"],
      ["Dehradun","https://images.unsplash.com/photo-1605100804763-247f67b3557e"],
      ["Haldwani","https://images.unsplash.com/photo-1623064171611-bc8a5b1b8c7c"],
    ],
    dham: [
      ["Kedarnath","https://images.unsplash.com/photo-1610552050890-fe99536c2615"],
      ["Badrinath","https://images.unsplash.com/photo-1620044307310-5b6b5e0cbe9a"],
      ["Gangotri","https://images.unsplash.com/photo-1618826411640-d6df2cfd2a3b"],
      ["Yamunotri","https://images.unsplash.com/photo-1630650053235-7b77c1d45d0a"],
      ["Hemkund Sahib","https://images.unsplash.com/photo-1598091383021-15ddea10925d"],
    ],
    treks: [
      ["Kedarkantha Trek","https://images.unsplash.com/photo-1605540436563-5bca919ae766"],
      ["Har Ki Dun Trek","https://images.unsplash.com/photo-1626621341517-bbf3d9990f8c"],
      ["Nag Tibba Trek","https://images.unsplash.com/photo-1622030411594-cd1b7c50fd14"],
      ["Valley of Flowers","https://images.unsplash.com/photo-1590130904419-2f9c77b0b1ef"],
      ["Roopkund Trek","https://images.unsplash.com/photo-1597501412226-8e5f56d6b3f1"],
    ],
  };

  const Card = ({ name, img }) => (
    <a
      href={img}
      target="_blank"
      rel="noreferrer"
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.querySelector("img").style.transform = "scale(1.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.querySelector("img").style.transform = "scale(1)";
      }}
    >
      <div style={imgWrap}>
        <img src={img} alt={name} style={imgStyle} />
      </div>
      <div style={titleStyle}>{name}</div>
    </a>
  );

  return (
    <div style={{ background: "#f4f8ff", minHeight: "100vh" }}>

      <section style={sectionStyle}>
        <h2>Top destinations in Uttarakhand</h2>
        <div style={gridStyle}>
          {data.destinations.map(([n,i]) => <Card key={n} name={n} img={i} />)}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>Char Dham Yatra Destinations</h2>
        <div style={gridStyle}>
          {data.dham.map(([n,i]) => <Card key={n} name={n} img={i} />)}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>Trekking & Adventure in Uttarakhand</h2>
        <div style={gridStyle}>
          {data.treks.map(([n,i]) => <Card key={n} name={n} img={i} />)}
        </div>
      </section>

    </div>
  );
}
