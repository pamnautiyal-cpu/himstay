import { useParams } from "react-router-dom";

export default function DestinationDetail() {
  const { slug } = useParams();

  return (
    <div style={{ maxWidth: 1000, margin: "50px auto" }}>
      <h1>{slug.replace("-", " ")}</h1>
      <p>Destination detail page</p>
    </div>
  );
}
