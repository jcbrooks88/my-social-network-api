import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';

const FriendsList = () => {
  const { user } = useAuth();  // Now user should be an object with an 'id'
  const [friends, setFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      // Fetch the user's friends list from the backend (replace with actual API call)
      fetch(`/api/users/${user.id}/friends`)
        .then((response) => response.json())
        .then((data) => setFriends(data.friends))
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

    // Send a request to the backend to add a friend (replace with actual API)
    try {
      const response = await fetch(`/api/users/${user.id}/add-friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendUsername }),
      });

      if (response.ok) {
        setFriends([...friends, friendUsername]);
        setError('');
      } else {
        setError('Failed to add friend.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  // Simulating search by querying an API or filtering an array based on searchQuery
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]); // Reset if query is empty
      return;
    }

    try {
      // Assuming there's an endpoint that returns a list of users based on a search query
      const response = await fetch(`/api/users/search?query=${searchQuery}`);
      const data = await response.json();

      if (data.users) {
        setSearchResults(data.users);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setError('Search failed. Please try again.');
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); // Trigger search every time searchQuery changes

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>

      <h3>Add a Friend</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for users"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Search Results</h3>
      <ul>
        {searchResults.map((result) => (
          <li key={result}>
            {result}
            <button onClick={() => handleAddFriend(result)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
