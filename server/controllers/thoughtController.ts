import { Request, Response } from 'express';
import Thought from '../models/Thought';


export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();  // Example: Find all thoughts
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);  // Example: Find thought by ID
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = new Thought(req.body);  // Assuming req.body contains the thought data
    await newThought.save();
    res.status(201).json(newThought);  // Return the created thought
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.push(req.body);  // Assuming req.body contains reaction data
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions = thought.reactions.filter((reaction: any) => reaction.id !== req.params.reactionId);
    await thought.save();
    res.status(204).send();  // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};