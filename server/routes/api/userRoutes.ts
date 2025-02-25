import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../controllers/userController';

const userRoutes = Router();

userRoutes.get('/', async (req, res) => {
  try {
    await getUsers(req, res);  // Delegate response handling to the controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

userRoutes.post('/', async (req, res) => {
  try {
    await createUser(req, res);  // Delegate response handling to the controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

userRoutes.get('/:id', async (req, res) => {
  try {
    await getUserById(req, res);  // Delegate response handling to the controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

userRoutes.put('/:id', async (req, res) => {
  try {
    await updateUser(req, res);  // Delegate response handling to the controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

userRoutes.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req, res);  // Delegate response handling to the controller
    res.status(204).send();  // Send status after controller completes
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

export default userRoutes;
