import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">SQUAD EVENT</div>
      <nav className="header-nav">
        <a href="/find-events">Find Events</a>
        <a href="/create-event">Create Event</a>
        <a href="/help-centre">Help Centre</a>
      </nav>
      <div className="header-actions">
        <a href="/login" className="header-login">Login</a>
        <a href="/register" className="header-signup">Sign Up</a>
      </div>
    </header>
  );
};

export default Header;