// src/components/CancelInputButton.tsx
import React from 'react';
import { useInputContext } from '../context/input/useInputContext';
import { useStateContext } from '../context/state/useStateContext';
import { UIStates } from '../types/UIStates';
import { useSimulationContext } from '../context/simulation/useSimulationContext';
import { useCanvasContext } from '../context/canvas/useCanvasContext';
import { clearCanvas } from '../logic/utils/CurveVisualizer';

interface CancelInputButtonProps {
  resetButtonsVisibility: () => void;
  resetMasses: () => void;
}

const CancelInputButton: React.FC<CancelInputButtonProps> = ({
  resetButtonsVisibility,
  resetMasses,
}) => {
  const { clearInput } = useInputContext();
  const { setUIState } = useStateContext();
  const { clearSimulations } = useSimulationContext();
  const { ctxRef, animationRef } = useCanvasContext();

  const handleCancelInputClick = () => {
    /* 1. reset logica */
    clearInput();
    clearSimulations();

    if (!ctxRef.current) return;
    /* 2. pulisci canvas curve/punti */
    if (ctxRef) clearCanvas(ctxRef.current);

    if (animationRef!.current) {
      while (animationRef!.current.firstChild) {
        animationRef!.current.removeChild(animationRef!.current.firstChild);
      }
    }

    /* 4. eventuali altre UI */
    resetButtonsVisibility();
    resetMasses();

    /* 5. torna allo stato iniziale */
    setUIState(UIStates.CHOOSING_GRAVITY);
  };

  return (
    <button
      onClick={handleCancelInputClick}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded"
    >
      Cancella Input
    </button>
  );
};

export default CancelInputButton;
