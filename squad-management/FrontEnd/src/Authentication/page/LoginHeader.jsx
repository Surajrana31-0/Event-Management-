import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setUserName("");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();

        const fullName = data.data.fullName || data.data.name || data.data.email || "User";
        setUserName(fullName);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserName("");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserName("");
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-logo">SQUAD EVENT</div>
      <div className="header-right">
        <nav className="header-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/find-events">Find Events</Link>
          <Link to="/create-events">Create Event</Link>
          <Link to="/help-centre">Help Centre</Link>
        </nav>

        <div className="user-info" ref={dropdownRef} style={{ position: "relative" }}>
          {userName ? (
            <>
              <span
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {userName} <span className="dropdown-icon">▼</span>
              </span>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "5px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    minWidth: "120px",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "1rem",
                    }}
                    onMouseDown={(e) => e.preventDefault()} // Prevent button from losing focus when clicking
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
