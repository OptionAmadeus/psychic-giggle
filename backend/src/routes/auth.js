import { Router } from 'express';
import { login, register } from '../controllers/auth.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);

export { router as authRouter };