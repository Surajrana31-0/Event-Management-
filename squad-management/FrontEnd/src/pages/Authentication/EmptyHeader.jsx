import React from "react";
import "../public/Header.css";

const EmptyHeader = () => {
  return (
    <header className="header">
      {/* Logo on the left */}
      <div className="header-logo">
       <a href="/"> SQUAD EVENT</a>
      </div>
      {/* Navigation links and auth buttons on the right */}
      <div className="header-right">
        <nav className="header-nav">
          <a href="/find-events">Find Events</a>
          <a href="/create-event">Create Event</a>
          <a href="/help-centre">Help Centre</a>
        </nav>
      
      </div>
    </header>
  );
};

export default EmptyHeader;