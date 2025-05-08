// src/components/CancelInputButton.tsx
import React from 'react';
import { useInputContext } from '../../context/input/useInputContext';
import { useStateContext } from '../../context/state/useStateContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { resetAll } from '../../logic/utils/reset';

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
    if (!ctxRef.current || !animationRef!.current) return;
    resetAll(
      clearInput,
      clearSimulations,
      ctxRef.current,
      animationRef!.current,
      resetButtonsVisibility,
      resetMasses,
      setUIState
    );
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
