const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const authMiddleware = require('../Middleware/auth');

// PUBLIC ROUTES
router.post('/register', userController.register);
router.post('/login', userController.login);

// PROTECTED ROUTES
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/private', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
