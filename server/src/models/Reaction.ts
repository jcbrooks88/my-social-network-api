import { Schema, model, Document } from 'mongoose';

// Define the Reaction schema
interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, // You can adjust this as per your app's needs (e.g., similar to Twitter's tweet length)
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Reaction model
const Reaction = model<IReaction>('Reaction', reactionSchema);

export default Reaction;
