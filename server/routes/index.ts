import { Router } from 'express';
import userRoutes from './api/userRoutes';  // TypeScript will resolve '.ts' automatically
import thoughtRoutes from './api/thoughtRoutes';  // Same here

const router: Router = Router();  // Explicitly define the router type

// Define routes for users and thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;


