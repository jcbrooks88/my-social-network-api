import React, { useEffect, useState } from 'react';
import { getThoughts } from '../api/thoughtApi';
import { ListGroup, Spinner, Alert } from 'react-bootstrap'; // Bootstrap imports

const ThoughtList: React.FC = () => {
  const [thoughts, setThoughts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        setLoading(true);
        const thoughtsData = await getThoughts();
        
        if (Array.isArray(thoughtsData)) {
          setThoughts(
            thoughtsData.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          );
        } else {
          throw new Error('Invalid data format received.');
        }
      } catch {
        setError('Failed to fetch thoughts.');
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Previous Thoughts</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : thoughts.length > 0 ? (
        <ListGroup>
          {thoughts.map((thought) => (
            <ListGroup.Item key={thought._id} className="border-0 shadow-sm mb-3">
              <div className="d-flex justify-content-between">
                <strong>{thought.username}</strong>
                <small className="text-muted">{new Date(thought.createdAt).toLocaleString()}</small>
              </div>
              <p>{thought.content}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info">No thoughts available.</Alert>
      )}
    </div>
  );
};

export default ThoughtList;
