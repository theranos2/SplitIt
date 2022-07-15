import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { token } from 'utility/config';

const RouteProtected: React.FC<any> = ({ children }): React.ReactElement =>
  token !== '' ? <Navigate to="/" replace /> : children ?? <Outlet />;

export default RouteProtected;
