import React from "react";
import "../Private/Dashboard.css";
import Footer from "../public/Footer";
import EmptyHeader from "../Authentication/EmptyHeader";

const Dashboard = () => {
  return (
    <>
    <EmptyHeader/>  
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome Back!</h1>
        <p className="subtext">Manage your events, track participation, and more.</p>

        <div className="card-container">
          <div className="card">
            <h2>3</h2>
            <p>Upcoming Events</p>
          </div>
          <div className="card">
            <h2>5</h2>
            <p>Past Events</p>
          </div>
          <div className="card">
            <h2>2</h2>
            <p>Drafts</p>
          </div>
        </div>

        <div className="actions">
          <button className="primary-btn">Create New Event</button>
          <button className="secondary-btn">View All Events</button>
        </div>
      </div>
    </div>
    <Footer/>
 </>
  );
};

export default Dashboard;
