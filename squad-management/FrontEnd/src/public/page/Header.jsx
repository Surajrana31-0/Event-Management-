import React from "react";
import "../style/Header.css";

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
          <a href="/login">Find Events</a>
          <a href="/login">Create Event</a>
        
        </nav>
        <div className="header-auth">
          <a href="/login" className="header-login">Login</a>
          <a href="/register" className="header-signup">Sign Up</a>
        </div>
      </div>
    </header>
  );
};

export default Header;