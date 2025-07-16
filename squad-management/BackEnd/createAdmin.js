// scripts/createAdmin.js

const User = require('./Models/Users'); // Adjust path if needed
const { pool } = require('./Database/db');

(async () => {
  try {
    // Ensure users table exists
    await User.createTable();

    // Admin user details
    const adminData = {
      name: 'Admin',
      email: 'admin@squadEvent.com',
      password: 'itsamemario', // Make sure to change or hash this securely in production
      isAdmin: true
    };

    // Insert admin user
    const result = await User.create(adminData);
    console.log('✅ Admin user created successfully:', result);

    // Close DB connection
    await pool.end();
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    await pool.end();
  }
})();
