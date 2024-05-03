// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { decodeToken } from './utils/authUtils'; // Import decodeToken function
import Signup from './pages/Signup';
import Login from './pages/Login';
import PostList from './pages/PostList';
import VerifyEmailPage from './pages/VerifyEmailPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for existing JWT token in local storage
    const token = localStorage.getItem('melodyverse-token');
    if (token) {
      const decodedToken = decodeToken(token); // Use decodeToken function
      if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('melodyverse-token');
      }
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('melodyverse-token');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate replace to="/login" />} />
      <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/posts" />} />
      <Route path="/posts" element={isLoggedIn ? <PostList onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/verifyemail" element={<VerifyEmailPage/>} /> 
    </Routes>
  );
};

export default App;
