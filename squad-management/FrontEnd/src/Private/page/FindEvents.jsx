import React, { useState, useEffect } from "react";
import "../style/FindEvents.css";
import Footer from "../../public/page/Footer";
import Header from "../../public/page/Header";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const FindEvent = () => {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`);
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on query
  const filteredEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Header />
      <br /><br /><br />
      <div className="find-event-container">
        <h1>Find Events</h1>

        {/* Section 1: Upcoming Events */}
        <section className="section-block">
          <h2>Upcoming Events</h2>
          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No upcoming events at the moment.</p>
          ) : (
            <div className="event-list">
              {events.map(event => (
                <div className="event-card" key={event.id}>
                  <h3>{event.event_name}</h3>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Type:</strong> {event.type}</p>
                  <p><strong>Price:</strong> Rs. {event.price}</p>
                </div>
              ))}
            </div>
          )}
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

          <div className="event-list">
            {query ? (
              filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div className="event-card" key={event.id}>
                    <h3>{event.event_name}</h3>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Type:</strong> {event.type}</p>
                    <p><strong>Price:</strong> Rs. {event.price}</p>
                  </div>
                ))
              ) : (
                <p>No events found matching "{query}"</p>
              )
            ) : (
              <p>Start typing to find events.</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FindEvent;
