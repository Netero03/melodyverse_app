import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  token: null,
  setToken: (token) => {},
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Check local storage initially

  useEffect(() => {
    // Handle token expiration or refresh logic here
  }, [token]);

  const isAuthenticated = !!token; // Check for token existence

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };