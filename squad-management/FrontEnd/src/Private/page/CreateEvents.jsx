import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../style/CreateEvents.css";
import LoginHeader from "../../Authentication/page/LoginHeader";
import Footer from "../../public/page/Footer";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({ open: false, message: "", success: false });

  // Auto-close dialog after 2.5 seconds if not clicked
  useEffect(() => {
    if (dialog.open) {
      const timer = setTimeout(() => {
        handleDialogClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [dialog.open]);

  const handleDialogClose = () => {
    setDialog({ open: false, message: "", success: false });
    if (dialog.success) {
      navigate("/dashboard");
    }
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setDialog({ open: true, message: "Event created successfully!", success: true });
      } else {
        setDialog({ open: true, message: result.message || "Failed to create event.", success: false });
      }
    } catch (error) {
      setDialog({ open: true, message: "Server error. Please try again later.", success: false });
    }
  };

  return (
    <>
      <LoginHeader/><br/><br/><br/>
      <div className="book-event-container">
        <form className="book-event-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Create an Event</h2>
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              id="eventName"
              type="text"
              {...register("eventName", { required: "Event name is required" })}
              placeholder="Enter event name"
            />
            {errors.eventName && <span className="form-error">{errors.eventName.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && <span className="form-error">{errors.date.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              type="time"
              {...register("time", { required: "Time is required" })}
            />
            {errors.time && <span className="form-error">{errors.time.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="organizer">Organizer</label>
            <input
              id="organizer"
              type="text"
              {...register("organizer", { required: "Organizer is required" })}
              placeholder="Enter organizer name"
            />
            {errors.organizer && <span className="form-error">{errors.organizer.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              {...register("location", { required: "Location is required" })}
              placeholder="Enter location"
            />
            {errors.location && <span className="form-error">{errors.location.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              defaultValue=""
            >
              <option value="" disabled>
                Select type
              </option>
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
            {errors.type && <span className="form-error">{errors.type.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Describe the event"
              rows={4}
            />
            {errors.description && <span className="form-error">{errors.description.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              id="price"
              type="number"
              min="0"
              step="1"
              {...register("price", { required: "Price is required" })}
              placeholder="Enter price"
            />
            {errors.price && <span className="form-error">{errors.price.message}</span>}
          </div>
          <button type="submit" className="book-event-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
      {/* Modern Dialog */}
      {dialog.open && (
        <div className="custom-dialog-backdrop">
          <div className="custom-dialog">
            <div className={`custom-dialog-title ${dialog.success ? "success" : "error"}`}>
              {dialog.success ? "Success" : "Error"}
            </div>
            <div className="custom-dialog-message">{dialog.message}</div>
            <button className="custom-dialog-btn" onClick={handleDialogClose}>
              {dialog.success ? "OK" : "Cancel"}
            </button>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default CreateEvent;