import { useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const HistoryContext = createContext(useNavigate());
export const useHistoryContext = useContext(HistoryContext);
