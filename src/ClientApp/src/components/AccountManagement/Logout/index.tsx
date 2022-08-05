import { useEffect } from 'react';
import { useAuthContext } from 'utility/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { AccountApi } from 'api';

export const Logout = () => {
  useEffect(() => {
    (async () => await new AccountApi().apiAccountLogoutPost())();
    useAuthContext().setToken('');
  }, []);

  return <Navigate to="/" replace />;
};
