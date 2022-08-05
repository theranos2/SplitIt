import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from 'utility/hooks/useAuth';

const RouteProtected: React.FC<any> = ({ children }): React.ReactElement => {
  const { token } = useAuthContext();
  return token !== '' ? <Navigate to="/" replace /> : children ?? <Outlet />;
};

export default RouteProtected;
