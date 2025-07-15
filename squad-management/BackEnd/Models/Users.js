// Import the PostgreSQL pool instance for DB queries
const {pool} = require('../Database/db');

// Import bcrypt for password hashing and comparison
const bcrypt = require('bcrypt');

// Define the User class
class User {
  // Create 'users' table if it doesn't already exist
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,                         -- Auto-incremented primary key
        name VARCHAR(100) NOT NULL,                    -- User's name (required)
        email VARCHAR(100) UNIQUE NOT NULL,            -- Unique email (required)
        password VARCHAR(255) NOT NULL,                -- Hashed password
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Auto-filled creation time
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Auto-filled update time
        isAdmin BOOLEAN DEFAULT FALSE, -- Admin flag (default false)
      )
    `;
    
    try {
      await pool.query(query);                         // Run table creation query
      console.log('Users table created or already exists');
    } catch (error) {
      console.error('Error creating users table:', error);
      throw error;                                     // Re-throw for external error handling
    }
  }

  // Register/create a new user
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password before storing
    
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;
    
    try {
      const result = await pool.query(query, [name, email, hashedPassword]);
      return result.rows[0];                            // Return inserted user details
    } catch (error) {
      throw error;
    }
  }

  // Find a user by their email address (used in login)
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];                            // Return user if found
    } catch (error) {
      throw error;
    }
  }

  // Find a user by their ID (used for profile fetch)
  static async findById(id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get a list of all users (used in admin panels, etc.)
  static async findAll() {
    const query = 'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC';
    
    try {
      const result = await pool.query(query);
      return result.rows;                              // Return array of users
    } catch (error) {
      throw error;
    }
  }

  // Update user details
  static async update(id, { name, email }) {
    const query = `
      UPDATE users 
      SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, name, email, updated_at
    `;
    
    try {
      const result = await pool.query(query, [name, email, id]);
      return result.rows[0];                            // Return updated user
    } catch (error) {
      throw error;
    }
  }

  // Delete a user by ID
  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];                            // Return deleted user
    } catch (error) {
      throw error;
    }
  }

  // Compare plain text password with hashed one (used in login validation)
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword); // true or false
  }
}

// Export the User class so it can be used in controllers
module.exports = User;
