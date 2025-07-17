const User = require('../Models/Users'); // Import User model for DB operations
const jwt = require('jsonwebtoken'); // JWT for token generation
const bcrypt = require('bcrypt'); // For password hashing
const crypto = require('crypto'); // For secure random token generation
const transporter = require('../mailer'); // Nodemailer transporter for sending emails
const multer = require('multer'); // For handling file uploads
const path = require('path'); // Path utilities

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // JWT secret key (env or fallback)

const resetTokens = {}; // In-memory storage for password reset tokens (userId -> token info)

// Helper to generate JWT token with 24h expiration
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

// Multer configuration for storing uploaded files in /uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save uploaded images to project's /uploads directory
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    // Generate unique filename: fieldname + timestamp + random number + extension
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage }); // Create multer upload middleware instance

const userController = {
  // Register new user - accepts optional image file ('image' field)
  register: async (req, res) => {
    try {
      const { name, email, password, isAdmin } = req.body; // Extract input fields

      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      // Password length check
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
      }

      // Email format validation via regex
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
      }

      // Check if email already exists in DB
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists.' });
      }

      // If image uploaded, get path, else null
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      // Create new user record in DB (assumes password hashing done inside User.create)
      const newUser = await User.create({ name, email, password, image_url, isAdmin });

      // Generate JWT token for new user
      const token = generateToken(newUser.id);

      // Return success response with token and user info
      res.status(201).json({
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          image_url: newUser.image_url,
          isAdmin: newUser.isAdmin,
        },
      });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  },

  // Login user with email and password
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate presence of email and password
      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // Verify password matches hashed password in DB
      const isMatch = await User.verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // Generate JWT token valid for 7 days
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          image_url: user.image_url, // Include image URL if available
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Return token and user info on success
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image_url: user.image_url,
          isAdmin: user.isAdmin,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  },

  // Handle forgot password: send reset email with token link
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    // Validate email presence
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate secure random token for password reset
      const token = crypto.randomBytes(32).toString('hex');
      const expires = Date.now() + 3600000; // Token expires in 1 hour

      // Store token and expiration by user ID in memory (could be DB in real app)
      resetTokens[user.id] = { token, expires };

      // Construct reset URL for frontend
      const resetLink = `http://localhost:5173/reset-password/${token}`;

      // Send email with reset instructions and link
      await transporter.sendMail({
        from: '"Squad Event" <noreply@squadevent.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>Hello ${user.name},</p>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>This link will expire in 1 hour.</p>
        `,
      });

      // Respond success to client
      return res.json({ success: true, message: 'Password reset email sent' });
    } catch (err) {
      console.error('Forgot password error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Reset password using token sent via email
  resetPassword: async (req, res) => {
    const { token } = req.params; // Extract token from URL params
    const { password } = req.body; // New password from request body

    try {
      // Find userId for the provided token, or return error if not found or expired
      const userId = Object.keys(resetTokens).find((id) => resetTokens[id].token === token);
      if (!userId || resetTokens[userId].expires < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      // Validate password length
      if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }

      // Hash new password securely
      const hashed = await bcrypt.hash(password, 10);
      // Update user's password in DB
      await User.update(userId, { password: hashed });

      // Remove token after successful reset
      delete resetTokens[userId];

      // Send success response
      res.json({ success: true, message: "Password has been reset" });
    } catch (err) {
      console.error("Reset password error:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // Get all users - returns array of users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json({ success: true, data: users });
    } catch (err) {
      console.error('Get users error:', err);
      res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
  },

  // Get user by ID (from URL param)
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (err) {
      console.error('Get user error:', err);
      res.status(500).json({ success: false, message: 'Server error fetching user' });
    }
  },

  // Update user by ID, optionally accepts image upload ('image' field)
updateUser: async (req, res) => {
   console.log('Update user called');
  console.log('Params:', req.params);
  console.log('Body:', req.body);
  console.log('File:', req.file);
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Please provide name and email' });
    }

    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = { name, email };
    if (image_url) updateFields.image_url = image_url;

    console.log('Updating user:', { id, updateFields });

    const updated = await User.update(id, updateFields);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', data: updated });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ success: false, message: 'Server error updating user' });
  }
},


  // Delete user by ID
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      // Delete user in DB, expects boolean or deleted record count
      const deleted = await User.delete(id);

      // If no user deleted, user not found
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Success response
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
      console.error('Delete user error:', err);
      res.status(500).json({ success: false, message: 'Server error deleting user' });
    }
  },

  // Get currently authenticated user's profile (from req.user set by auth middleware)
  getProfile: async (req, res) => {
    try {
      // Find user by id stored in req.user (from token)
      const user = await User.findById(req.user.id);
      // Respond with user data
      res.json({ success: true, data: user });
    } catch (err) {
      console.error('Get profile error:', err);
      res.status(500).json({ success: false, message: 'Server error fetching profile' });
    }
  },
};

// Export both controller object and multer upload middleware separately
module.exports = { userController, upload };
