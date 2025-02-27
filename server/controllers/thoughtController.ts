import { Request, Response } from 'express';
import { Types } from 'mongoose';  // Import mongoose Types for ObjectId handling
import Thought from '../src/models/Thought';  // Assuming Thought is your model for thoughts
import Reaction from '../src/models/Reaction';  // Assuming Reaction is the model for reactions

// Get a user's thoughts and populate reactions
export const getUserThoughts = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    // Populate reactions for each thought
    const thoughts = await Thought.find({ userId }).populate('reactions');
    if (!thoughts || thoughts.length === 0) {
      return res.status(404).json({ error: 'No thoughts found for this user.' });
    }
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thoughts.' });
  }
};

// Add a reaction to a thought and associate it with the thought
export const addThoughtReaction = async (req: Request, res: Response) => {
  const thoughtId = req.params.thoughtId;
  const { reactionType, userId } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }

    // Create a new reaction and associate it with the thought
    const reaction = new Reaction({
      thoughtId,
      reactionType,
      userId,
    });

    await reaction.save();
    
    // Cast reaction._id to ObjectId to ensure type compatibility
    thought.reactions.push(reaction._id as Types.ObjectId);
    await thought.save();

    res.status(200).json({ message: 'Reaction added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reaction.' });
  }
};

// Get all thoughts with populated reactions
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().populate('reactions');  // Populate reactions for each thought
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific thought by ID and populate reactions
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');  // Populate reactions
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
    res.status(200).json({ message: 'Thought deleted successfully' });
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

    thought.reactions = thought.reactions.filter((reaction: any) => reaction.toString() !== req.params.reactionId);
    await thought.save();

    res.status(204).send();  // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
