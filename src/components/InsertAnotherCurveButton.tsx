// src/components/InsertAnotherCurveButton.tsx
import React from 'react';
import { useStateContext } from '../context/state/useStateContext';
import { UIStates } from '../types/UIStates';

const InsertAnotherCurveButton: React.FC = () => {
  const { setUIState } = useStateContext();

  const handleClick = () => {
    setUIState(UIStates.CHOOSING_CURVE);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
    >
      Inserisci un'altra curva
    </button>
  );
};

export default InsertAnotherCurveButton;
