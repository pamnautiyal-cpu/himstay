import { useParams, Link } from "react-router-dom";

const DATA = {
  mussoorie: {
    title: "Mussoorie 🏔️",
    image: "/images/destinations/mussoorie.jpg",
    desc: `
Mussoorie – Queen of Hills 👑🏔️

Mussoorie, जिसे प्यार से “Queen of Hills” कहा जाता है, उत्तराखंड का एक timeless hill destination है।
यहाँ की ठंडी हवा 🌬️, हरियाली 🌲 और पहाड़ों के panoramic views 🏔️ मन को सुकून देते हैं।

समुद्र तल से लगभग 2,005 मीटर की ऊँचाई पर स्थित यह हिल स्टेशन
honeymoon couples 💑, families 👨‍👩‍👧‍👦 और nature lovers 🌿 के लिए perfect है।

📍 प्रमुख आकर्षण:
• Mall Road 🛍️  
• Gun Hill 🚠  
• Kempty Falls 💦  
• Company Garden 🌸  
• Camel’s Back Road 🚶‍♂️  

✨ The Himalayans के साथ Mussoorie यात्रा मतलब:
• आरामदायक stays  
• curated local experiences  
• पहाड़ों के बीच सुकून भरे पल
`,
  },

  nainital: {
    title: "Nainital 🌊🏔️",
    image: "/images/destinations/nainital.jpg",
    desc: `
Nainital – Lake District of India 💙

Nainital अपनी खूबसूरत झील 🌊, ठंडी जलवायु ❄️ और शांत वातावरण के लिए प्रसिद्ध है।
Naini Lake 🚣‍♀️ इस शहर की जान है।

📍 प्रमुख आकर्षण:
• Naina Devi Temple 🛕  
• Snow View Point 🚡  
• Tiffin Top 🌄  
• Mall Road 🛍️  

✨ Couples और families के लिए एक perfect mountain escape।
`,
  },

  dehradun: {
    title: "Dehradun 🌿",
    image: "/images/destinations/dehradun.jpg",
    desc: `
Dehradun – Gateway to the Himalayas 🚪🏔️

उत्तराखंड की राजधानी Dehradun,
हरी-भरी वादियों 🌲 और शांत वातावरण के लिए जाना जाता है।

📍 प्रमुख स्थल:
• Robber’s Cave 🪨  
• Sahastradhara 💧  
• Forest Research Institute 🏛️  
• Tapkeshwar Temple 🛕

Mussoorie, Rishikesh और Haridwar जाने का perfect base।
`,
  },

  haldwani: {
    title: "Haldwani 🌄",
    image: "/images/destinations/haldwani.jpg",
    desc: `
Haldwani – Gateway to Kumaon 🚪

Kumaon region का entry point,
जहाँ से Nainital, Bhimtal और Mukteshwar की यात्रा शुरू होती है।

✨ Easy connectivity + peaceful stopover।
`,
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
          borderRadius: 22,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      />

      <h1 style={{ marginTop: 32, fontSize: 42 }}>
        {place.title}
      </h1>

      <p
        style={{
          fontSize: 17,
          color: "#334155",
          marginTop: 16,
          lineHeight: 1.8,
          whiteSpace: "pre-line",
        }}
      >
        {place.desc}
      </p>

      <div style={{ marginTop: 30 }}>
        <Link
          to={`/hotels?city=${slug}`}
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "#2563eb",
            textDecoration: "none",
          }}
        >
          View Hotels →
        </Link>
      </div>
    </div>
  );
}
