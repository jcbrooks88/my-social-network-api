import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';  
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';  // Bootstrap imports

const WriteThought: React.FC = () => {
  const { user } = useAuth();
  const [thought, setThought] = useState<string>('');
  const [error, setError] = useState<string>('');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          content: thought,
        }),
      });

      if (response.ok) {
        setError('');
        setThought('');
        navigate('/thoughts');  
      } else {
        setError('Failed to save your thought.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <div className="rounded-circle bg-primary" style={{ width: '40px', height: '40px' }}></div>
        <h3 className="ms-3">{user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Guest'}</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="thoughtInput" className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={thought}
            onChange={handleThoughtChange}
            placeholder="What's on your mind?"
            className="border-0 shadow-sm"
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={!thought.trim()} className="w-100">
          Post
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </div>
  );
};

export default WriteThought;
