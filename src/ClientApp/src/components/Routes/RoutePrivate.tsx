import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from 'utility/hooks/useAuth';

const RoutePrivate: React.FC<any> = ({ children }): React.ReactElement => {
  const { token } = useAuthContext();
  return token === '' ? <Navigate to="/login" replace /> : children ?? <Outlet />;
};

export default RoutePrivate;
