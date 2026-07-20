import express from 'express';
import { signup, login, verifyToken, logout } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', signup);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', authenticate, verifyToken);

export default router;