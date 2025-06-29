import React from "react";
import { Link } from "react-router-dom";

const EmptyHeader = () => (
  <header
    className="empty-header"
    style={{
      padding: "18px 32px",
      background: "linear-gradient(to right,rgb(241, 239, 239),rgb(93, 29, 188))"
    }}
  >
    <Link to="/" className="logo-link" style={{ textDecoration: "none" }}>
      <span
        className="logo-text"
        style={{
          fontWeight: 700,
          fontSize: "1.6rem",
          color: "#571fce",
          letterSpacing: "1px"
        }}
      >
        SQUAD EVENT
      </span>
    </Link>
  </header>
);

export default EmptyHeader;