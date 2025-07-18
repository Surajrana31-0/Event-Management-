const eventController = require('../Controller/eventController');
const Event = require('../Models/Events');

// Mock Event model methods
jest.mock('../Models/Events', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('Event Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Allow time for cleanup
  });

  // Test 1: Create a new event
  it('should create a new event', async () => {
    const req = {
      body: {
        eventName: 'Concert',
        date: '2024-06-01',
        time: '19:00',
        organizer: 'Music Club',
        location: 'Auditorium',
        type: 'Music',
        description: 'A live concert event',
        price: 50.0,
      },
    };
    const res = mockResponse();
    const createdEvent = { id: 1, ...req.body };
    Event.create.mockResolvedValue(createdEvent);

    await eventController.createEvent(req, res);

    expect(Event.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, event: createdEvent });
  });

  // Test 2: Get all events
  it('should return all events', async () => {
    const req = {};
    const res = mockResponse();
    const events = [
      { id: 1, event_name: 'Concert', date: '2024-06-01' },
      { id: 2, event_name: 'Seminar', date: '2024-07-01' },
    ];
    Event.findAll.mockResolvedValue(events);

    await eventController.getAllEvents(req, res);

    expect(Event.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ success: true, events });
  });

  // Test 3: Delete event by id (success)
  it('should delete an event by id', async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    Event.delete.mockResolvedValue({ rowCount: 1 });

    await eventController.deleteEvent(req, res);

    expect(Event.delete).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Event deleted successfully' });
  });

  // Test 4: Delete event by id (not found)
  it('should return 404 if event to delete is not found', async () => {
    const req = { params: { id: 2 } };
    const res = mockResponse();
    Event.delete.mockResolvedValue({ rowCount: 0 });

    await eventController.deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Event not found' });
  });

  // Test 5: Update event by id (success)
  it('should update an event by id', async () => {
    const req = {
      params: { id: 1 },
      body: {
        event_name: 'Updated Concert',
        date: '2024-06-02',
        time: '20:00',
        organizer: 'Music Club',
        location: 'Main Hall',
        type: 'Music',
        description: 'Updated description',
        price: 60.0,
      },
    };
    const res = mockResponse();
    const updatedEvent = { id: 1, ...req.body };
    Event.update.mockResolvedValue(updatedEvent);

    await eventController.updateEvent(req, res);

    expect(Event.update).toHaveBeenCalledWith(1, req.body);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Event updated successfully', event: updatedEvent });
  });

  // Test 6: Update event by id (not found)
  it('should return 404 if event to update is not found', async () => {
    const req = { params: { id: 2 }, body: {} };
    const res = mockResponse();
    Event.update.mockResolvedValue(undefined);

    await eventController.updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Event not found' });
  });

  // Test 7: Handle server error on createEvent
  it('should handle server error on createEvent', async () => {
    const req = { body: { eventName: 'ValidName', date: '2024-06-01', time: '19:00', organizer: 'Org', location: 'Hall', type: 'Music', description: 'Desc', price: 10.0 } };
    const res = mockResponse();
    Event.create.mockRejectedValue(new Error('DB error'));

    await eventController.createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Server error' });
  });

  // Test 8: Handle server error on getAllEvents
  it('should handle server error on getAllEvents', async () => {
    const req = {};
    const res = mockResponse();
    Event.findAll.mockRejectedValue(new Error('DB error'));

    await eventController.getAllEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Server error' });
  });

  // Test 9: Handle server error on deleteEvent
  it('should handle server error on deleteEvent', async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    Event.delete.mockRejectedValue(new Error('DB error'));

    await eventController.deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Server error' });
  });

  // Test 10: Handle server error on updateEvent
  it('should handle server error on updateEvent', async () => {
    const req = { params: { id: 1 }, body: {} };
    const res = mockResponse();
    Event.update.mockRejectedValue(new Error('DB error'));

    await eventController.updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error updating event' });
  });

  // Test 11: Prevent SQL injection on event creation (simulate validation failure)
  it('should handle SQL injection attempt on event creation', async () => {
    const req = { body: { eventName: "Test'; DROP TABLE Events; --", date: '2025-07-19', time: '19:00', organizer: 'Org', location: 'Hall', type: 'Music', description: 'Hacked', price: 10.0 } };
    const res = mockResponse();
    // No need to mock Event.create, validation should fail first
    await eventController.createEvent(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid event name' });
  });

  // Test 12: Prevent XSS on event creation (simulate validation failure)
  it('should handle XSS attempt on event creation', async () => {
    const req = { body: { eventName: "<script>alert('XSS')</script>", date: '2025-07-19', time: '19:00', organizer: 'Org', location: 'Hall', type: 'Music', description: 'XSS Test', price: 10.0 } };
    const res = mockResponse();
    // No need to mock Event.create, validation should fail first
    await eventController.createEvent(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid event name' });
  });
}); 