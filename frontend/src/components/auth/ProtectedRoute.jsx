import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// children prop can be used if not using <Outlet /> for nested routes
// For this setup, <Outlet /> is more idiomatic if ProtectedRoute wraps layout routes
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Optional: Show a loading spinner or placeholder while auth state is being determined,
  // especially if there's an async check on initial load (our AuthContext does a quick localStorage check).
  // if (loading) {
  //   return <div>Loading authentication status...</div>;
  // }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />; // Render children or Outlet for nested routes
}

export default ProtectedRoute;
