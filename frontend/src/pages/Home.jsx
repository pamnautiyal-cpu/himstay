import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    navigate(`/hotels?city=${encodeURIComponent(city.trim())}`);
  };

  return (
    <div className="hs-app">
      <div className="hs-container">
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
            gap: 24,
            alignItems: "center",
            marginTop: 26,
          }}
        >
          <div>
            <div className="hs-pill">Hills • Stays • Memories</div>
            <h1 style={{ fontSize: 36, margin: "12px 0 8px" }}>
              Book cozy stays in the{" "}
              <span style={{ color: "#2563eb" }}>Himalayas</span>.
            </h1>
            <p className="hs-subtitle">
              The Himalayans helps you discover hand-picked stays in Manali, Shimla,
Dharamshala and beyond.
            </p>

            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                gap: 10,
                padding: 10,
                borderRadius: 18,
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
                maxWidth: 460,
                marginTop: 18,
              }}
            >
              <input
                className="hs-input"
                placeholder="Search by city (e.g. Manali, Shimla)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit" className="hs-btn-primary">
                Search
              </button>
            </form>
          </div>

          <div className="hs-card">
            <div
              style={{
                borderRadius: 16,
                height: 210,
                background:
                  "linear-gradient(145deg, #1d4ed8, #38bdf8 40%, #facc15 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "18px",
                  borderRadius: 18,
                  border: "1px solid rgba(248,250,252,0.5)",
                  backdropFilter: "blur(4px)",
                }}
              />
            </div>
            <h3 style={{ marginTop: 14 }}>Weekend in the clouds</h3>
            <p className="hs-muted">
              Average nightly rate from ₹1,099 • 120+ verified homestays across
              Uttarakhand.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
