import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find().populate('friends thoughts');
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Find the user by ID and populate the 'friends' and 'thoughts' fields
    const user = await User.findById(req.params.id).populate('friends thoughts');
    
    // If no user is found, return a 404 status with a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user is found, return the user data
    return res.json(user);
  } catch (err: unknown) {
    // Type the error as 'any' or better handle it
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addFriend = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
