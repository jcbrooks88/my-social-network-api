const API_URL = "http://localhost:3001/api"; // Adjust this if needed

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};
