export default function Home() {
  const navigate = useNavigate();
  // ... (data same rahega)

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>See the world for less</h1>
        <button className="search-btn" onClick={() => navigate("/hotels")}>SEARCH STAYS</button>
      </section>

      <div className="home-content">
        <section className="section">
          <h2>Uttarakhand Tourism</h2>
          <div className="horizontal-scroll-container">
            {uttarakhandExperiences.map((ex, i) => (
              <div key={i} className="scroll-item" onClick={() => navigate("/hotels")}>
                <img src={ex.img} alt={ex.n} />
                <h3>{ex.n}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Featured homes</h2>
          <div className="home-grid">
            {featuredHomes.map((h, i) => (
              <div key={i} className="home-card" onClick={() => navigate("/hotels")}>
                <img src={h.img} alt={h.name} />
                <div className="card-info" style={{padding: "10px"}}>
                  <h3>{h.name}</h3>
                  <p>INR {h.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}