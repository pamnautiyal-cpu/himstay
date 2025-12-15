import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const destinations = [
    {
      name: "Mussoorie",
      img: "https://images.unsplash.com/photo-1589193439130-8cfb1e0f64b1",
    },
    {
      name: "Shimla",
      img: "https://images.unsplash.com/photo-1610557892470-55d0c6a3c5f3",
    },
    {
      name: "Nainital",
      img: "https://images.unsplash.com/photo-1604079628041-943c1d3e42b6",
    },
    {
      name: "Uttarkashi",
      img: "https://images.unsplash.com/photo-1622398925373-3f91b1c5f5d3",
    },
    {
      name: "Dehradun",
      img: "https://images.unsplash.com/photo-1621609777830-1f5c1e5e5f2c",
    },
    {
      name: "Rishikesh",
      img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
    },
  ];

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      if (!slider) return;
      scrollAmount += 0.5;
      slider.scrollLeft += 0.5;

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth
      ) {
        slider.scrollLeft = 0;
        scrollAmount = 0;
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "120px 0 80px",
        background:
          "radial-gradient(circle at top, #e0f2fe, #ecfeff, #f0fdf4, #fff7ed)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 30,
          color: "#0f172a",
        }}
      >
        Top Hill Destinations
      </h2>

      {/* ===== AUTO SCROLL STRIP ===== */}
      <div
        ref={sliderRef}
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          padding: "20px 30px",
          scrollBehavior: "smooth",
        }}
      >
        {destinations.concat(destinations).map((d, i) => (
          <div
            key={i}
            onClick={() => navigate(`/hotels?city=${d.name}`)}
            style={{
              minWidth: 260,
              height: 340,
              borderRadius: 26,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
              transform: "translateZ(0)",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "translateY(-12px) scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                "translateY(0) scale(1)")
            }
          >
            <img
              src={d.img}
              alt={d.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* OVERLAY */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(15,23,42,0.85), rgba(15,23,42,0.15))",
                display: "flex",
                alignItems: "flex-end",
                padding: 20,
                color: "#fff",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 22 }}>
                  {d.name}
                </h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  Explore stays →
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
