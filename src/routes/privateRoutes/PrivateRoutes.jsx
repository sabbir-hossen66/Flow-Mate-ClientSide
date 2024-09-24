import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
 // Assuming you have a state called `isAuthenticated` in your Redux store
 const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

 // If not authenticated, redirect to the login page
 if (!isAuthenticated) {
   return <Navigate to="/login" />;
 }

 // If authenticated, render the children components
 return children;
};

export default PrivateRoutes;