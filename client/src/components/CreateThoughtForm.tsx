import React, { useState } from 'react';
import { createThought } from '../api/thoughtApi';

const CreateThoughtForm: React.FC = () => {
    const [thoughtText, setThoughtText] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newThought = await createThought({ thoughtText, username });
            console.log('Thought created:', newThought);
        } catch (err) {
            setError('Failed to create thought');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Thought</label>
                <input
                    type="text"
                    value={thoughtText}
                    onChange={(e) => setThoughtText(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Thought</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateThoughtForm;
