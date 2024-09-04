import axios from 'axios';
import { getToken } from './AuthService';

export const getUserData = async () => {
  try {
    const token = getToken();
    const response = await axios.get('/api/users', {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
