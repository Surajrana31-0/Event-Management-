import React, { useEffect, useState } from "react";
import "../style/CurrentEvents.css";

const CurrentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Adjust backend URL as needed:
    fetch("http://localhost:5000/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setEvents(data.events);
        } else {
          setError("Failed to load events");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="events-tabs-section">
      {/* Heading on top */}
      <h2 className="events-section-title">Find events near you</h2>

      {/* You can add tabs here if you want */}
      <div className="events-cards-container">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            {/* Placeholder to keep image space */}
            <div className="event-card-image-placeholder"></div>

            <div className="event-card-body">
              <div className="event-card-header">
                <h3 className="event-card-title">{event.event_name}</h3>
                <span className="event-card-menu">&#8942;</span>
              </div>
              <div className="event-card-info">
                <div>Date: {new Date(event.date).toLocaleDateString()}</div>
                <div>Time: {event.time}</div>
                <div>Location: {event.location}</div>
                <div><strong>Organizer: {event.organizer}</strong></div>
                <div>Price: ${event.price}</div>
                <button className="event-card-btn">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentEvents;
