import { request } from './api';

/* Refactor login & signup to the same function? */
export const signup = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Account/register', inputs);

  console.log(res);

  if (res?.error) return res;
  else {
    localStorage.setItem('token', res?.token);
    return { error: false };
  }
};

export const login = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Account/login', inputs);

  console.log(res);

  if (res?.error) return res;
  else {
    localStorage.setItem('token', res?.token);
    return { error: false };
  }
};

export const logout = async () => {
  const res = await request('POST', 'Account/logout');

  if (res?.error) return res;
  else {
    localStorage.removeItem('token');
    return { error: false };
  }
};
