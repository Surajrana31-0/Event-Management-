const Event = require('../Models/Events');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
exports.getAllEvents = async (req, res) => {
  try {
    const result = await Event.findAll();
    res.json({ success: true, events: result });
  } catch (err) {
    console.error("Fetch events error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
