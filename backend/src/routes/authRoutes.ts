// backend/src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login, logout, me, requestOTP, resetPassword } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);
router.post('/forgot-password', requestOTP);
router.post('/reset-password', resetPassword);

export default router;
