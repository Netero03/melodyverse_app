import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }

  return children; // Render child component if logged in
};

export default PrivateRoute;