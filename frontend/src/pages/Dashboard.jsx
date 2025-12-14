// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getUserBookings } from "../api/api"; // <- yahi wali api.js se aa rahi hai

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // future me real data aayega, abhi ke liye try–catch
    const fetchData = async () => {
      try {
        const res = await getUserBookings();
        setBookings(res.data || []);
      } catch (err) {
        console.log("Booking load error:", err);
        // demo ke liye kuch fake data
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
      {/* Top section: greeting + stats */}
      <div className="hs-dashboard-header">
        <div>
          <p className="hs-dashboard-subtitle">Welcome back to HimStay</p>
          <h1 className="hs-dashboard-title">Your Himalayan getaways</h1>
          <p className="hs-dashboard-text">
            Track all your cozy stays in the mountains – Manali, Shimla,
            Dharamshala, and beyond. Time to plan your next chai-with-a-view
            trip. ☕🏔️
          </p>
        </div>

        {/* Illustration card */}
        <div className="hs-hero-card">
          <div className="hs-hero-mountains">
            <div className="peak peak-left" />
            <div className="peak peak-center" />
            <div className="peak peak-right" />
            <div className="sun" />
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="people">
              <span role="img" aria-label="person">
                🧍‍♂️
              </span>
              <span role="img" aria-label="person">
                🧍‍♀️
              </span>
              <span role="img" aria-label="camp">
                🏕️
              </span>
            </div>
          </div>
          <div className="hs-hero-content">
            <p className="hs-hero-title">Weekend in the clouds</p>
            <p className="hs-hero-text">
              Average night from ₹1,299 • 120+ verified homestays across
              Himachal. Perfect for workations & slow travel.
            </p>
          </div>
        </div>
      </div>

      {/* Bookings + suggestions */}
      <div className="hs-dashboard-grid">
        {/* My Trips / bookings list */}
        <section className="hs-card">
          <div className="hs-card-header">
            <h2>My trips</h2>
            <span className="hs-pill">
              {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
            </span>
          </div>

          {loading ? (
            <p className="hs-muted">Loading your trips…</p>
          ) : bookings.length === 0 ? (
            <div className="hs-empty">
              <p className="hs-empty-title">No trips yet</p>
              <p className="hs-empty-text">
                Start your first Himalayan getaway – search stays on the home
                page and book a cozy homestay.
              </p>
              <a className="hs-btn-outline" href="/">
                Browse stays
              </a>
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

        {/* Right side: quick suggestions */}
        <section className="hs-card hs-suggestions">
          <h2>Popular hill escapes</h2>
          <div className="hs-tag-row">
            <span className="hs-tag">Manali • Workation</span>
            <span className="hs-tag">Shimla • Family</span>
            <span className="hs-tag">Bir • Paragliding</span>
            <span className="hs-tag">Dharamshala • Chill</span>
          </div>

          <p className="hs-muted" style={{ marginTop: 12 }}>
            Pro tip: Weekdays are cheaper and quieter. Perfect for working from
            mountains with a hot cup of chai.
          </p>

          <div className="hs-checklist">
            <p>✅ High-speed Wi-Fi</p>
            <p>✅ Mountain views</p>
            <p>✅ Local homestays</p>
            <p>✅ Verified hosts</p>
          </div>

          <a className="hs-btn-primary" href="/hotels">
            Find stays in the Himalayas-Uttarakhand
          </a>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
