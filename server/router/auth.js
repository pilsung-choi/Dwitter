import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';

const router = express.Router();

// signup
router.post('/signup', authController.signup);
// login
router.post('/login', authController.login);
// me
router.get('/me', authController.me);

export default router;
