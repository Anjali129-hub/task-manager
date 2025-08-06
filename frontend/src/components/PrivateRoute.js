// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('access'); // example check

  return isAuthenticated ? children : <Navigate to="/login" />;
}
