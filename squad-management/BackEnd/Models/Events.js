const { pool } = require('../Database/db');

class Event {
  // Create events table if it doesn't exist
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        organizer VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    try {
      await pool.query(query);
      console.log('Events table created or already exists');
    } catch (error) {
      console.error('Error creating events table:', error);
      throw error;
    }
  }

  // Insert a new event
  static async create({ eventName, date, time, organizer, location, type, description, price }) {
    try {
      const result = await pool.query(
        `INSERT INTO events (event_name, "date", "time", organizer, location, type, description, price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [eventName, date, time, organizer, location, type, description, price]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  // Fetch all events ordered by created_at desc
  static async findAll() {
    try {
      const result = await pool.query(`SELECT * FROM events ORDER BY created_at DESC`);
      return result.rows;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
  
  // Delete an event by id
  static async delete(id) {
    try {
      const result = await pool.query(
        `DELETE FROM events WHERE id = $1 RETURNING *`,
        [id]
      );
      return result;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  // Update an event by id
  static async update(id, data) {
  const {
    event_name,
    date,
    time,
    location,
    organizer,
    type,
    description,
    price,
  } = data;

  try {
    const result = await pool.query(
      `UPDATE events SET
        event_name = $1,
        date = $2,
        time = $3,
        location = $4,
        organizer = $5,
        type = $6,
        description = $7,
        price = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *`,
      [event_name, date, time, location, organizer, type, description, price, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}
}

module.exports = Event;
