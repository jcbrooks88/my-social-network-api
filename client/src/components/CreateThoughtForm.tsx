import React, { useState } from 'react';
import { createThought } from '../api/thoughtApi';
import { useAuth } from '../context/useAuth';

const CreateThoughtForm: React.FC = () => {
    const { user } = useAuth();  // Get the user object from context
    const [thoughtText, setThoughtText] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('You need to be logged in to create a thought.');
            return;
        }

        try {
            const newThought = await createThought({ thoughtText: thoughtText, userId: user.id });
            console.log('Thought created:', newThought);
            setThoughtText('');  // Clear the input after successful submission
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
            <button type="submit">Create Thought</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateThoughtForm;
