import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Sidebar style
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

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    event_name: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    type: "",
    description: "",
    price: "",
  });

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

  // When editing event changes, populate the form
  useEffect(() => {
    if (editingEvent) {
      setFormData({
        event_name: editingEvent.event_name || "",
        date: editingEvent.date ? editingEvent.date.split("T")[0] : "",
        time: editingEvent.time || "",
        location: editingEvent.location || "",
        organizer: editingEvent.organizer || "",
        type: editingEvent.type || "",
        description: editingEvent.description || "",
        price: editingEvent.price || "",
      });
    }
  }, [editingEvent]);

  // Update event API call
  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/events/${editingEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Event updated successfully!");
          setEditingEvent(null);
          fetchEvents();
        } else {
          alert("Update failed");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Server error");
      });
  };

  return (
    <>
      {/* Sidebar */}
      <nav style={sidebarStyle}>
        <h2>Admin Panel</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/admin-dashboard")}>
            Dashboard
          </li>
          <li style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/allevents")}>
            Events
          </li>
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

        {/* Edit Form */}
        {editingEvent && (
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              maxWidth: "600px",
            }}
          >
            <h2>Edit Event</h2>

            <input
              type="text"
              placeholder="Event Name"
              value={formData.event_name}
              onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            <input
              type="text"
              placeholder="Organizer"
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            <input
              type="text"
              placeholder="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%", minHeight: "80px" }}
            />

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
              step="0.01"
            />

            <button
              onClick={handleUpdate}
              style={{
                padding: "10px 16px",
                marginRight: "10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setEditingEvent(null)}
              style={{
                padding: "10px 16px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* Events Table */}
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <table
            style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#34495e", color: "white" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Organizer</th>
                <th style={thStyle}>Type</th>
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
                  }}
                >
                  <td style={tdStyle}>{event.event_name}</td>
                  <td style={tdStyle}>{event.date}</td>
                  <td style={tdStyle}>{event.time}</td>
                  <td style={tdStyle}>{event.location}</td>
                  <td style={tdStyle}>{event.organizer}</td>
                  <td style={tdStyle}>{event.type}</td>
                  <td style={tdStyle}>${Number(event.price).toFixed(2)}</td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        backgroundColor: "seagreen",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        marginRight: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingEvent(event)}
                    >
                      Edit
                    </button>
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
