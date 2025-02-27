const API_URL = "http://localhost:3001/api"; // Adjust this if needed

// Function to fetch users (friends)
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/friends`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Function to fetch posts (thoughts)
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/thoughts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
