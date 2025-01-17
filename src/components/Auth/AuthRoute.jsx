import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // Optional: Check for specific role if needed
  const userData = JSON.parse(loggedInUser);
  if (!userData.role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;