import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  friends: { type: [String], required: true },
});

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;


