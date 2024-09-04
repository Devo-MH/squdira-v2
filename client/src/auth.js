import jwtDecode from 'jwt-decode';

// Function to handle token storage and user state management
export const handleLogin = (token, setUserState) => {
  localStorage.setItem('authToken', token);
  const decodedToken = jwtDecode(token);
  setUserState({ isAuthenticated: true, user: decodedToken });
};

// Function to check for an existing JWT token
export const checkExistingToken = (setUserState) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Token expired
      localStorage.removeItem('authToken');
      setUserState({ isAuthenticated: false, user: null });
    } else {
      setUserState({ isAuthenticated: true, user: decodedToken });
    }
  } else {
    setUserState({ isAuthenticated: false, user: null });
  }
};
