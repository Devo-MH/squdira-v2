import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post('/api/auth', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const response = await axios.get('/api/auth', {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  },
};

export default AuthService;
