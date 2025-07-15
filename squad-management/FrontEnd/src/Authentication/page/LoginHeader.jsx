import React, { useEffect, useState } from "react";

const LoginHeader = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) return;

        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();

        setUsername(data.data.email);  // Here we only use name
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUsername();
  }, []);

  return (
    <header className="header">
      <div className="header-logo">SQUAD EVENT</div>
      <div className="header-right">
        <nav className="header-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/find-events">Find Events</a>
          <a href="/create-events">Create Event</a>
          <a href="/help-centre">Help Centre</a>
        </nav>
        <div className="user-info">
          {username} <span className="dropdown-icon">▼</span>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
