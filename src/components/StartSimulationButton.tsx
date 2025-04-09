// src/components/StartSimulationButton.tsx
import React from 'react';
import { useStateContext } from '../context/StateContext';
import { UIStates } from '../types/UIStates';
import { clearArrivalMessages } from '../logic/simulation/ArrivalMessages';

const StartSimulationButton: React.FC = () => {
  const { setUIState } = useStateContext();

  const handleClick = () => {
    // 1. Pulisci i messaggi di arrivo precedenti (opzionale)
    clearArrivalMessages();

    // 2. Passa allo stato di simulazione
    setUIState(UIStates.SIMULATING);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Avvia simulazione
    </button>
  );
};

export default StartSimulationButton;
