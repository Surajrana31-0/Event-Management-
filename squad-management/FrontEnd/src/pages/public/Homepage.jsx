import { useState } from "react";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import "./Homepage.css";
import CurrentEvents from "./CurrentEvents.jsx";
import Testimony from "./Testimony.jsx";
import Footer from "./Footer.jsx"; // Make sure Footer is imported

// Add an image for each category
const categories = [
  {
    name: "Music",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Business",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Nightlife",
    img: "https://images.unsplash.com/photo-1509228468518-c5eeecbff44a?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Holiday",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Food & Drinks",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Education",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Gaming",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Politics",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Health",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80"
  }
];

const Homepage = () => {
  return (
    <>
      <Header />
      <Hero />

      {/* Category cards section */}
      <section className="categories-section">
        <h2 className="categories-title">Browse by Category</h2>
        <div className="categories-container">
          {categories.map((cat) => (
            <div className="category-card" key={cat.name}>
              <img src={cat.img} alt={cat.name} className="category-img" />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <CurrentEvents />
      <Testimony />
      <Footer />
    </>
  );
};

export default Homepage;