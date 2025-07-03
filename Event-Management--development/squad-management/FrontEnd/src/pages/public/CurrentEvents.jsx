import React, { useState } from "react";
import "./CurrentEvents.css";

// Define the tab names for navigation
const tabs = ["All", "For You", "Trending", "Interested"];

// Example event data
const events = [
  {
    id: 1,
    title: "Live Music Night",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    date: "2025-06-15",
    time: "19:00",
    location: "Downtown Arena",
    organizer: "John Doe"
  },
  {
    id: 2,
    title: "Business Conference",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    date: "2025-06-20",
    time: "09:00",
    location: "City Expo Center",
    organizer: "Jane Smith"
  },
  {
    id: 3,
    title: "Food Festival",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    date: "2025-06-18",
    time: "12:00",
    location: "Central Park",
    organizer: "Foodies United"
  },
  {
    id: 4,
    title: "Nightlife Party",
    img: "https://images.unsplash.com/photo-1509228468518-c5eeecbff44a?auto=format&fit=crop&w=400&q=80",
    date: "2025-06-22",
    time: "22:00",
    location: "Club Neon",
    organizer: "Night Owls"
  }
];

const CurrentEvents = () => {
  // State to keep track of the currently active tab
  const [activeTab, setActiveTab] = useState("All");

  // For demo, show all events for every tab
  const filteredEvents = events;

  return (
    <div className="events-tabs-section">
      {/* Tab navigation bar */}
      <div className="events-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`events-tab${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Event flashcards */}
      <div className="events-cards-container">
        {filteredEvents.map(event => (
          <div className="event-card" key={event.id}>
            <img src={event.img} alt={event.title} className="event-card-img" />
            <div className="event-card-body">
              <div className="event-card-header">
                <h3 className="event-card-title">{event.title}</h3>
                <span className="event-card-menu">&#8942;</span>
              </div>
              <div className="event-card-info">
                <br/><br/><div> {event.date}</div>
                <div> {event.time}</div>
                <div>{event.location}</div><br/>
                <div><strong>{event.organizer}</strong></div>
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