import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { createFriend } from '../api/friendApi';
import { useAuth } from '../context/useAuth';

const CreateFriendForm: React.FC = () => {
  const { user } = useAuth();
  const [friendUsername, setFriendUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You need to be logged in to add a friend.');
      return;
    }

    try {
      const friendData = {
        userId: user.id,
        friends: [friendUsername],
      };
      await createFriend(friendData);
      setFriendUsername('');
      setError(null);
    } catch {
      setError('Failed to create friend');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add a Friend</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="friendUsername">
          <Form.Label>Friend Username</Form.Label>
          <Form.Control
            type="text"
            value={friendUsername}
            onChange={(e) => setFriendUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Add Friend
        </Button>
      </Form>
    </Container>
  );
};

export default CreateFriendForm;
