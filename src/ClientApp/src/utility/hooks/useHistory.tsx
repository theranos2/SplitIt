import { useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const historyContext = createContext(useNavigate());
export const useHistoryContext = useContext(historyContext);
