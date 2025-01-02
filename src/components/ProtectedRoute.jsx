import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuthState();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;
  if (!allowedRoles.includes(role))
    return <Navigate to={`/${role}-dashboard`} />;

  return children;
};

export default ProtectedRoute;
