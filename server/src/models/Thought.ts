import mongoose, { Schema } from 'mongoose';

const thoughtSchema = new mongoose.Schema({
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'Friend',  // Correct reference to 'Friend'
    required: true
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reaction',  // Correct reference to 'Reaction'
    },
  ],
});

const Thought = mongoose.model('Thought', thoughtSchema);

export default Thought;

