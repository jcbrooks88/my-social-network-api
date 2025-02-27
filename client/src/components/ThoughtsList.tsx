import React, { useEffect, useState } from 'react';
import { getThoughts } from '../api/thoughtApi';

const ThoughtsList: React.FC = () => {
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
            } catch (err) {
                setError('Failed to fetch thoughts.');
                console.error('Error fetching thoughts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchThoughts();
    }, []);

    return (
        <div>
            <h1>Thoughts</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading thoughts...</p>
            ) : thoughts.length > 0 ? (
                <ul>
                    {thoughts.map((thought) => (
                        <li key={thought._id}>
                            <strong>User ID: {thought.userId}</strong>: {thought.content}
                            <p className="timestamp">{new Date(thought.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No thoughts available.</p>
            )}
        </div>
    );
};

export default ThoughtsList;
