import express, { Router, Request, Response, NextFunction } from 'express';  // Import necessary types
import { loginUser } from '../../controllers/authController';  // Assuming .ts imports
import { registerUser } from '../../controllers/registerController';

// Create a new Express router
const router: Router = express.Router();

// Define POST routes for login and registration
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginUser(req, res);  // Pass control to your async controller
  } catch (error) {
    next(error);  // Handle any errors that happen in the controller
  }
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registerUser(req, res);  // Pass control to your async controller
  } catch (error) {
    next(error);  // Handle any errors that happen in the controller
  }
});

// Export the router for use in the main app
export default router;
