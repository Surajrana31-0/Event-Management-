const Event = require('../Models/Events'); // Import the Event model for DB operations

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    // Use Event model's create method to insert new event from request body data
    const event = await Event.create(req.body);
    // On success, respond with status 201 (Created) and JSON containing success flag and created event
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
