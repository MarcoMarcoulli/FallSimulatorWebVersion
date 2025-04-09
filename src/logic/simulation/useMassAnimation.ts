import { useEffect, useRef } from 'react';
import { SimulationManager } from './SimulationManager';
import { addArrivalMessage, addNeverArriveMessage } from './ArrivalMessages';

export function useStartAnimation(simulation: SimulationManager | null) {
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!simulation) return;

    const mass = simulation.getMass();
    const points = simulation.getPoints();
    const times = simulation.getTimes();

    const animate = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsedTime = (now - startTimeRef.current) / 1000; // in seconds

      let index = times.findIndex((t) => t > elapsedTime);
      if (index === -1) index = times.length - 1;

      if (index >= times.length - 1) {
        // Stop animation at the end
        mass!.setCurrentPosition(points[points.length - 1]);
        addArrivalMessage({
          massName: mass!.getIconType(),
          curveName: simulation.getCurve().curveName(),
          arrivalTime: simulation.getArrivalTime(),
        });
        cancelAnimationFrame(requestRef.current!);
        return;
      }

      // Se la massa si ferma prima
      if (index < times.length - 2 && points[index + 2].y < points[0].y) {
        mass!.setCurrentPosition(points[index]);
        addNeverArriveMessage({
          massName: mass!.getIconType(),
          curveName: simulation.getCurve().curveName(),
        });
        cancelAnimationFrame(requestRef.current!);
        return;
      }

      const t0 = times[index - 1];
      const t1 = times[index];
      const ratio = (elapsedTime - t0) / (t1 - t0);

      const p0 = points[index - 1];
      const p1 = points[index];
      const x = p0.x + (p1.x - p0.x) * ratio;
      const y = p0.y + (p1.y - p0.y) * ratio;

      mass!.setCurrentPosition({ x, y });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = null;
    };
  }, [simulation]);
}
