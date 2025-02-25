import React, { useEffect, useState } from 'react';
import { getThoughts } from '../api/thoughtApi';

const ThoughtsList: React.FC = () => {
    const [thoughts, setThoughts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchThoughts = async () => {
            try {
                const thoughtsData = await getThoughts();
                setThoughts(thoughtsData);
            } catch (err) {
                setError('Failed to fetch thoughts');
            }
        };

        fetchThoughts();
    }, []);

    return (
        <div>
            <h1>Thoughts</h1>
            {error && <p>{error}</p>}
            <ul>
                {thoughts.map((thought) => (
                    <li key={thought._id}>
                        <strong>{thought.username}</strong>: {thought.thoughtText}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThoughtsList;
