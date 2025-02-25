import { Router } from 'express';
import userRoutes from './api/userRoutes';
import thoughtRoutes from './api/thoughtRoutes';

const router: Router = Router();

// Define routes for users and thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;


