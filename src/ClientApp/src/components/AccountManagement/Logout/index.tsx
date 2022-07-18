import React from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from 'utility/Context';

const Logout = () => {
  const context = React.useContext(Context);
  context?.logIn(false);
  localStorage.remoteItem('token');

  return <Navigate to="/" replace />;
};

export default Logout;
