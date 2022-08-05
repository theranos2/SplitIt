import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextProps } from './props';

export const Context = React.createContext<ContextProps | null>(null);

export const Provider: React.FC<any> = ({ children }): React.ReactElement => {
  const [loggedIn, logIn] = React.useState(window.localStorage.getItem('token') !== null);
  const history = useNavigate();

  const states = {
    history: history,
    logIn: logIn,
    loggedIn: loggedIn
  };

  return <Context.Provider value={states}>{children}</Context.Provider>;
};
