import { Schema, model } from 'mongoose';

// Purpose: User model for the application. 
// This model will be used to create the User collection in the database. 
// The User collection will store the username, email, thoughts, and friends of the user. 
// The User model will also have a virtual to get the friend count of the user.

// ** Define the User Schema:
const userSchema = new Schema(
  {
    username: { 
      type: String,
      unique: true, // No two users can have the same username.
      required: true, // Must be provided when creating a user.
      trim: true, // Removes extra spaces from the start and end.
      minlength: [3, 'Username must be at least 3 characters long'], // Optional: Set a minimum length for username
      maxlength: [20, 'Username cannot exceed 20 characters'] // Optional: Set a maximum length for username
    },
    email: { // The email field must be a string and must match the format of an email address.
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'] 
    },
    thoughts: [ // An array of ObjectId values referencing the Thought model.
      {
        type: Schema.Types.ObjectId, // The type is an ObjectId. Each ObjectId references a Thought document in the database.
        ref: 'Thought' // The ref property links the ObjectId to the Thought model. This allows the User model to retrieve the thoughts of the user.
      }
    ],
    friends: [ // An array of ObjectId values referencing the User model (self-reference).
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { // The toJSON option will allow the virtuals to be included when data is requested.
      virtuals: true
    },
    id: false,
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// ** Virtual to get friend count
userSchema.virtual('friendCount').get(function () { 
  return this.friends.length;
});

const User = model('User', userSchema); // The User model is created using the userSchema.

export default User;

