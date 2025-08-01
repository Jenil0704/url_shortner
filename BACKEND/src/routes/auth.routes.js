import express from 'express'
import {register_user, login_user, get_current_user} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/register", register_user);
router.post("/login", login_user);
router.get("/me", authMiddleware, get_current_user);

export default router;