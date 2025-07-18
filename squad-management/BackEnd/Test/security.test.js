const request = require('supertest');
const app = require('../app');

describe('Security Tests', () => {
  it('should prevent SQL Injection on event creation', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({
        eventName: "Test'; DROP TABLE Events; --",
        date: '2025-07-19',
        time: '19:00',
        organizer: 'Org',
        location: 'Hall',
        type: 'Music',
        description: 'Hacked',
        price: 10.0,
      });
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should prevent XSS attacks on event creation', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({
        eventName: "<script>alert('XSS')</script>",
        date: '2025-07-19',
        time: '19:00',
        organizer: 'Org',
        location: 'Hall',
        type: 'Music',
        description: 'XSS Test',
        price: 10.0,
      });
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
  });
}); 