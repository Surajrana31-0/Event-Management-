const request = require('supertest');
const app = require('../app'); // Import the real Express app

describe('Event API Endpoints', () => {
  let eventId;

  it('should create an event', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({
        eventName: 'Test Event',
        date: '2024-06-01',
        time: '19:00',
        organizer: 'Org',
        location: 'Hall',
        type: 'Music',
        description: 'Desc',
        price: 10.0,
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('event');
    eventId = res.body.event.id;
  });

  it('should get all events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.events)).toBe(true);
  });

  it('should update an event', async () => {
    const res = await request(app)
      .put(`/api/events/${eventId}`)
      .send({
        event_name: 'Updated Event',
        date: '2024-06-02',
        time: '20:00',
        organizer: 'Org',
        location: 'Main Hall',
        type: 'Music',
        description: 'Updated desc',
        price: 20.0,
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('event');
    expect(res.body.event.event_name).toBe('Updated Event');
  });

  it('should delete an event', async () => {
    const res = await request(app).delete(`/api/events/${eventId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Event deleted successfully');
  });
}); 