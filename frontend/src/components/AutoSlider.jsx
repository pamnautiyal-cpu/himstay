import React, { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5",
  "https://images.unsplash.com/photo-1548013146-72479768bada",
];

export default function AutoSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 30px 70px rgba(15,23,42,0.25)",
      }}
    >
      <img
        src={images[index]}
        alt="Himalayas"
        style={{
          width: "100%",
          height: 420,
          objectFit: "cover",
          transition: "opacity 0.6s ease",
          display: "block",
        }}
      />
    </div>
  );
}
