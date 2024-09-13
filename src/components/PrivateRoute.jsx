// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const role = useSelector((state) => state.user.role);

  console.log("Current role ", role)

  if (!role) {
    return <Navigate to="/login" />;
  }
  
  return element
}

export default PrivateRoute;
