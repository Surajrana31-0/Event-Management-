const User = require('../Models/Users');
const { pool } = require('../Database/db');
const bcrypt = require('bcrypt');

jest.mock('../Database/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));
jest.mock('bcrypt');

describe('User Model', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create a new user', async () => {
    bcrypt.hash.mockResolvedValue('hashedpw');
    pool.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test', email: 'test@example.com' }] });
    const user = await User.create({ name: 'Test', email: 'test@example.com', password: 'pw' });
    expect(bcrypt.hash).toHaveBeenCalledWith('pw', 10);
    expect(pool.query).toHaveBeenCalled();
    expect(user).toEqual(expect.objectContaining({ id: 1, name: 'Test' }));
  });

  it('should find user by email', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, email: 'test@example.com' }] });
    const user = await User.findByEmail('test@example.com');
    expect(pool.query).toHaveBeenCalled();
    expect(user).toEqual(expect.objectContaining({ email: 'test@example.com' }));
  });

  it('should find user by id', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test' }] });
    const user = await User.findById(1);
    expect(pool.query).toHaveBeenCalled();
    expect(user).toEqual(expect.objectContaining({ id: 1 }));
  });

  it('should find all users', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }, { id: 2 }] });
    const users = await User.findAll();
    expect(pool.query).toHaveBeenCalled();
    expect(users.length).toBe(2);
  });

  it('should update user', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, name: 'Updated' }] });
    const updated = await User.update(1, { name: 'Updated' });
    expect(pool.query).toHaveBeenCalled();
    expect(updated).toEqual(expect.objectContaining({ name: 'Updated' }));
  });

  it('should return null if update fields are empty', async () => {
    const updated = await User.update(1, {});
    expect(updated).toBeNull();
  });

  it('should delete user', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1 }] });
    const deleted = await User.delete(1);
    expect(pool.query).toHaveBeenCalled();
    expect(deleted).toEqual(expect.objectContaining({ id: 1 }));
  });

  it('should verify password', async () => {
    bcrypt.compare.mockResolvedValue(true);
    const result = await User.verifyPassword('plain', 'hashed');
    expect(bcrypt.compare).toHaveBeenCalledWith('plain', 'hashed');
    expect(result).toBe(true);
  });
}); 