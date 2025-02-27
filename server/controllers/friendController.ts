import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Friend from '../src/models/Friend';

// Get all users with populated friends and thoughts
export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    // Populate both 'friends' and 'thoughts' with appropriate fields
    const users = await Friend.find().populate('friends', 'userId').populate('thoughts');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Get a single user by their userId and populate their friends and thoughts
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Populate 'friends' and 'thoughts' for the specific user
    const user = await Friend.findOne({ userId: req.params.id })
      .populate('friends', 'userId')  // Populate with friend details (e.g., userId)
      .populate('thoughts');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err: unknown) {
    return res.status(500).json({ message: 'Error fetching user', error: err instanceof Error ? err.message : 'Unknown error' });
  }
};

// Create a new user with empty friends and thoughts arrays
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const user = await Friend.create({
      userId,
      friends: [],  // Initialize friends as an empty array
      thoughts: [], // Initialize thoughts as an empty array
    });

    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: 'Error creating user', error: err });
  }
};

// Update a user's information by their userId
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

// Delete a user by their userId
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

// Remove a friend from a user's friends list
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

// Get a user's friends and populate their friend details
export const getFriends = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    // Find user and populate their friends field with friend details
    const user = await Friend.findOne({ userId }).populate('friends', 'userId username');  // Add any additional fields you need
    if (!user) {
      return res.status(404).json({ error: 'User not found or no friends available.' });
    }
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friends.' });
  }
};

// Add a friend to a user's friends list
export const addFriend = async (req: Request, res: Response) => {
  try {
    // Assuming user is added to req via authentication middleware
    const userId = (req as any).user._id;  // TypeScript is forced to accept 'user' property here
    
    const friend = await Friend.findById(req.body.friendId);

    if (!friend) {
      return res.status(404).json({ error: 'Friend not found.' });
    }

    const user = await Friend.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Cast friend._id to ObjectId explicitly
    const friendId = new mongoose.Types.ObjectId(friend._id as mongoose.Types.ObjectId);

    if (!user.friends.includes(friendId.toString())) {
      user.friends.push(friendId.toString());
      await user.save();

      return res.status(200).json({ message: 'Friend added successfully.' });
    } else {
      return res.status(400).json({ error: 'Friend is already added.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add friend.' });
  }
};
