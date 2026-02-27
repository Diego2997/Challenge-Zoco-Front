import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoutes = ({ children, roles = [] }) => {
  const { isLogged, user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  localStorage.setItem("lastRoute", pathname);

  if (!isLogged) {
    return <Navigate to="/auth/login" />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};