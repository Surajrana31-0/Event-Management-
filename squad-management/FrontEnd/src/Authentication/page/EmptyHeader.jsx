import React from "react";
import "../../public/style/Header.css";

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
      
        </nav>
      
      </div>
    </header>
  );
};

export default EmptyHeader;