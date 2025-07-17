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
  password: 'itsamemario',
  isAdmin: true,
  image_url: 'https://via.placeholder.com/150' // Optional default image
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
