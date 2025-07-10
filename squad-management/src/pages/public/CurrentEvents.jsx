// Importing React and useState hook for state management
import React, { useState } from "react";

// Importing the CSS file for styling the CurrentEvents component
import "./CurrentEvents.css";

// Define the tab names for navigation as an array of strings
const tabs = ["All", "For You", "Trending", "Interested"];

// Example event data as an array of objects
const events = [
  {
    id: 1, // Unique identifier for the event
    title: "Live Music Night", // Event title
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80", // Event image URL
    date: "2025-06-15", // Event date
    time: "19:00", // Event time
    location: "Downtown Arena", // Event location
    organizer: "John Doe" // Event organizer
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

// Defining the CurrentEvents functional component
const CurrentEvents = () => {
  // useState hook to keep track of the currently active tab, default is "All"
  const [activeTab, setActiveTab] = useState("All");

  // For demo purposes, showing all events for every tab (no filtering logic implemented)
  const filteredEvents = events;

  return (
    // Wrapper div for the entire events section
    <div className="events-tabs-section">
      
      {/* Tab navigation bar */}
      <div className="events-tabs">
        {/* Mapping through each tab name to render as buttons */}
        {tabs.map((tab) => (
          <button
            key={tab} // Unique key for each button based on tab name
            className={`events-tab${activeTab === tab ? " active" : ""}`} // Apply 'active' class if this tab is active
            onClick={() => setActiveTab(tab)} // Set active tab on click
          >
            {tab} {/* Display tab name */}
          </button>
        ))}
      </div>

      {/* Container for the list of event flashcards */}
      <div className="events-cards-container">
        {/* Mapping through filteredEvents to render each event card */}
        {filteredEvents.map(event => (
          // Wrapper div for individual event card with unique key
          <div className="event-card" key={event.id}>
            {/* Event image */}
            <img src={event.img} alt={event.title} className="event-card-img" />
            
            {/* Body of the event card containing details */}
            <div className="event-card-body">
              
              {/* Header section with event title and menu icon */}
              <div className="event-card-header">
                <h3 className="event-card-title">{event.title}</h3>
                <span className="event-card-menu">&#8942;</span> {/* Three-dot menu icon */}
              </div>

              {/* Event information section */}
              <div className="event-card-info">
                <br/><br/> {/* Line breaks for spacing */}
                <div>{event.date}</div> {/* Event date */}
                <div>{event.time}</div> {/* Event time */}
                <div>{event.location}</div><br/> {/* Event location with line break */}
                <div><strong>{event.organizer}</strong></div> {/* Event organizer in bold */}
                
                {/* Join Now button */}
                <button className="event-card-btn">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporting CurrentEvents component as default export for use in other files
export default CurrentEvents;
