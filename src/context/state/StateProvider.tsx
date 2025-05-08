import React, { useState } from 'react';
import { StateContext } from './StateContext';
import { UIStates } from '../../types/UIStates';

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [UIState, setUIState] = useState<UIStates>(UIStates.CHOOSING_GRAVITY);

  return (
    <StateContext.Provider value={{ UIState, setUIState }}> {children} </StateContext.Provider>
  );
};
