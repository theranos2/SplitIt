import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { token } from 'utility/config';

interface RoutePrivateProps {
  path: string;
  element: React.ReactNode;
}

const RoutePrivate = (props: RoutePrivateProps) => {
  const { path, element } = props;
  return <>{token === '' ? <Route path={path} element={element} /> : <Navigate to="/login" />}</>;
};

RoutePrivate.propTypes = { path: PropTypes.string, component: PropTypes.any };

export default RoutePrivate;
