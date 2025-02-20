import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

// Reaction schema definition
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Default to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Ensure body length is within 280 characters
    },
    username: {
      type: String,
      required: true, // Username must be provided
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set default to the current timestamp
      get: (timestamp: number): string => new Date(timestamp).toLocaleString(), // Format date
    },
  },
  {
    toJSON: {
      getters: true, // Apply getters to the JSON output
    },
    id: false, // Don't include the virtual 'id' in the JSON output
  }
);

// Thought schema definition
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1, // Ensure text is not empty
      maxlength: 280, // Ensure text length is within 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current timestamp
      get: (timestamp: number): string => new Date(timestamp).toLocaleString(), // Format date
    },
    username: {
      type: String,
      required: true, // Username must be provided
    },
    reactions: [reactionSchema], // Reactions associated with this thought
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties in the JSON output
      getters: true, // Apply getters to the JSON output
    },
    id: false, // Don't include the virtual 'id' in the JSON output
  }
);

// Virtual field to calculate the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Return the number of reactions for this thought
});

// Create and export the Thought model
const Thought = model('Thought', thoughtSchema);

export default Thought;
