import { useEffect, useState } from 'react';
import '../assets/thoughtLayout.css';

const ThoughtLayout = () => {

  const [thoughts, setThoughts] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/thoughts'); 
        if (!response.ok) throw new Error('Failed to fetch thoughts');

        const data = await response.json();
        if (Array.isArray(data)) {
          setThoughts(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error: any) {
        setError(error.message);
        console.error('Error loading thoughts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, []); // Removed `user` dependency to fetch all thoughts

  return (
    <div className="layout-container">
      <header className="header">Quirky Blog</header>
      <main className="main-content">
        <div className="blog-post-wrapper">
          <h1 className="post-title">Welcome to the Quirky Blog!</h1>
          <section className="post-content">
            <h2>Thoughts</h2>
            <div className="thoughts-container">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {loading ? (
                <p>Loading thoughts...</p>
              ) : thoughts.length === 0 ? (
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
      </main>
      <footer className="footer">&copy; 2025 Quirky Blog</footer>
    </div>
  );
};

export default ThoughtLayout;
