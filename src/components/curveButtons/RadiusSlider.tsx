import React from 'react';
import { useInputContext } from '../../context/input/useInputContext';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { Circle } from '../../logic/curves/Circle';
import { drawCurve, clearLastCurve } from '../../logic/utils/CurveVisualizer';
import { SimulationManager } from '../../logic/simulation/SimulationManager';
import { getSimulations, replaceLastSimulation } from '../../logic/simulation/Simulations';

const RadiusSlider: React.FC = () => {
  const { startPoint, endPoint, intermediatePoints, radius, setRadius, convexity } =
    useInputContext();
  const { ctx } = useCanvasContext();

  // Non continuare se mancano i dati
  if (radius === null || convexity === null || !ctx) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseFloat(e.target.value);
    setRadius(newRadius);

    if (!startPoint || !endPoint || !ctx) return;

    const circle = new Circle(startPoint, endPoint, convexity, newRadius);

    const previous = getSimulations().at(-1)?.getCurve();
    if (previous) {
      circle.setRed(previous.getRed());
      circle.setGreen(previous.getGreen());
      circle.setBlue(previous.getBlue());
    }

    const circleSimulation = new SimulationManager(circle);
    replaceLastSimulation(circleSimulation);

    clearLastCurve(ctx, startPoint, endPoint, intermediatePoints);
    getSimulations().forEach((sim) => {
      const pts = sim.getPoints();
      const curve = sim.getCurve();
      drawCurve(
        pts,
        ctx,
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Raggio: {radius.toFixed(2)}
      </label>
      <input
        type="range"
        min={radius}
        max={radius * 3}
        step="0.1"
        value={radius}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default RadiusSlider;
