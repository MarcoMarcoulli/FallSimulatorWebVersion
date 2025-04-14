import { createContext } from 'react';
import { UIStates } from '../../types/UIStates';

export interface StateContextTypes {
  UIState: UIStates;
  setUIState: (state: UIStates) => void;
}

export const StateContext = createContext<StateContextTypes | undefined>(undefined);
