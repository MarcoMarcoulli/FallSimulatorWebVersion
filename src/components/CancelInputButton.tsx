// src/components/CancelInputButton.tsx
import React from 'react';
import { useInput } from '../context/InputContext';
import { useStateContext } from '../context/StateContext';
import { UIStates } from '../types/UIStates';

interface CancelInputButtonProps {
  onClearCanvas: () => void;
}

const CancelInputButton: React.FC<CancelInputButtonProps> = ({ onClearCanvas }) => {
  const { clearInput } = useInput();
  const { setUIState } = useStateContext();

  const handleClick = () => {
    // Pulisci gli input nel context
    clearInput();
    // Imposta lo stato dell'interfaccia a CHOOSING_GRAVITY
    setUIState(UIStates.CHOOSING_GRAVITY);
    // Chiama la callback per pulire il canvas
    onClearCanvas();
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
