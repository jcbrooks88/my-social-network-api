import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import '../assets/blogLayout.css';

const BlogLayout = () => {
  const { user } = useAuth(); // Get user context (this should provide the logged-in user)
  const [thoughts, setThoughts] = useState<any[]>([]); // Store thought submissions
  const [friends, setFriends] = useState<string[]>([]); // Store the list of friends
  const [newFriend, setNewFriend] = useState(''); // New friend input


  useEffect(() => {
    if (user) {
      // Fetch the thoughts from the backend (replace with your actual API endpoint)
      fetch(`/api/thoughts?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => setThoughts(data))
        .catch(() => console.error('Failed to load thoughts'));

      // Fetch the friends list from the backend
      fetch(`/api/friends?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => setFriends(data.friends))
        .catch(() => console.error('Failed to load friends'));
    }
  }, [user]);

  const handleAddFriend = () => {
    if (!newFriend) return;
    // Make an API call to add a new friend
    if (!user) return;
    fetch(`/api/friends/add?userId=${user.id}&friend=${newFriend}`, {
      method: 'POST',
    })
      .then(() => {
        setFriends([...friends, newFriend]); // Update state with the new friend
        setNewFriend(''); // Clear the input field
      })
      .catch(() => console.error('Failed to add friend'));
  };

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="header">
        Quirky Blog
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="blog-post-wrapper">
          {/* Post Title */}
          <h1 className="post-title">Welcome to the Quirky Blog!</h1>

          {/* Post Content */}
          <section className="post-content">
            <h2>Thoughts</h2>
            <div className="thoughts-container">
              {thoughts.length === 0 ? (
                <p>No thoughts yet!</p>
              ) : (
                thoughts
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by date
                  .map((thought) => (
                    <div key={thought._id} className="thought">
                      <p>{thought.content}</p>
                      <p className="timestamp">{new Date(thought.createdAt).toLocaleString()}</p>
                    </div>
                  ))
              )}
            </div>
          </section>
        </div>

        {/* Friends List */}
        <div className="friends-container">
          <h2>Friends List</h2>
          <ul>
            {friends.length === 0 ? (
              <li>No friends yet!</li>
            ) : (
              friends.map((friend, index) => <li key={index}>{friend}</li>)
            )}
          </ul>

          {/* Add Friend */}
          <input
            type="text"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            placeholder="Add a new friend"
          />
          <button onClick={handleAddFriend}>Add Friend</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Quirky Blog
      </footer>
    </div>
  );
};

export default BlogLayout;
