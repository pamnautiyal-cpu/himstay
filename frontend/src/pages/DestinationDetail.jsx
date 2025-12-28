import { useParams, Link } from "react-router-dom";

const DATA = {
  mussoorie: {
    title: "Mussoorie",
    image: "/images/destinations/mussoorie.jpg",
    desc:
      "Mussoorie is a beautiful hill station known as the Queen of Hills, offering scenic views, pleasant weather and colonial charm.",
  },
  nainital: {
    title: "Nainital",
    image: "/images/destinations/nainital.jpg",
    desc:
      "Nainital is famous for its serene lake, temples and cool climate, making it a perfect mountain getaway.",
  },
  dehradun: {
    title: "Dehradun",
    image: "/images/destinations/dehradun.jpg",
    desc:
      "Dehradun is the capital city of Uttarakhand, surrounded by hills, forests and spiritual destinations.",
  },
  haldwani: {
    title: "Haldwani",
    image: "/images/destinations/haldwani.jpg",
    desc:
      "Haldwani is known as the gateway to Kumaon region, connecting plains to the Himalayan hills.",
  },
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const place = DATA[slug];

  if (!place) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Destination not found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 20 }}>
      <img
        src={place.image}
        alt={place.title}
        style={{
          width: "100%",
          height: 420,
          objectFit: "cover",
          borderRadius: 20,
        }}
      />

      <h1 style={{ marginTop: 30, fontSize: 40 }}>{place.title}</h1>
      <p style={{ fontSize: 16, color: "#475569", marginTop: 10 }}>
        {place.desc}
      </p>

      <div style={{ marginTop: 30 }}>
        <Link to="/hotels" style={{ fontWeight: 700 }}>
          View Hotels →
        </Link>
      </div>
    </div>
  );
}
