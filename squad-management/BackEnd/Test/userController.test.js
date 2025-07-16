// userController.test.js
const userController = require('../Controller/UserController');
const User = require('../Models/Users');
const transporter = require('../mailer');
const bcrypt = require('bcrypt');

jest.mock('../Models/Users');
jest.mock('../mailer', () => ({
  sendMail: jest.fn(() => Promise.resolve()),
}));

describe('User Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      user: { id: '123' },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('register', () => {
    test('should register user successfully', async () => {
      mockReq.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false,
      };
      User.findByEmail.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        isAdmin: false,
      });

      await userController.register(mockReq, mockRes);

      expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(User.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: 'test@example.com',
          isAdmin: false,
        }),
      }));
    });

    test('should return 409 if email exists', async () => {
      mockReq.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      User.findByEmail.mockResolvedValue({ id: '123' });

      await userController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Email already exists.' });
    });
  });

  describe('login', () => {
    test('should login successfully', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123',
      };
      User.findByEmail.mockResolvedValue({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        isAdmin: false,
      });
      User.verifyPassword = jest.fn(async (pass, hash) => pass === 'password123');

      await userController.login(mockReq, mockRes);

      expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(User.verifyPassword).toHaveBeenCalledWith('password123', expect.any(String));
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({ email: 'test@example.com' }),
      }));
    });

    test('should return 401 with invalid credentials', async () => {
      mockReq.body = { email: 'test@example.com', password: 'wrongpass' };
      User.findByEmail.mockResolvedValue(null);

      await userController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid credentials.' });
    });
  });

  describe('forgotPassword', () => {
    test('should send reset email for existing user', async () => {
      mockReq.body = { email: 'test@example.com' };
      User.findByEmail.mockResolvedValue({ id: '123', name: 'Test User', email: 'test@example.com' });

      await userController.forgotPassword(mockReq, mockRes);

      expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(transporter.sendMail).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, message: 'Password reset email sent' });
    });

    test('should return 404 if user not found', async () => {
      mockReq.body = { email: 'noone@example.com' };
      User.findByEmail.mockResolvedValue(null);

      await userController.forgotPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('resetPassword', () => {
    test('should reset password with valid token', async () => {
      mockReq.params = { token: 'validtoken' };
      mockReq.body = { password: 'newpassword123' };

      // Manually set resetTokens on controller to simulate valid token
      userController.resetTokens = {
        '123': { token: 'validtoken', expires: Date.now() + 10000 }
      };

      User.update.mockResolvedValue(true);

      await userController.resetPassword(mockReq, mockRes);

      expect(User.update).toHaveBeenCalledWith('123', expect.objectContaining({
        password: expect.any(String),
      }));
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, message: 'Password has been reset' });
    });

    test('should return 400 on invalid or expired token', async () => {
      mockReq.params = { token: 'badtoken' };
      mockReq.body = { password: 'newpassword123' };

      userController.resetTokens = {};

      await userController.resetPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    });
  });
});
