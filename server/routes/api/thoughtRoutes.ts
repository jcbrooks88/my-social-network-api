import { Router } from 'express';
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from '../../controllers/thoughtController'; 

const thoughtRoutes = Router();

thoughtRoutes.get('/', async (req, res) => {
  try {
    await getThoughts(req, res);  // Delegate to controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

thoughtRoutes.post('/', async (req, res) => {
  try {
    await createThought(req, res);  // Delegate to controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

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

thoughtRoutes.post('/:id/reactions', async (req, res) => {
  try {
    await addReaction(req, res);  // Delegate to controller
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

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

export default thoughtRoutes;
