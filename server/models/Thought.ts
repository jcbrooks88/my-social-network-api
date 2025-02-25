import mongoose, { Schema } from 'mongoose';

const thoughtSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reactions: [

    {

      type: Schema.Types.ObjectId,

      ref: 'Reaction',

    },

  ],
});

const Thought = mongoose.model('Thought', thoughtSchema);

export default Thought;

