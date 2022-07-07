import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { token } from 'utility/config';

interface RoutePublicProps {
  path: string;
  element: React.ReactNode;
  restricted: boolean;
}

const RoutePrivate = (props: RoutePublicProps) => {
  const { path, element, restricted } = props;
  return (
    <>
      {token !== '' && restricted ? <Navigate to="/" /> : <Route path={path} element={element} />}
    </>
  );
};

export default RoutePrivate;
