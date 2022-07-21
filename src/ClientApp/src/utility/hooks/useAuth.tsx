import { createContext, useContext } from 'react';

export type AuthContextProps = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};
export const AuthContext = createContext<AuthContextProps | null>(null);
export const useAuthContext = () => useContext(AuthContext) as AuthContextProps;
