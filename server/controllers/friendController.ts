import { Request, Response } from 'express';
import Friend from '../src/models/Friend.ts';

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await Friend.find().populate('friends thoughts');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    
    const user = await Friend.findOne({ userId: req.params.id }).populate('friends thoughts');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err: unknown) {
    return res.status(500).json({ message: 'Error fetching user', error: err instanceof Error ? err.message : 'Unknown error' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, content } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const user = await Friend.create({
      userId,
      friends: [], // Initialize friends as an empty array
    });

    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: 'Error creating user', error: err });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Use userId for updating instead of _id
    const user = await Friend.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: 'Error updating user', error: err });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Use userId for deleting instead of _id
    const user = await Friend.findOneAndDelete({ userId: req.params.id });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

export const addFriend = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Use userId for adding friend instead of _id
    const user = await Friend.findOneAndUpdate(
      { userId: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error adding friend', error: err });
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Use userId for removing friend instead of _id
    const user = await Friend.findOneAndUpdate(
      { userId: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error removing friend', error: err });
  }
};
