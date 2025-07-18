jest.mock('../Middleware/auth', () => (req, res, next) => next());
const request = require('supertest');
const app = require('../app');
const { userController, upload } = require('../Controller/UserController');

jest.mock('../Controller/UserController', () => ({
  userController: {
    register: jest.fn((req, res) => res.status(201).json({})),
    login: jest.fn((req, res) => res.status(200).json({})),
    getAllUsers: jest.fn((req, res) => res.status(200).json([])),
    getUserById: jest.fn((req, res) => res.status(200).json({})),
    updateUser: jest.fn((req, res) => res.status(200).json({})),
    deleteUser: jest.fn((req, res) => res.status(200).json({})),
    forgotPassword: jest.fn((req, res) => res.status(200).json({})),
    resetPassword: jest.fn((req, res) => res.status(200).json({})),
    getProfile: jest.fn((req, res) => res.status(200).json({})),
  },
  upload: { single: jest.fn(() => (req, res, next) => next()) },
}));

describe('User Routes', () => {
  it('POST /register should call register', async () => {
    await request(app).post('/api/users/register').send({}).expect(201);
    expect(userController.register).toHaveBeenCalled();
  });
  it('POST /login should call login', async () => {
    await request(app).post('/api/users/login').send({}).expect(200);
    expect(userController.login).toHaveBeenCalled();
  });
  it('GET /api/users should call getAllUsers', async () => {
    await request(app).get('/api/users').expect(200);
    expect(userController.getAllUsers).toHaveBeenCalled();
  });
  it('GET /api/users/:id should call getUserById', async () => {
    await request(app).get('/api/users/1').expect(200);
    expect(userController.getUserById).toHaveBeenCalled();
  });
  it('PUT /api/users/:id should call updateUser', async () => {
    await request(app).put('/api/users/1').send({}).expect(200);
    expect(userController.updateUser).toHaveBeenCalled();
  });
  it('DELETE /api/users/:id should call deleteUser', async () => {
    await request(app).delete('/api/users/1').expect(200);
    expect(userController.deleteUser).toHaveBeenCalled();
  });
  it('POST /api/users/forgot-password should call forgotPassword', async () => {
    await request(app).post('/api/users/forgot-password').send({}).expect(200);
    expect(userController.forgotPassword).toHaveBeenCalled();
  });
  it('POST /api/users/reset-password/:token should call resetPassword', async () => {
    await request(app).post('/api/users/reset-password/abc123').send({}).expect(200);
    expect(userController.resetPassword).toHaveBeenCalled();
  });
}); 