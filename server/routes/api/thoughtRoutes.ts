import { Router } from 'express';
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  removeReaction,
  getUserThoughts, // New controller function to fetch thoughts of a user
  addThoughtReaction // New controller function to add a reaction to a thought
} from '../../controllers/thoughtController'; 

const thoughtRoutes = Router();

// Fetch all thoughts
thoughtRoutes.get('/', async (req, res) => {
  try {
    await getThoughts(req, res);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Create a new thought
thoughtRoutes.post('/', async (req, res) => {
  try {
    await createThought(req, res);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Fetch a thought by ID
thoughtRoutes.get('/:id', async (req, res) => {
  try {
    await getThoughtById(req, res);  // Delegate to controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Update a thought
thoughtRoutes.put('/:id', async (req, res) => {
  try {
    await updateThought(req, res);  // Delegate to controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Delete a thought
thoughtRoutes.delete('/:id', async (req, res) => {
  try {
    await deleteThought(req, res);  // Delegate to controller
    res.status(204).send();  // Send status only after controller completes
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});


// Remove a reaction from a thought
thoughtRoutes.delete('/:id/reactions/:reactionId', async (req, res) => {
  try {
    await removeReaction(req, res);  // Delegate to controller
    res.status(204).send();  // Send status after controller completes
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Fetch a user's thoughts
thoughtRoutes.get('/:userId/thoughts', async (req, res) => {
  try {
    await getUserThoughts(req, res);  // Call the controller to fetch thoughts of a user
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Add a reaction to a specific thought
thoughtRoutes.post('/:thoughtId/reactions', async (req, res) => {
  try {
    await addThoughtReaction(req, res);  // Call the controller to add a reaction to a thought
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

export default thoughtRoutes;
