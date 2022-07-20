import { request } from './api';

export const simple_create = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Bill', inputs);

  if (res?.error) return res;
  else {
    // TODO
    return { error: false };
  }
};

export const complex_create = async (inputs: Record<string, any>) => {
  const res = await request('POST', 'Bill', inputs);

  if (res?.error) return res;
  else {
    // TODO
    return { error: false };
  }
};

export const ocr_create = async () => {
  const res = await request('POST', 'Bill');

  if (res?.error) return res;
  else {
    // TODO
    return { error: false };
  }
};
