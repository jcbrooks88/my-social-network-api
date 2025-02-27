import React, { useEffect, useState } from 'react';
import { getThoughts } from '../api/thoughtApi';

const ThoughtsList: React.FC = () => {
    const [thoughts, setThoughts] = useState<any[]>([]); // Array to store thought data
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchThoughts = async () => {
            try {
                const thoughtsData = await getThoughts(); // Fetch thoughts from the API
                if (thoughtsData && Array.isArray(thoughtsData)) {
                    setThoughts(thoughtsData); // Assuming it's an array of thought objects
                } else {
                    setError('Invalid data format received.');
                }
            } catch (err) {
                setError('Failed to fetch thoughts.');
            }
        };

        fetchThoughts();
    }, []);

    return (
        <div>
            <h1>Thoughts</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
            <ul>
                {thoughts.length > 0 ? (
                    thoughts.map((thought) => (
                        <li key={thought._id}> {/* Unique key for each thought */}
                            <strong>User ID: {thought.userId}</strong>: {thought.content}
                        </li>
                    ))
                ) : (
                    <p>No thoughts available.</p> // Placeholder if no thoughts exist
                )}
            </ul>
        </div>
    );
};

export default ThoughtsList;
