import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { getFriends, createFriend } from '../api/friendApi'; // Import API functions

const FriendsList = () => {
  const { user } = useAuth();  
  const [friends, setFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Fetch user's friends list
  useEffect(() => {
    if (user) {
      getFriends()
        .then((data) => {
          if (Array.isArray(data)) {
            setFriends(data.map(user => user.userId)); // ✅ Extract userId for display
          } else {
            setFriends([]); // ✅ Fallback to empty array
          }
        })
        .catch(() => setError('Failed to load friends.'));
    }
  }, [user]);

  // Handle input change for search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Add friend function
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
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  // Simulating user search based on searchQuery
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]); // Reset if query is empty
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
    } catch (error) {
      setError('Search failed. Please try again.');
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); // Trigger search when searchQuery changes

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li key={friend}>{friend}</li>
          ))
        ) : (
          <p>No friends added yet.</p>
        )}
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
