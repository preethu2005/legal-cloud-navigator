
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
  requiredRole?: string;
  userRole?: string | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  isAuthenticated, 
  redirectPath = "/login",
  requiredRole,
  userRole
}) => {
  // First check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // Then check if a specific role is required and if the user has that role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to dashboard or another appropriate page if the role doesn't match
    return <Navigate to="/dashboard" replace />;
  }
  
  // User is authenticated and has the required role (or no specific role is required)
  return <Outlet />;
};

export default PrivateRoute;
