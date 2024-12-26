import express from 'express';
import { login, getMe } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect as any, getMe as any);

export default router;