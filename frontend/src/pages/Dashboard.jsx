// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserBookings } from "../api/api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserBookings();
        setBookings(res.data || []);
      } catch (err) {
        console.log("Booking load error:", err);
        // fallback demo data
        setBookings([
          {
            _id: "1",
            city: "Manali",
            title: "Cozy Riverside Homestay",
            dates: "12–15 Jan, 2026",
            people: 2,
          },
          {
            _id: "2",
            city: "Shimla",
            title: "Pine View Workation Studio",
            dates: "22–27 Feb, 2026",
            people: 1,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hs-dashboard">
      {/* ===== HEADER ===== */}
      <div className="hs-dashboard-header">
        <div>
          <p className="hs-dashboard-subtitle">Welcome back to HimStay</p>
          <h1 className="hs-dashboard-title">Your Himalayan getaways</h1>
          <p className="hs-dashboard-text">
            Track all your cozy stays in the mountains – Manali, Shimla,
            Dharamshala, and beyond.
          </p>
        </div>

        {/* ===== HERO CARD ===== */}
        <div className="hs-hero-card">
          <div className="hs-hero-mountains">
            <div className="peak peak-left" />
            <div className="peak peak-center" />
            <div className="peak peak-right" />
            <div className="sun" />
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="people">🧍‍♂️ 🧍‍♀️ 🏕️</div>
          </div>

          <div className="hs-hero-content">
            <p className="hs-hero-title">Weekend in the clouds</p>
            <p className="hs-hero-text">
              From ₹1,299/night • 120+ verified homestays across Uttarakhand.
            </p>
          </div>
        </div>
      </div>

      {/* ===== GRID ===== */}
      <div className="hs-dashboard-grid">
        {/* ===== MY TRIPS ===== */}
        <section className="hs-card">
          <div className="hs-card-header">
            <h2>My trips</h2>
            <span className="hs-pill">
              {bookings.length}{" "}
              {bookings.length === 1 ? "booking" : "bookings"}
            </span>
          </div>

          {loading ? (
            <p className="hs-muted">Loading your trips…</p>
          ) : bookings.length === 0 ? (
            <div className="hs-empty">
              <p className="hs-empty-title">No trips yet</p>
              <p className="hs-empty-text">
                Start your first Himalayan getaway.
              </p>

              {/* 🔴 FIXED: a → Link */}
              <Link to="/" className="hs-btn-outline">
                Browse stays
              </Link>
            </div>
          ) : (
            <ul className="hs-trip-list">
              {bookings.map((b) => (
                <li key={b._id} className="hs-trip-item">
                  <div>
                    <p className="hs-trip-title">{b.title}</p>
                    <p className="hs-trip-meta">
                      {b.city} • {b.dates}
                    </p>
                  </div>
                  <div className="hs-trip-right">
                    <span className="hs-trip-people">
                      👥 {b.people || 2} guests
                    </span>
                    <button className="hs-trip-btn">View details</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ===== SUGGESTIONS ===== */}
        <section className="hs-card hs-suggestions">
          <h2>Popular hill escapes</h2>

          <div className="hs-tag-row">
            <span className="hs-tag">Manali • Workation</span>
            <span className="hs-tag">Shimla • Family</span>
            <span className="hs-tag">Bir • Paragliding</span>
            <span className="hs-tag">Dharamshala • Chill</span>
          </div>

          <p className="hs-muted" style={{ marginTop: 12 }}>
            Weekdays are cheaper & quieter — perfect for workations.
          </p>

          <div className="hs-checklist">
            <p>✅ High-speed Wi-Fi</p>
            <p>✅ Mountain views</p>
            <p>✅ Local homestays</p>
            <p>✅ Verified hosts</p>
          </div>

          {/* 🔴 FIXED: a → Link */}
          <Link to="/hotels" className="hs-btn-primary">
            Find stays in Uttarakhand
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
