import { request } from './api';

/* Refactor login & signup to the same function? */
export const simple_create = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Bill', inputs);

  if (res?.error) return res;
  else {
    localStorage.setItem('token', res?.token);
    return { error: false };
  }
};

export const complex_create = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Bill', inputs);

  if (res?.error) return res;
  else {
    localStorage.setItem('token', res?.token);
    return { error: false };
  }
};

export const ocr_create = async () => {
  const res = await request('POST', 'Account/logout');

  if (res?.error) return res;
  else {
    localStorage.removeItem('token');
    return { error: false };
  }
};
