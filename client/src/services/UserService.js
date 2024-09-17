import axios from 'axios';
import AuthService from './AuthService';

export const getUserData = async () => {
  try {
    const token = await AuthService.getAccessToken();
    const response = await axios.get('/api/users/user-data', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};
