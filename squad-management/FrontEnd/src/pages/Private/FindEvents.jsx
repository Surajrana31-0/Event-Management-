import React, { useState } from "react";
import "./FindEvents.css";
import Footer from "../public/Footer";
import Header from "../public/Header";

const FindEvent = () => {
  const [query, setQuery] = useState("");

  return (

    <>
    <Header/><br></br><br></br><br></br>
    <div className="find-event-container">
      <h1>Find Events</h1>

      {/* Section 1: Upcoming Events */}
      <section className="section-block">
        <h2>Upcoming Events</h2>
        <div className="upcoming-placeholder">
          <p>No upcoming events at the moment.</p>
        </div>
      </section>

      {/* Section 2: Find More Events */}
      <section className="section-block">
        <h2>Find More Events</h2>
        <input
          type="text"
          placeholder="Search by event name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        <div className="more-placeholder">
          <p>No results yet. Start typing to find events.</p>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default FindEvent;
