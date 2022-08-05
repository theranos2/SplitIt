import { request } from './api';
import { useAuthContext } from 'utility/hooks/useAuth';

/* Refactor login & signup to the same function? */
export const signup = async (inputs: Record<string, any>) => {
  const { setToken } = useAuthContext();
  const res = await request('POST', 'Account/register', inputs);

  if (res?.error) return res;
  else {
    setToken(res?.token);
    return { error: false };
  }
};

export const login = async (inputs: Record<string, any>) => {
  const { setToken } = useAuthContext();
  const res = await request('POST', 'Account/login', inputs);

  if (res?.error) return res;
  else {
    setToken(res?.token);
    return { error: false };
  }
};

export const logout = async () => {
  const { setToken } = useAuthContext();
  const res = await request('POST', 'Account/logout');

  if (res?.error) return res;
  else {
    setToken(res?.token);
    return { error: false };
  }
};
