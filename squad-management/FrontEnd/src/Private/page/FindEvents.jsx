import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/FindEvents.css";
import Footer from "../../public/page/Footer";
import LoginHeader from "../../Authentication/page/LoginHeader";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const FindEvent = () => {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      fetchEvents();
    }
  }, [token, navigate]);

  // Delete event handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      // Update state to remove deleted event
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting event. Please try again.");
      if (err.message.includes("401")) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // Filter events based on query
  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <LoginHeader />
      <br />
      <br />
      <br />
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
              {events.map((event) => (
                <div className="event-card modern-card" key={event.id}>
                  <h3 className="event-title">{event.event_name}</h3>
                  <div className="event-info-row"><span>Date:</span> {event.date}</div>
                  <div className="event-info-row"><span>Time:</span> {event.time}</div>
                  <div className="event-info-row"><span>Location:</span> {event.location}</div>
                  <div className="event-info-row"><span>Type:</span> {event.type}</div>
                  <div className="event-info-row"><span>Price:</span> <b>Rs. {event.price}</b></div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
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
                filteredEvents.map((event) => (
                  <div className="event-card modern-card" key={event.id}>
                    <h3 className="event-title">{event.event_name}</h3>
                    <div className="event-info-row"><span>Date:</span> {event.date}</div>
                    <div className="event-info-row"><span>Time:</span> {event.time}</div>
                    <div className="event-info-row"><span>Location:</span> {event.location}</div>
                    <div className="event-info-row"><span>Type:</span> {event.type}</div>
                    <div className="event-info-row"><span>Price:</span> <b>Rs. {event.price}</b></div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
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
