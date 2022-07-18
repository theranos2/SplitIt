import { request } from './api';

/* Refactor login & signup to the same function? */
export const signup = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Account/register', inputs);

  if (res?.status) {
    return { error: true, msg: res.title };
  } else {
    localStorage.setItem('token', res?.token);
    return { error: false };
  }
};

export const login = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Account/login', inputs);

  if (res?.status) {
    return { error: true, msg: res.title };
  } else {
    localStorage.setItem('token', res?.token);
    return { error: false };
  }
};

export const logout = async () => {
  const res = await request('POST', 'Account/logout');

  if (res?.status) {
    return { error: true, msg: res.title };
  } else {
    localStorage.setItem('token', res?.token);
    return { error: false };
  }
};
