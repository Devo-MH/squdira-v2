// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const login = (token) => {
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', null, {
        withCredentials: true,
      });
      setAccessToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Refresh the access token
  const refreshToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh-token', null, {
        withCredentials: true,
      });
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      setIsAuthenticated(true);
      return newAccessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
      return null;
    }
  };

  // Axios instance with interceptor
  const axiosPrivate = axios.create();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!accessToken) {
          const newToken = await refreshToken();
          if (newToken) {
            config.headers.Authorization = `Bearer ${newToken}`;
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, accessToken, axiosPrivate }}
    >
      {children}
    </AuthContext.Provider>
  );
};
