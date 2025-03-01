import React, { useState } from 'react';
import { createFriend } from '../api/friendApi';
import { useAuth } from '../context/useAuth';

const CreateFriendForm: React.FC = () => {
    const { user } = useAuth();  // Get the logged-in user from context
    const [friendUsername, setFriendUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('You need to be logged in to add a friend.');
            return;
        }

        try {
            // Create friend with the logged-in user ID and the new friend's username
            const friendData = {
                userId: user.id,
                friends: [friendUsername],
            };
            const newFriend = await createFriend(friendData);
            console.log('Friend created:', newFriend);
            setFriendUsername('');  // Clear the input after successful submission
        } catch (err) {
            setError('Failed to create friend');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Friend Username</label>
                <input
                    type="text"
                    value={friendUsername}
                    onChange={(e) => setFriendUsername(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Friend</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateFriendForm;
