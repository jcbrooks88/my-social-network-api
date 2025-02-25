import React, { useState } from 'react';
import { createUser } from '../api/userApi';

const CreateUserForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newUser = await createUser({ username, email });
            console.log('User created:', newUser);
        } catch (err) {
            setError('Failed to create user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create User</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateUserForm;
