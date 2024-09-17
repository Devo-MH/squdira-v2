import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Import jwt-decode correctly

// Check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);  // Decode the JWT token
    const currentTime = Date.now() / 1000;  // Get current time in seconds
    console.log('Token expires at:', decoded.exp, 'Current time:', currentTime);
    return decoded.exp < currentTime;  // Return true if the token is expired
  } catch (error) {
    console.error('Error decoding token:', error);  // Log decoding errors
    return true;  // Assume the token is expired if decoding fails
  }
};

// Refresh the access token if it has expired
const refreshAccessToken = async () => {
  try {
    const response = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true });  // Request new token
    const { accessToken } = response.data;
    localStorage.setItem('authToken', accessToken);  // Store the new access token
    console.log('Refreshed Token:', accessToken);  // Log the refreshed token
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);  // Log error
    localStorage.removeItem('authToken');  // Remove the old token if refresh fails
    // Optional: Handle redirection to login page
    // window.location.href = '/wallet-connect';  // Redirect to login page after token failure
    return null;
  }
};

// Retrieve the access token from localStorage and refresh if necessary
const getAccessToken = async () => {
  let token = localStorage.getItem('authToken');
  console.log('Retrieved Token from localStorage:', token);  // Log the token retrieved from localStorage

  // If the token exists and is expired, refresh it
  if (token && isTokenExpired(token)) {
    console.log('Token expired, refreshing...');
    token = await refreshAccessToken();
  }

  return token;  // Return the token, either refreshed or original
};

const AuthService = { getAccessToken };  // Export the service

export default AuthService;
