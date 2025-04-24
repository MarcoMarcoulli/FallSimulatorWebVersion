// src/hooks/useStartAnimation.ts
import { useEffect } from 'react';
import { SimulationManager } from './SimulationManager';

export function useStartAnimation(
  simulation: SimulationManager | null,
  container: HTMLDivElement | null,
  onArrival?: (arrived: boolean) => void
) {
  useEffect(() => {
    if (!simulation || !container) return;
    simulation.startAnimation(container);
  }, [simulation, container, onArrival]); // ok: param usato nella chiamata
}
