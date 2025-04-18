import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { ROUTES } from '../constants/routes';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'dean' | 'coordinator' | 'hod'>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.FACULTY_LOGIN} />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return <>{children}</>;
};