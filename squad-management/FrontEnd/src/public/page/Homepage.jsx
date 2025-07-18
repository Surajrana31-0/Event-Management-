import { useState } from "react";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import "../style/Homepage.css";
import CurrentEvents from "./CurrentEvents.jsx";
import Testimony from "./Testimony.jsx";
import Footer from "./Footer.jsx"; // Make sure Footer is imported
import { Link } from "react-router-dom";


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
    img: "https://images.unsplash.com/photo-1506699311528-5be252edc26a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    <Link to="/login" key={cat.name} className="category-link">
      <div className="category-card">
        <img src={cat.img} alt={cat.name} className="category-img" />
        <span>{cat.name}</span>
      </div>
    </Link>
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