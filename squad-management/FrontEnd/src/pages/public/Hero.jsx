import React, { useState, useEffect } from "react";
import "./Hero.css";

// Array of carousel images
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=800&q=80"
];

const Hero = () => {
  // State to track the current image index
  const [current, setCurrent] = useState(0);

  // Effect to auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length); // Loop back to first image
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="hero">
      {/* Carousel image */}
      <div className="hero-image-container">
        <img src={images[current]} alt="Event" className="hero-image" />
      </div>
      {/* Hero text content */}
      <div className="hero-content">
        <h1>Discover & Create Amazing Events</h1>
        <p>Join the best events in your city or host your own with ease.</p>
        <a href="/find-events" className="hero-btn">Book Now</a>
      </div>
      {/* Carousel navigation dots */}
      <div className="hero-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`hero-dot${idx === current ? " active" : ""}`} // Highlight active dot
            onClick={() => setCurrent(idx)} // Allow manual selection
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;