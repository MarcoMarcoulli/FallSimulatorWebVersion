// src/components/CancelInputButton.tsx
import React from 'react';
import { useInput } from '../context/InputContext';
import { useStateContext } from '../context/StateContext';
import { UIStates } from '../types/UIStates';
import { clearSimulations } from '../logic/simulation/Simulations';

const CancelInputButton: React.FC = () => {
  const { clearInput } = useInput();
  const { setUIState } = useStateContext();

  const handleClick = () => {
    // Pulisci gli input nel context
    clearInput();
    // Imposta lo stato dell'interfaccia a CHOOSING_GRAVITY
    setUIState(UIStates.CHOOSING_GRAVITY);
    clearSimulations();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded"
    >
      Cancella Input
    </button>
  );
};

export default CancelInputButton;
