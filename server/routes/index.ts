import { Router } from 'express';
import friendRoutes from './api/friendRoutes';
import thoughtRoutes from './api/thoughtRoutes';

const router: Router = Router();

// Define routes for users and thoughts
router.use('/friends', friendRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;


