import { useParams } from "react-router-dom";

export default function YogaDetail() {
  const { slug } = useParams();

  const yogaData = {
    retreat: {
      title: "Himalayan Yoga Retreat",
      desc: "Peaceful yoga retreat in the Himalayas with meditation & pranayama.",
      duration: "7 Days",
    },
    naturopathy: {
      title: "Natural Therapy Program",
      desc: "Healing through nature, diet & detox therapies.",
      duration: "5 Days",
    },
    ayurveda: {
      title: "Ayurvedic Wellness Retreat",
      desc: "Traditional Ayurveda therapies & Panchakarma.",
      duration: "10 Days",
    },
  };

  const yoga = yogaData[slug];

  if (!yoga) return <h2 style={{ padding: 40 }}>Program not found</h2>;

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
      <h1>{yoga.title}</h1>
      <p>{yoga.desc}</p>

      <ul>
        <li><b>Duration:</b> {yoga.duration}</li>
        <li><b>Location:</b> Uttarakhand</li>
        <li><b>Includes:</b> Stay + Meals + Sessions</li>
      </ul>
    </div>
  );
}
