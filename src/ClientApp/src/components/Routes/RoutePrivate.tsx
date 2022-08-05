import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Context } from 'utility/Context';

const RoutePrivate: React.FC<any> = ({ children }): React.ReactElement => {
  const context = React.useContext(Context);
  return !context?.loggedIn ? <Navigate to="/login" replace /> : children ?? <Outlet />;
};

export default RoutePrivate;
