const express = require('express');
const router = express.Router();
const { userController, upload } = require('../Controller/UserController');
const authMiddleware = require('../Middleware/auth');

// Use multer middleware here for image upload
router.post('/register', upload.single('image'), userController.register);
router.put('/:id', authMiddleware, upload.single('image'), userController.updateUser);

// Other routes
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.delete('/:id', authMiddleware, userController.deleteUser);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
