import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';  
import { useNavigate } from 'react-router-dom';
import '../assets/writeThought.css';  // Import the CSS file

const WriteThought = () => {
  const { user } = useAuth();
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
      const response = await fetch('/api/thoughts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          content: thought, // Ensure the correct field name for the backend
        }),
      });

      if (response.ok) {
        setError('');
        setThought('');
        navigate('/thoughts');  
      } else {
        setError('Failed to save your thought.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="write-thought-container">
      <div className="thought-user-info">
        <div className="thought-avatar"></div> 
        <h3>{user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Guest'}</h3>
      </div>
      <form onSubmit={handleSubmit} className="thought-form">
        <textarea
          className="thought-input"
          value={thought}
          onChange={handleThoughtChange}
          placeholder="What's on your mind?"
        />
        <button 
          type="submit" 
          className="thought-submit" 
          disabled={!thought.trim()}
        >
          Post
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default WriteThought;
