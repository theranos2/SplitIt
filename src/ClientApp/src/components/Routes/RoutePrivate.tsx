import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { token } from 'utility/config';

const RoutePrivate: React.FC<any> = ({ children }): React.ReactElement =>
  token === '' ? <Navigate to="/login" replace /> : children ?? <Outlet />;

export default RoutePrivate;
