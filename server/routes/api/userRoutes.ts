import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../controllers/userController';  // Adjust import path

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await getUsers(req, res);  // Pass req and res to controller function
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await createUser(req, res);  // Pass req and res to controller function
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req, res);
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await updateUser(req, res);  // Pass req and res to controller function
    res.json(updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req, res);  // Pass req and res to controller function
    res.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

export default router;


