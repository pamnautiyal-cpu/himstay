{/* DESTINATIONS */}
<section
  style={{
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 20px 80px",
  }}
>
  <div style={{ marginBottom: 24 }}>
    <h2
      style={{
        fontSize: 28,
        fontWeight: 800,
        color: "#0f172a",
        marginBottom: 6,
      }}
    >
      Popular Hill Stations
    </h2>
    <p style={{ color: "#64748b" }}>
      Explore handpicked stays across India’s most loved mountains
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 20,
    }}
  >
    {[
      { name: "Mussoorie", price: "from ₹1,199" },
      { name: "Shimla", price: "from ₹1,099" },
      { name: "Dehradun", price: "from ₹999" },
      { name: "Uttarkashi", price: "from ₹899" },
      { name: "Nainital", price: "from ₹1,299" },
    ].map((city, i) => (
      <div
        key={i}
        style={{
          position: "relative",
          height: 260,
          borderRadius: 20,
          overflow: "hidden",
          cursor: "pointer",
          boxShadow:
            "0 20px 40px rgba(15, 23, 42, 0.15)",
          transition: "transform .25s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.03)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        {/* IMAGE PLACEHOLDER */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #38bdf8, #22c55e, #16a34a)",
          }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55))",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            color: "#fff",
