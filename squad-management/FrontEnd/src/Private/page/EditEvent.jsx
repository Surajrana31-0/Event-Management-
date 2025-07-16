import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/EditEvents.css";
import Footer from "../../public/page/Footer";
import LoginHeader from "../../Authentication/page/LoginHeader";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [dialog, setDialog] = useState({ open: false, message: "", success: false });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/events`);
        const data = await res.json();
        const found = data.events.find(e => String(e.id) === String(id));
        if (!found) throw new Error("Event not found");
        setEvent(found);
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setDialog({ open: false, message: "", success: false });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to update event");
      setDialog({ open: true, message: "Event updated successfully!", success: true });
      setTimeout(() => navigate("/find-events"), 1800);
    } catch (err) {
      setDialog({ open: true, message: "Failed to update event.", success: false });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return null;

  return (
    <>
      <LoginHeader />
      <div className="edit-event-container">
        <form className="edit-event-form" onSubmit={handleSubmit}>
          <h2>Edit Event</h2>
          <div className="form-group">
            <label>Event Name</label>
            <input name="event_name" value={event.event_name || ""} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input name="date" type="date" value={event.date ? event.date.split("T")[0] : ""} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input name="time" type="time" value={event.time || ""} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Organizer</label>
            <input name="organizer" value={event.organizer || ""} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={event.location || ""} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={event.type || ""} onChange={handleChange} required>
              <option value="">Select type</option>
              <option value="Music">Music</option>
              <option value="Business">Business</option>
              <option value="Nightlife">Nightlife</option>
              <option value="Holiday">Holiday</option>
              <option value="Food & Drinks">Food & Drinks</option>
              <option value="Education">Education</option>
              <option value="Gaming">Gaming</option>
              <option value="Politics">Politics</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={event.description || ""} onChange={handleChange} rows={4} required />
          </div>
          <div className="form-group">
            <label>Price (NPR)</label>
            <input name="price" type="number" min="0" step="1" value={event.price || ""} onChange={handleChange} required />
          </div>
          <button type="submit" className="edit-event-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
      {dialog.open && (
        <div className="custom-dialog-backdrop">
          <div className="custom-dialog">
            <div className={`custom-dialog-title ${dialog.success ? "success" : "error"}`}>
              {dialog.success ? "Success" : "Error"}
            </div>
            <div className="custom-dialog-message">{dialog.message}</div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default EditEvent; 