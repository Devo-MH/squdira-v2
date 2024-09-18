// src/services/AuthService.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true });
    const { accessToken } = response.data;
    localStorage.setItem('authToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    localStorage.removeItem('authToken');
    return null;
  }
};

const getAccessToken = async () => {
  let token = localStorage.getItem('authToken');

  if (token && isTokenExpired(token)) {
    token = await refreshAccessToken();
  }

  return token;
};

const AuthService = { getAccessToken };

export default AuthService;
