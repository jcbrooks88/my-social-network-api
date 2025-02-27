import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getFriends,
  addFriend
} from '../../controllers/friendController.js';

const friendRoutes = Router();

// Fetch all users
friendRoutes.get('/', async (req, res) => {
  try {
    await getUsers(req, res);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Create a new user
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

// Fetch a user's details by ID
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

// Update user details
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

// Delete a user
friendRoutes.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req, res);
    res.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Get the list of friends for a specific user
friendRoutes.get('/:id/friends', async (req, res) => {
  try {
    await getFriends(req, res); 
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Add a friend to the user's friends list
friendRoutes.post('/:id/add-friend', async (req, res) => {
  try {
    await addFriend(req, res);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

export default friendRoutes;
