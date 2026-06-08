import React from "react";

function Home() {
  const destinations = [
    {
      name: "Mussoorie",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      name: "Nainital",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      name: "Auli",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
    {
      name: "Rishikesh",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
  ];

  const hotels = [
    {
      name: "Mountain View Resort",
      location: "Mussoorie",
      price: "₹2,499",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      name: "Himalayan Retreat",
      location: "Auli",
      price: "₹3,999",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
    {
      name: "River Side Stay",
      location: "Rishikesh",
      price: "₹1,999",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section
        style={{
          height: "75vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />

        <div
          style={{
            position: "relative",
            textAlign: "center",
            color: "white",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              marginBottom: "20px",
            }}
          >
            Discover the Himalayas
          </h1>

          <p
            style={{
              fontSize: "20px",
              marginBottom: "30px",
            }}
          >
            Hotels, Homestays & Mountain Experiences
          </p>

          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              placeholder="Where are you going?"
              style={{
                padding: "14px",
                width: "250px",
                borderRadius: "10px",
              }}
            />

            <input
              type="date"
              style={{
                padding: "14px",
                borderRadius: "10px",
              }}
            />

            <input
              type="date"
              style={{
                padding: "14px",
                borderRadius: "10px",
              }}
            />

            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "60px auto",
          padding: "0 20px",
        }}
      >
        <h2 style={{ fontSize: "34px", marginBottom: "30px" }}>
          Popular Destinations
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {destinations.map((item, index) => (
            <div
              key={index}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOTELS */}
      <section
        style={{
          background: "#f8fafc",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h2 style={{ fontSize: "34px", marginBottom: "30px" }}>
            Featured Hotels
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "25px",
            }}
          >
            {hotels.map((hotel, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "20px" }}>
                  <h3>{hotel.name}</h3>
                  <p>{hotel.location}</p>
                  <h4>{hotel.price}/night</h4>

                  <button
                    style={{
                      marginTop: "10px",
                      background: "#22c55e",
                      color: "white",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0f172a",
          color: "white",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <h3>🏔 The Himalayans</h3>
        <p>Find your perfect mountain stay.</p>
      </footer>
    </div>
  );
}

export default Home;