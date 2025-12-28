import { useParams, Link } from "react-router-dom";

export default function CharDhamDetail() {
  const { slug } = useParams();

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 40, textTransform: "capitalize" }}>
        {slug.replace(/-/g, " ")}
      </h1>

      <p style={{ color: "#475569", marginTop: 10 }}>
        This sacred destination is part of the Char Dham Yatra and holds deep
        spiritual significance.
      </p>

      <div style={{ marginTop: 30 }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}
