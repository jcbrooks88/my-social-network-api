import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { getFriends, createFriend } from '../api/friendApi';
import { Container, ListGroup, Form, Button, Alert } from 'react-bootstrap';

const FriendsList = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      getFriends()
        .then((data) => {
          if (Array.isArray(data)) {
            setFriends(data.map(user => user.userId));
          } else {
            setFriends([]);
          }
        })
        .catch(() => setError('Failed to load friends.'));
    }
  }, [user]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddFriend = async (friendUsername: string) => {
    if (!user) {
      setError('You need to be logged in to add friends.');
      return;
    }

    try {
      const friendData = {
        userId: user.id,
        friends: [friendUsername],
      };
      const data = await createFriend(friendData);

      if (data) {
        setFriends([...friends, friendUsername]);
        setError('');
      } else {
        setError('Failed to add friend.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/users/search?query=${searchQuery}`);
      const data = await response.json();

      if (data.users) {
        setSearchResults(data.users);
      } else {
        setSearchResults([]);
      }
    } catch {
      setError('Search failed. Please try again.');
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <Container className="mt-4">
      <h2>Your Friends</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup className="mb-3">
        {friends.length > 0 ? (
          friends.map((friend) => <ListGroup.Item key={friend}>{friend}</ListGroup.Item>)
        ) : (
          <Alert variant="info">No friends added yet.</Alert>
        )}
      </ListGroup>

      <h3>Search for Friends</h3>
      <Form className="mb-3">
        <Form.Control
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for users"
        />
        <Button onClick={handleSearch} className="mt-2">
          Search
        </Button>
      </Form>

      <h3>Search Results</h3>
      <ListGroup>
        {searchResults.map((result) => (
          <ListGroup.Item key={result} className="d-flex justify-content-between">
            {result}
            <Button variant="success" size="sm" onClick={() => handleAddFriend(result)}>
              Add Friend
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default FriendsList;
