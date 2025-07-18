import { useEffect, useState } from "react";
import "../style/Hero.css";

import event1 from '../../assets/radiohead.jpg';
import event2 from '../../assets/band.jpeg';
import event3 from '../../assets/live.jpeg';
// Array of carousel images
const images = [event1,event2,event3];

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
        <a href="/login" className="hero-btn">Book Now</a>
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