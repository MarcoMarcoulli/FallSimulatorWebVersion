// src/components/RadiusSlider.tsx
import React from 'react';
import { useInputContext } from '../../../context/input/useInputContext';
import { useCanvasContext } from '../../../context/canvas/useCanvasContext';
import { useSimulationContext } from '../../../context/simulation/useSimulationContext';
import { Circle } from '../../../logic/curves/Circle';
import { drawCurve, clearLastCurve } from '../../../logic/utils/CurveVisualizer';
import { SimulationManager } from '../../../logic/simulation/SimulationManager';

const RadiusSlider: React.FC = () => {
  const { startPoint, endPoint, intermediatePoints, radius, setRadius, initialRadius, convexity } =
    useInputContext();

  const { ctxRef } = useCanvasContext();
  const { simulations, replaceLastSimulation } = useSimulationContext();

  if (
    radius === null ||
    initialRadius === null ||
    convexity === null ||
    !ctxRef ||
    !startPoint ||
    !endPoint
  )
    return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseFloat(e.target.value);
    setRadius(newRadius);

    const circle = new Circle(startPoint, endPoint, convexity, newRadius);

    const previous = simulations.at(-1)?.Curve;
    if (previous) {
      circle.setRed(previous.getRed());
      circle.setGreen(previous.getGreen());
      circle.setBlue(previous.getBlue());
    }

    const circleSimulation = new SimulationManager(circle);
    replaceLastSimulation(circleSimulation);

    if (!ctxRef.current) return;

    clearLastCurve(simulations, ctxRef.current, startPoint, endPoint, intermediatePoints);
    const updatedSimulations = [...simulations.slice(0, -1), circleSimulation];

    updatedSimulations.forEach((sim) => {
      const pts = sim.Points;
      const curve = sim.Curve;

      if (!ctxRef.current) return;

      drawCurve(
        pts,
        ctxRef.current,
        startPoint,
        endPoint,
        intermediatePoints,
        curve.getRed(),
        curve.getGreen(),
        curve.getBlue()
      );
    });
  };

  return (
    <div className="w-full mt-4">
      <input
        type="range"
        min={initialRadius}
        max={initialRadius * 3}
        step="0.1"
        value={radius}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default RadiusSlider;
