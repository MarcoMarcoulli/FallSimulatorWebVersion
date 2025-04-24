// src/logic/utils/useWindowResizeReset.ts
import { useEffect } from 'react';
import { useInputContext } from '../../context/input/useInputContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';
import { useStateContext } from '../../context/state/useStateContext';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { UIStates } from '../../types/UIStates';
import { clearCanvas } from '../../logic/utils/CurveVisualizer';

export const useWindowResizeReset = () => {
  const { clearInput } = useInputContext();
  const { clearSimulations } = useSimulationContext();
  const { setUIState } = useStateContext();
  const { ctxRef } = useCanvasContext();

  useEffect(() => {
    const handleResize = () => {
      clearInput();
      clearSimulations();
      setUIState(UIStates.CHOOSING_GRAVITY);
      if (!ctxRef.current) return;
      clearCanvas(ctxRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clearInput, clearSimulations, setUIState, ctxRef]);
};
