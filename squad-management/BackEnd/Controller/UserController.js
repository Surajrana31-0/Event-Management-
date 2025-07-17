const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../mailer');
const multer = require('multer');
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const resetTokens = {};

// JWT helper to generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

// Multer setup for storing uploaded images in /uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // uploads folder at project root
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

const userController = {
  // Register - accepts image file (field name 'image')
  register: async (req, res) => {
    try {
      const { name, email, password, isAdmin } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists.' });
      }

      // Save image path or null if no file
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      const newUser = await User.create({ name, email, password, image_url, isAdmin });

      const token = generateToken(newUser.id);

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

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      const isMatch = await User.verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

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

  // Forgot Password
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expires = Date.now() + 3600000; // 1 hour
      resetTokens[user.id] = { token, expires };

      const resetLink = `http://localhost:5173/reset-password/${token}`;

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

      return res.json({ success: true, message: 'Password reset email sent' });
    } catch (err) {
      console.error('Forgot password error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const userId = Object.keys(resetTokens).find((id) => resetTokens[id].token === token);
      if (!userId || resetTokens[userId].expires < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }

      const hashed = await bcrypt.hash(password, 10);
      await User.update(userId, { password: hashed });

      delete resetTokens[userId];

      res.json({ success: true, message: "Password has been reset" });
    } catch (err) {
      console.error("Reset password error:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json({ success: true, data: users });
    } catch (err) {
      console.error('Get users error:', err);
      res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
  },

  // Get user by ID
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

  // Update user (accepts optional image upload with field 'image')
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Please provide name and email' });
      }

      // If image uploaded, get path
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      const updated = await User.update(id, { name, email, image_url });

      if (!updated) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, message: 'User updated successfully', data: updated });
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ success: false, message: 'Server error updating user' });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await User.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
      console.error('Delete user error:', err);
      res.status(500).json({ success: false, message: 'Server error deleting user' });
    }
  },

  // Get current user's profile
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({ success: true, data: user });
    } catch (err) {
      console.error('Get profile error:', err);
      res.status(500).json({ success: false, message: 'Server error fetching profile' });
    }
  },
};

// Export controller and multer upload separately
module.exports = { userController, upload };
