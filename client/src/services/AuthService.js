import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Use named import for jwtDecode

// Function to check token expiry
const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;  // Get current time in seconds
  return decoded.exp < currentTime;  // Check if the token has expired
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post('/api/users/refresh-token', {}, { withCredentials: true });  // Call refresh token API
    const { accessToken } = response.data;

    // Store the new access token in localStorage
    localStorage.setItem('authToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    return null;
  }
};

// Function to get the access token, refreshing it if necessary
const getAccessToken = async () => {
  let token = localStorage.getItem('authToken');

  if (token && isTokenExpired(token)) {
    // If the token is expired, try to refresh it
    token = await refreshAccessToken();
  }

  return token;
};

// Named AuthService object
const AuthService = { getAccessToken };

export default AuthService;
