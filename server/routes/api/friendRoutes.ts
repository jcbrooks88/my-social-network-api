import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../controllers/friendController';

const friendRoutes = Router();

friendRoutes.get('/', async (req, res) => {
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

friendRoutes.post('/', async (req, res) => {
  try {
    await createUser(req, res);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

friendRoutes.get('/:id', async (req, res) => {
  try {
    await getUserById(req, res);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

friendRoutes.put('/:id', async (req, res) => {
  try {
    await updateUser(req, res);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

friendRoutes.delete('/:id', async (req, res) => {
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

export default friendRoutes;
