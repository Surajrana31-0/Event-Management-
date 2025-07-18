const Event = require('../Models/Events'); // Import the Event model for DB operations
const validator = require('validator');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, date, time, organizer, location, type, description, price } = req.body;
    // Input validation
    if (!eventName || !validator.isLength(eventName, { min: 1, max: 100 }) ||
        !validator.isAlphanumeric(eventName.replace(/[\s-]/g, '')) ||
        /<script|SELECT|INSERT|DELETE|UPDATE|DROP|--|;|\bOR\b|\bAND\b|UNION|EXEC|EXECUTE|CREATE|ALTER|TRUNCATE|'|"|`/i.test(eventName)) {
      return res.status(400).json({ error: 'Invalid event name' });
    }
    if (!date || !validator.isISO8601(date)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ error: 'Invalid time format' });
    }
    if (!organizer || !validator.isLength(organizer, { min: 1, max: 100 })) {
      return res.status(400).json({ error: 'Invalid organizer' });
    }
    if (!location || !validator.isLength(location, { min: 1, max: 100 })) {
      return res.status(400).json({ error: 'Invalid location' });
    }
    if (!type || !validator.isLength(type, { min: 1, max: 100 })) {
      return res.status(400).json({ error: 'Invalid type' });
    }
    if (!description || !validator.isLength(description, { min: 1, max: 1000 })) {
      return res.status(400).json({ error: 'Invalid description' });
    }
    if (price === undefined || !validator.isFloat(String(price))) {
      return res.status(400).json({ error: 'Invalid price' });
    }
    // If all validations pass, create the event
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
  } catch (err) {
    // Log any error to the console
    console.error("Create event error:", err);
    // Respond with status 500 (Internal Server Error) and JSON indicating failure
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    // Use Event model's findAll method to fetch all events from DB
    const result = await Event.findAll();
    // Respond with JSON containing success flag and events array
    res.json({ success: true, events: result });
  } catch (err) {
    // Log any error
    console.error("Fetch events error:", err);
    // Respond with status 500 and error message
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete an event by id
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params; // Extract event id from URL parameters
    // Call Event model's delete method with the id
    const result = await Event.delete(id);

    // If no rows were affected, event was not found
    if (result.rowCount === 0) {
      // Respond with 404 (Not Found) and appropriate message
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Respond with success message on successful deletion
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    // Log error
    console.error('Delete event error:', err);
    // Respond with 500 server error and failure message
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Update an event by id
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params; // Extract event id from URL parameters
    // Call Event model's update method with id and request body containing updated fields
    const updated = await Event.update(id, req.body);

    // If update returned falsy value, event was not found
    if (!updated) {
      // Respond with 404 Not Found and message
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Respond with success message and updated event data
    res.json({ success: true, message: 'Event updated successfully', event: updated });
  } catch (err) {
    // Log error
    console.error('Update event error:', err);
    // Respond with 500 error and failure message
    res.status(500).json({ success: false, message: 'Server error updating event' });
  }
};
