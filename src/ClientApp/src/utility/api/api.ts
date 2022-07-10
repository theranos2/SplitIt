import { port, token } from '../config';

interface RequestType {
  (method: string, path: string, data?: any): Promise<Record<string, any> | void>;
}

export const request: RequestType = (method, path, data = '') =>
  fetch(`https://localhost:${port}/api/${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Token: token
    },
    body: data === '' ? null : JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((err) => console.warn(`API ERROR @ [${method}] ${path}: ${err.message}`));
