import { useContext } from 'react';
import { InputContext } from './InputContext';

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInput deve essere usato all'interno di un InputProvider.");
  }
  return context;
};
