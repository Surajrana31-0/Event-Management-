const pool = require('../Database/db');

exports.create = async ({ eventName, date, time, organizer, location, type, description, price }) => {
  const result = await pool.query(
    `INSERT INTO events (event_name, date, time, organizer, location, type, description, price)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [eventName, date, time, organizer, location, type, description, price]
  );
  return result.rows[0];
};
exports.findAll = async () => {
  const result = await pool.query(`SELECT * FROM events ORDER BY created_at DESC`);
  return result.rows;
};
