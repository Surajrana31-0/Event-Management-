import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Sidebar style and content reused from AdminDashboard
const sidebarStyle = {
  width: "220px",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "#2c3e50",
  color: "white",
  padding: "20px",
  boxSizing: "border-box",
};

const contentStyle = {
  marginLeft: "240px",
  padding: "20px",
};

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.events);
        }
      })
      .catch((err) => console.error("Error fetching events:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents((prev) => prev.filter((event) => event.id !== id));
        } else {
          alert("Failed to delete event");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Server error");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const thStyle = {
  padding: "12px 8px",
  borderBottom: "2px solid #ddd",
  textAlign: "center",
  fontWeight: "600",
};

const tdStyle = {
  padding: "10px 8px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
};


  return (
    <>
      {/* Sidebar */}
      <nav style={sidebarStyle}>
        <h2>Admin Panel</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/admin-dashboard")}>Dashboard</li>
          <li style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/allevents")}>Events</li>
      
          <li
            style={{ margin: "15px 0", cursor: "pointer", color: "tomato" }}
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </nav>

      {/* Content */}
      <main style={contentStyle}>
        <h1>All Events</h1>

        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
  <thead>
    <tr style={{ backgroundColor: "#34495e", color: "white" }}>
      <th style={thStyle}>Name</th>
      <th style={thStyle}>Date</th>
      <th style={thStyle}>Location</th>
      <th style={thStyle}>Organiser</th>
      <th style={thStyle}>Price</th>
      <th style={thStyle}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {events.map((event, index) => (
      <tr
        key={event.id}
        style={{
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
          textAlign: "center",
        }}
      >
        <td style={tdStyle}>{event.event_name}</td>
        <td style={tdStyle}>{event.date}</td>
        <td style={tdStyle}>{event.location}</td>
        <td style={tdStyle}>{event.organizer}</td>
        <td style={tdStyle}>${Number(event.price).toFixed(2)}</td>
        <td style={tdStyle}>
          <button
            style={{
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(event.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        )}
      </main>
    </>
  );
};

export default AllEvents;
