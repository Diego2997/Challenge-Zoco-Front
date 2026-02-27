import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({ children, isLogged }) => {

  const path = localStorage.getItem('lastRoute') || '/profile'; 

  return (!isLogged)
    ? children
    : <Navigate to={path} />
}
