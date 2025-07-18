const Event = require('../Models/Events');
const { pool } = require('../Database/db');

jest.mock('../Database/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('Event Model', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create a new event', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, event_name: 'Test Event' }] });
    const event = await Event.create({
      eventName: 'Test Event',
      date: '2024-06-01',
      time: '19:00',
      organizer: 'Org',
      location: 'Hall',
      type: 'Music',
      description: 'Desc',
      price: 10.0,
    });
    expect(pool.query).toHaveBeenCalled();
    expect(event).toEqual(expect.objectContaining({ event_name: 'Test Event' }));
  });

  it('should find all events', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }, { id: 2 }] });
    const events = await Event.findAll();
    expect(pool.query).toHaveBeenCalled();
    expect(events.length).toBe(2);
  });

  it('should update an event', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, event_name: 'Updated' }] });
    const updated = await Event.update(1, {
      event_name: 'Updated',
      date: '2024-06-02',
      time: '20:00',
      organizer: 'Org',
      location: 'Main Hall',
      type: 'Music',
      description: 'Updated desc',
      price: 20.0,
    });
    expect(pool.query).toHaveBeenCalled();
    expect(updated).toEqual(expect.objectContaining({ event_name: 'Updated' }));
  });

  it('should delete an event', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });
    const deleted = await Event.delete(1);
    expect(pool.query).toHaveBeenCalled();
    expect(deleted).toBeDefined();
  });
}); 