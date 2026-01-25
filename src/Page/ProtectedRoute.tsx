// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      // No token or user data - not logged in
      if (!token || !userStr) {
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }

      try {
        const user = JSON.parse(userStr);
        
        // Check if user has allowed role
        if (user.role && allowedRoles.includes(user.role)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthorized(false);
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [allowedRoles]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Not authorized - redirect to login
  if (!isAuthorized) {
    return <Navigate to="/auth" replace />;
  }

  // Authorized - render children
  return <>{children}</>;
};

export default ProtectedRoute;