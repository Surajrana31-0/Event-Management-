const { userController } = require('../Controller/UserController');
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('../Models/Users', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  verifyPassword: jest.fn(),
}));
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('User Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = { body: {}, params: {}, file: null, user: { id: 1 } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register user successfully', async () => {
      mockReq.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false,
      };
      mockReq.file = null;
      User.findByEmail.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        image_url: null,
        isAdmin: false,
      });
      jwt.sign.mockReturnValue('mocktoken');

      await userController.register(mockReq, mockRes);

      expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(User.create).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        image_url: null,
        isAdmin: false,
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'mocktoken',
        user: expect.objectContaining({
          email: 'test@example.com',
          isAdmin: false,
        }),
      });
    });

    it('should return 409 if email exists', async () => {
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

    it('should return 400 for missing fields', async () => {
      mockReq.body = { name: '', email: '', password: '' };
      await userController.register(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'All fields are required.' });
    });

    it('should return 400 for short password', async () => {
      mockReq.body = { name: 'Test', email: 'test@example.com', password: '123' };
      await userController.register(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Password must be at least 6 characters.' });
    });

    it('should return 400 for invalid email', async () => {
      mockReq.body = { name: 'Test', email: 'invalid', password: 'password123' };
      await userController.register(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid email format.' });
    });

    it('should handle server error', async () => {
      mockReq.body = { name: 'Test', email: 'test@example.com', password: 'password123' };
      User.findByEmail.mockRejectedValue(new Error('DB error'));
      await userController.register(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      mockReq.body = { email: 'test@example.com', password: 'password123' };
      const user = { id: 1, name: 'Test', email: 'test@example.com', password: 'hashed', isAdmin: false };
      User.findByEmail.mockResolvedValue(user);
      User.verifyPassword.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mocktoken');
      await userController.login(mockReq, mockRes);
      expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(User.verifyPassword).toHaveBeenCalledWith('password123', 'hashed');
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'mocktoken',
        user: expect.objectContaining({ email: 'test@example.com' }),
      });
    });

    it('should return 400 for missing fields', async () => {
      mockReq.body = { email: '', password: '' };
      await userController.login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'All fields are required.' });
    });

    it('should return 401 for invalid credentials (no user)', async () => {
      mockReq.body = { email: 'test@example.com', password: 'password123' };
      User.findByEmail.mockResolvedValue(null);
      await userController.login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid credentials.' });
    });

    it('should return 401 for invalid credentials (wrong password)', async () => {
      mockReq.body = { email: 'test@example.com', password: 'password123' };
      User.findByEmail.mockResolvedValue({ id: 1, password: 'hashed' });
      User.verifyPassword.mockResolvedValue(false);
      await userController.login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid credentials.' });
    });

    it('should handle server error', async () => {
      mockReq.body = { email: 'test@example.com', password: 'password123' };
      User.findByEmail.mockRejectedValue(new Error('DB error'));
      await userController.login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('forgotPassword', () => {
    it('should return 400 if email is missing', async () => {
      mockReq.body = {};
      await userController.forgotPassword(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Email is required' });
    });
    it('should return 404 if user not found', async () => {
      mockReq.body = { email: 'notfound@example.com' };
      User.findByEmail.mockResolvedValue(null);
      await userController.forgotPassword(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('resetPassword', () => {
    it('should return 400 for invalid or expired token', async () => {
      mockReq.params = { token: 'invalidtoken' };
      mockReq.body = { password: 'newpassword' };
      await userController.resetPassword(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    });
    it('should return 400 for short password', async () => {
      mockReq.params = { token: 'validtoken' };
      mockReq.body = { password: '123' };
      // Simulate valid token in resetTokens
      userController.__resetTokens = { 1: { token: 'validtoken', expires: Date.now() + 10000 } };
      await userController.resetPassword(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Password must be at least 6 characters' });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      User.findAll.mockResolvedValue([{ id: 1, name: 'Test' }]);
      await userController.getAllUsers(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: [{ id: 1, name: 'Test' }] });
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      mockReq.params = { id: 1 };
      User.findById.mockResolvedValue({ id: 1, name: 'Test' });
      await userController.getUserById(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: { id: 1, name: 'Test' } });
    });
    it('should return 404 if user not found', async () => {
      mockReq.params = { id: 2 };
      User.findById.mockResolvedValue(null);
      await userController.getUserById(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      mockReq.params = { id: 1 };
      mockReq.body = { name: 'Updated', email: 'updated@example.com' };
      User.update.mockResolvedValue({ id: 1, name: 'Updated', email: 'updated@example.com' });
      await userController.updateUser(mockReq, mockRes);
      expect(User.update).toHaveBeenCalledWith(1, { name: 'Updated', email: 'updated@example.com' });
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'User updated successfully',
        data: { id: 1, name: 'Updated', email: 'updated@example.com' },
      });
    });
    it('should return 404 if user not found', async () => {
      mockReq.params = { id: 2 };
      mockReq.body = { name: 'Updated', email: 'updated@example.com' };
      User.update.mockResolvedValue(null);
      await userController.updateUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
    });
    it('should return 400 if missing name or email', async () => {
      mockReq.params = { id: 1 };
      mockReq.body = { name: '', email: '' };
      await userController.updateUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Please provide name and email' });
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      mockReq.params = { id: 1 };
      User.delete.mockResolvedValue({ id: 1 });
      await userController.deleteUser(mockReq, mockRes);
      expect(User.delete).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, message: 'User deleted successfully' });
    });
    it('should return 404 if user not found', async () => {
      mockReq.params = { id: 2 };
      User.delete.mockResolvedValue(null);
      await userController.deleteUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
    });
  });
});
