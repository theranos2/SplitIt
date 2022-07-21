export const port = 5001;

export let token = '';

export const set_token = (newToken: string) => {
  token = newToken;
  window.localStorage.setItem('token', newToken);
  return {};
};
