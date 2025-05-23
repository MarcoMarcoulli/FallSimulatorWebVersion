// src/components/StartSimulationButton.tsx
import React from 'react';
import { useStateContext } from '../../context/state/useStateContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { UIStates } from '../../types/UIStates';

const StartSimulationButton: React.FC = () => {
  const { setUIState } = useStateContext();
  const { simulations, clearMessages } = useSimulationContext();
  const { animationRef } = useCanvasContext();

  const handleClick = () => {
    clearMessages();
    setUIState(UIStates.SIMULATING);

    simulations.forEach((sim) => {
      if (!animationRef!.current) return;
      sim.startAnimation(animationRef!.current);
    });
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
