const API_URL = "http://localhost:3001/api"; // Adjust this if needed

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/friends`);
  return response.json();
};

export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/thoughts`);
  return response.json();
};
