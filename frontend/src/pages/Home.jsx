import React from "react";

function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 999,
                background: "#e0e7ff",
                color: "#3730a3",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              Hills • Stays • Memories
            </span>

            <h1
              style={{
                fontSize: 52,
                lineHeight: 1.1,
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: 16,
              }}
            >
              Stay closer to the <br />
              <span style={{ color: "#2563eb" }}>mountains.</span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "#475569",
                maxWidth: 520,
                marginBottom: 30,
              }}
            >
              Handpicked hotels & homestays across Uttarakhand & Himachal — perfect for
              workations, weekends and slow travel.
            </p>

            {/* SEARCH */}
            <div
              style={{
                display: "flex",
                gap: 10,
                background: "#fff",
                padding: 10,
                borderRadius: 999,
                boxShadow:
                  "0 20px 40px rgba(15, 23, 42, 0.12)",
                maxWidth: 420,
              }}
            >
              <input
                placeholder="Search by city (Mussoorie, Shimla, Nainital , Harshil Valley...)"
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: 15,
                  paddingLeft: 12,
                }}
              />
              <button
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: 999,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            style={{
              background: "white",
              borderRadius: 24,
              padding: 16,
              boxShadow:
                "0 30px 60px rgba(15, 23, 42, 0.15)",
            }}
          >
            <div
              style={{
                height: 240,
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, #38bdf8, #22c55e, #facc15)",
                marginBottom: 18,
              }}
            />
            <h3 style={{ marginBottom: 6 }}>
              Weekend in the clouds
            </h3>
            <p style={{ color: "#64748b", fontSize: 14 }}>
              Average stays from ₹1,099 · Verified homestays
              across Uttarakhand & Himachal.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 20px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {[
          {
            title: "Handpicked Stays",
            text: "Only quality-checked mountain homes",
          },
          {
            title: "Best Prices",
            text: "Direct deals with local hosts",
          },
          {
            title: "Easy Booking",
            text: "Fast, secure & hassle-free",
          },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 24,
              boxShadow:
                "0 10px 30px rgba(15, 23, 42, 0.08)",
            }}
          >
            <h4 style={{ marginBottom: 8 }}>{f.title}</h4>
            <p style={{ color: "#64748b", fontSize: 14 }}>
              {f.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
