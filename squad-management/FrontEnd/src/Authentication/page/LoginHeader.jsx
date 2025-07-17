import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setUserName("");
          setImageUrl("");
          return;
        }

        const response = await fetch(`${backendUrl}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        const fullName = data.data.fullName || data.data.name || data.data.email || "User";

        const profileImage = data.data.image_url
          ? backendUrl + data.data.image_url
          : "";

        setUserName(fullName);
        setImageUrl(profileImage);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserName("");
        setImageUrl("");
      }
    };

    fetchUser();
  }, [backendUrl]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserName("");
    setImageUrl("");
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header" style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #ddd" }}>
      <div className="header-logo" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        SQUAD EVENT
      </div>

      <div
        className="header-right"
        style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
      >
        <nav className="header-nav" style={{ marginRight: "1rem" }}>
          <Link to="/dashboard" style={{ marginRight: "1rem" }}>
            Dashboard
          </Link>
          <Link to="/find-events" style={{ marginRight: "1rem" }}>
            Find Events
          </Link>
          <Link to="/create-events">Create Event</Link>
        </nav>

        <div
          className="user-info"
          ref={dropdownRef}
          style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={userName}
                title={userName}
                onClick={toggleDropdown}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px solid #eee",
                }}
              />
              <span
                onClick={toggleDropdown}
                style={{ cursor: "pointer", fontWeight: "bold", userSelect: "none" }}
                title="User menu"
              >
                {userName}
              </span>

              {dropdownOpen && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "#fff",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    borderRadius: "4px",
                    zIndex: 1000,
                    minWidth: "140px",
                  }}
                >
                  <button
                    onClick={handleProfileClick}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: "0.5rem" }}>
                Login
              </Link>{" "}
              /{" "}
              <Link to="/register" style={{ marginLeft: "0.5rem" }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
