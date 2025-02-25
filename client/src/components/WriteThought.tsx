import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';  // Ensure the user is authenticated
import { useNavigate } from 'react-router-dom';

const WriteThought = () => {
  const { user } = useAuth();  // Get the current user from context
  const [thought, setThought] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleThoughtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThought(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!thought.trim()) {
      setError('Thought cannot be empty.');
      return;
    }

    if (!user) {
      setError('You need to be logged in to share a thought.');
      return;
    }

    try {
      // Send the new thought to the backend (replace with API call)
      const response = await fetch('/api/thoughts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,  // Assuming user.id exists
          thought,
        }),
      });

      if (response.ok) {
        setError('');
        setThought('');
        navigate('/thoughts');  // Redirect to the thoughts page or a confirmation page
      } else {
        setError('Failed to save your thought.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Share Your Thought</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={thought}
          onChange={handleThoughtChange}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post Thought</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WriteThought;
