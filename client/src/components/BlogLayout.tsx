import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import '../assets/blogLayout.css';

const BlogLayout = () => {
  const { user } = useAuth(); 
  const [thoughts, setThoughts] = useState<any[]>([]); 
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user) {
      fetch(`/api/thoughts?userId=${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch thoughts');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setThoughts(data);
          } else {
            setError('Invalid response format');
          }
        })
        .catch((error) => {
          setError(error.message);
          console.error('Error loading thoughts:', error);
        });
    }
  }, [user]);

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
      </main>
      <footer className="footer">&copy; 2025 Quirky Blog</footer>
    </div>
  );
};

export default BlogLayout;
