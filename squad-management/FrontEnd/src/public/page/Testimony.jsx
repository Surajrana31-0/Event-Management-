import React from "react";
import "../style/Testimony.css";

// Example testimonies
const testimonies = [
  {
    id: 1,
    name: "VTEN",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "This platform made organizing my event so easy and fun! Highly recommended."
  },
  {
    id: 2,
    name: "James Smith",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I found amazing events and met wonderful people. Great experience!"
  }
];

const Testimony = () => (
  <div className="testimony-section">
  <h2 className="testimony-title">What people said...</h2>
  <div className="testimony-cards-row">
    {testimonies.map((t) => (
      <div className="testimony-card" key={t.id}>
        <div className="testimony-img-wrapper">
          <img src={t.image} alt={t.name} className="testimony-img" />
        </div>
        <div className="testimony-content">
          <p className="testimony-text">"{t.text}"</p>
          <div className="testimony-name">{t.name}</div>
        </div>
      </div>
    ))}
  </div>
</div>
);

export default Testimony;