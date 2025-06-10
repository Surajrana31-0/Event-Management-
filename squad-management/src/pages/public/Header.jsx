import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo on the left */}
      <div className="header-logo">
        SQUAD EVENT
      </div>
      {/* Navigation links and auth buttons on the right */}
      <div className="header-right">
        <nav className="header-nav">
          <a href="/find-events">Find Events</a>
          <a href="/create-event">Create Event</a>
          <a href="/help-centre">Help Centre</a>
        </nav>
        <div className="header-auth">
          <a href="/login" className="header-login">Login</a>
          <a href="/signup" className="header-signup">Sign Up</a>
        </div>
      </div>
    </header>
  );
};

export default Header;