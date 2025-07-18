const { pool } = require('../Database/db');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  await pool.end(); // Close the PostgreSQL pool
  await new Promise(resolve => setTimeout(resolve, 500)); // Allow time for cleanup
  jest.restoreAllMocks();
}); 