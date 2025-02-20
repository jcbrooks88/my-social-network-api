import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const getThoughts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
    return res.json(thought);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateThought = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    return res.json(thought);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    return res.json({ message: 'Thought deleted' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeReaction = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};
