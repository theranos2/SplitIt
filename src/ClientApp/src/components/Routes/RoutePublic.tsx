import React from 'react';
import { Route } from 'react-router-dom';
import { token } from 'utility/config';
import Redirect from './Redirect';

interface RoutePublicProps {
  path: string;
  element: React.ReactNode;
  restricted?: boolean;
}

const RoutePublic = (props: RoutePublicProps) => {
  return token !== '' && props.restricted ? (
    <Redirect path={props.path} to="/" />
  ) : (
    <Route path={props.path} element={props.element} />
  );
};

export default RoutePublic;
