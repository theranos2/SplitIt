import { useAuthContext } from 'utility/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const Logout = () => {
  const { setToken } = useAuthContext();

  setToken('');
  localStorage.removeItem('token');

  return <Navigate to="/" replace />;
};
