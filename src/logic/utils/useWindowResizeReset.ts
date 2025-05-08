// src/logic/utils/useWindowResizeReset.ts
import { useEffect } from 'react';
import { useInputContext } from '../../context/input/useInputContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';
import { useStateContext } from '../../context/state/useStateContext';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { resetAll } from './reset';

export const useWindowResizeReset = (
  resetButtonsVisibility: () => void,
  resetMasses: () => void
) => {
  const { clearInput } = useInputContext();
  const { clearSimulations } = useSimulationContext();
  const { setUIState } = useStateContext();
  const { ctxRef, animationRef } = useCanvasContext();

  useEffect(() => {
    const handler = () => {
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
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [
    clearInput,
    clearSimulations,
    setUIState,
    ctxRef,
    animationRef,
    resetButtonsVisibility,
    resetMasses,
  ]);
};
