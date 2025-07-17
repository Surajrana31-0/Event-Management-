import React, { useEffect, useState } from "react";
import EmptyHeader from "../../Authentication/page/LoginHeader";
import "../style/Profile.css";
import Footer from "../../public/page/Footer"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "",email:"", image: null });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data.data);
        setFormData({
          name: data.data.name,
            email: data.data.email,
          image: null,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [backendUrl, token, userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      if (formData.image) {
        form.append("image", formData.image);
      }

      const res = await fetch(`${backendUrl}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Update failed");

      setUser(updated.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <>
      <EmptyHeader />
      <br /><br />
      <div className="profile-container">
        <div className="profile-card">
          {user.image_url && (
            <img
              src={backendUrl + user.image_url}
              alt={user.name}
              className="profile-img"
            />
          )}
          {!isEditing ? (
            <div className="profile-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email"
/>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Profile;
