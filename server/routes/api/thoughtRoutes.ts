import { Router } from 'express';
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from '../../controllers/thoughtController'; // Adjust import path

const router = Router();

// Pass req and res to the controller functions
router.get('/', async (req, res) => {
  try {
    const thoughts = await getThoughts(req, res); // Pass req and res here
    res.json(thoughts);
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
    const newThought = await createThought(req, res); // Pass req and res here
    res.status(201).json(newThought);
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
    const thought = await getThoughtById(req, res);
    res.json(thought);
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
    const updatedThought = await updateThought(req, res); // Pass req and res here
    res.json(updatedThought);
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
    await deleteThought(req, res); // Pass req and res here
    res.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

router.post('/:id/reactions', async (req, res) => {
  try {
    const reaction = await addReaction(req, res); // Pass req and res here
    res.status(201).json(reaction);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

router.delete('/:id/reactions/:reactionId', async (req, res) => {
  try {
    await removeReaction(req, res); // Pass req and res here
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
