import React, { useEffect, useState } from "react";
import {Link,  useNavigate } from "react-router-dom";

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

const cardStyle = {
  backgroundColor: "#ecf0f1",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
  width: "200px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch events for analytics
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.events);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Analytics
  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => new Date(e.date) > new Date()).length;
  const totalRevenue = events.reduce((sum, e) => sum + Number(e.price || 0), 0);

  return (
    <>
      {/* Sidebar */}
      <nav style={sidebarStyle}>
        <h2>Admin Panel</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "15px 0", cursor: "pointer" }}>Dashboard</li>
<li style={{ margin: "15px 0" }}>
  <Link to="/allevents" style={{ color: "white", textDecoration: "none" }}>
    Events
  </Link>
</li>
          

        
          <li
            style={{ margin: "15px 0", cursor: "pointer", color: "tomato" }}
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={contentStyle}>
        <h1>Dashboard</h1>

        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={cardStyle}>
            <h3>Total Events</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalEvents}</p>
          </div>

          <div style={cardStyle}>
            <h3>Upcoming Events</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{upcomingEvents}</p>
          </div>

          <div style={cardStyle}>
            <h3>Total Revenue</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
