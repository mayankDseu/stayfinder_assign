// RoleProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

   
  
  if (!token) {
    console.log("No token found. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    console.log("Unauthorized role. Redirecting to home...");
    return <Navigate to="/" replace />;
  }

  return children;
};


export default RoleProtectedRoute;
