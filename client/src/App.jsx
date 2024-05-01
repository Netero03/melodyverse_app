import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode'; // For decoding JWT tokens

import Signup from './components/Signup';
import Login from './components/Login';
import PostList from './components/PostList';
import PrivateRoute from './components/PrivateRoute'; // Component for protected routes

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing JWT token in local storage
    const token = localStorage.getItem('melodyverse-token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp > Date.now() / 1000) { // Check if token is not expired
        setIsLoggedIn(true);
        setUser(decodedToken);
      } else {
        localStorage.removeItem('melodyverse-token'); // Remove expired token
      }
    }
  }, []);

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('/api/users/login', data);
      localStorage.setItem('melodyverse-token', response.data.token);
      setIsLoggedIn(true);
      setUser(jwt_decode(response.data.token));
    } catch (err) {
      console.error(err);
      // Handle login errors (display error message)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('melodyverse-token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (

    <Routes>
      <Route
        path="/signup"
        element={!isLoggedIn ? <Signup /> : <Navigate replace to="/posts" />}
      />
      <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/posts" />} />
      <Route
        path="/posts"
        element={<PostList user={user} />}/>
    </Routes>

  );
};

export default App;
