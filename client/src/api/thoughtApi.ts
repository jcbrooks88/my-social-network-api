const BASE_URL = 'http://localhost:3001/api/thoughts';

// Fetch all thoughts
export const getThoughts = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Error fetching thoughts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Create a new thought
export const createThought = async (thoughtData: { thoughtText: string; username: string }) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(thoughtData),
        });

        if (!response.ok) {
            throw new Error('Error creating thought');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
