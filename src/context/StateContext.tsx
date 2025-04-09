// context/StateContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { UIStates } from '../types/UIStates';

interface StateContextTypes {
  UIState: UIStates;
  setUIState: (state: UIStates) => void;
}

export const StateContext = createContext<StateContextTypes | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [UIState, setUIState] = useState<UIStates>(UIStates.CHOOSING_GRAVITY);

  return <StateContext.Provider value={{ UIState, setUIState }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
