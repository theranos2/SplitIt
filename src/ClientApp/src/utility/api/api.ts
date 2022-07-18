import { port } from '../config';

interface RequestType {
  (method: string, path: string, data?: any): Promise<Record<string, any> | void>;
}

export const request: RequestType = async (method, path, data = '') => {
  try {
    const result = await fetch(`https://localhost:${port}/api/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        // Token: localStorage.getItem('token') ?? ''
      },
      body: data === '' ? null : JSON.stringify(data)
    });

    return result.status === 200
      ? result.json()
      : { error: true, msg: (await result.json()).Errors[0] };
  } catch (err: any) {
    // unhandled server exception
    console.warn(`API ERROR @ [${method}] ${path}: ${err.message}`);
    return { error: true, msg: 'Internal server error' };
  }
};
