import { Schema, model, Document } from 'mongoose';

interface IFriend extends Document {
  userId: string;
  friends: string[];
  thoughts: Schema.Types.ObjectId[];
}

const friendSchema = new Schema<IFriend>({
  userId: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }],
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
});

const Friend = model<IFriend>('Friend', friendSchema);

export default Friend;
