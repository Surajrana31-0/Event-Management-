import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../public/page/Footer";
import EmptyHeader from "../../Authentication/page/LoginHeader";
import "../style/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0); // If you handle drafts differently, adjust accordingly

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Check user auth
    axios
      .get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

    // Fetch events and update counts
    const fetchEvents = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.get("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const events = res.data.events || [];

    const today = new Date();
    let upcoming = 0;
    let past = 0;

    events.forEach((event) => {
      const eventDate = new Date(event.date);

      // Clear time portion for fair comparison if you want:
      // const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      // const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      if (eventDate >= today) {
        upcoming++;
      } else {
        past++;
      }
    });

    setUpcomingCount(upcoming);
    setPastCount(past);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

    fetchEvents();
  }, [navigate]);

  return (
    <>
      <EmptyHeader />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Welcome Back!</h1>
          <p className="subtext">Manage your events, track participation, and more.</p>

          <div className="card-container">
            <div className="card">
              <h2>{upcomingCount}</h2>
              <p>Upcoming Events</p>
            </div>
            <div className="card">
              <h2>{pastCount}</h2>
              <p>Past Events</p>
            </div>
            <div className="card">
              <h2>{draftCount}</h2>
              <p>Drafts</p>
            </div>
          </div>

          <div className="actions">
            <button className="primary-btn" onClick={() => navigate("/create-events")}>
              Create New Event
            </button>
            <button className="secondary-btn" onClick={() => navigate("/find-events")}>
              View All Events
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
