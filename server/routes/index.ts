import { Router } from 'express';
import friendRoutes from './api/friendRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';
import authRoutes from "./api/authRoutes.js";

const router: Router = Router();

// Define routes for users and thoughts
router.use('/friends', friendRoutes);
router.use('/thoughts', thoughtRoutes);
router.use("/auth", authRoutes);

export default router;


