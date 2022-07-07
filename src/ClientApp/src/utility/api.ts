import { port, token } from './config';

interface RequestTypes {
  (method: string, path: string, data: any): Promise<string>;
}

export const request: RequestTypes = async (method, path, data = '') =>
  await fetch(`http://localhost:${port}/api/${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? 'None'}`
    },
    body: data === '' ? null : JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((err) => console.warn(`API ERROR @ [${method}] ${path}: ${err.message}`));
