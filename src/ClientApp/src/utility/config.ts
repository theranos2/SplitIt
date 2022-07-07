export const port = 5001;

export let token = '';

export const set_token = (new_token: string) => {
  token = new_token;
  return {};
};
