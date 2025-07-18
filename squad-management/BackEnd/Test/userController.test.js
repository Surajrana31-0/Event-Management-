const { userController } = require('../Controller/UserController');
const User = require('../Models/Users');

// Mock User model methods used in register
jest.mock('../Models/Users', () => ({
  findByEmail: jest.fn(),
  create: jest.fn(),
}));

describe('User Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      file: null,
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
      mockReq.file = null; // no image uploaded

      User.findByEmail.mockResolvedValue(null); // no existing user
      User.create.mockResolvedValue({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        image_url: null,
        isAdmin: false,
      });

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

      User.findByEmail.mockResolvedValue({ id: '123' }); // user exists

      await userController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Email already exists.' });
    });
  });
});
