const BASE_URL = 'http://localhost:3001/api/friends';

// Fetch all friends (users)
export const getFriends = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Error fetching friends');
        }
        const data = await response.json();

        // Ensure that the response is an array and extract friends from each object
        if (Array.isArray(data)) {
            // Extracting 'friends' arrays from each user object
            const friends = data.map(item => item.friends).flat();
            return friends;  // This returns a flattened array of all friends
        } else {
            throw new Error('Invalid response format: expected an array');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Create a new friend
export const createFriend = async (friendData: { userId: string; friends: string[] }) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(friendData),
        });

        if (!response.ok) {
            throw new Error('Error creating friend');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
