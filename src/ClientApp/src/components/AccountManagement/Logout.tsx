import { useAuthContext } from 'utility/hooks/useAuth';

export const Logout = () => {
  window.localStorage.removeItem('token');
  const { setToken } = useAuthContext();
  setToken('');
  return <></>;
};
