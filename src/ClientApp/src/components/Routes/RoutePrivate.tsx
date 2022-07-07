import React from 'react';
import { Route } from 'react-router-dom';
import { token } from 'utility/config';
import Redirect from './Redirect';

interface RoutePrivateProps {
  path: string;
  element: React.ReactNode;
}

const RoutePrivate = (props: RoutePrivateProps) => {
  return token === '' ? (
    <Redirect path={props.path} to="/login" />
  ) : (
    <Route path={props.path} element={props.element} />
  );
};

export default RoutePrivate;
