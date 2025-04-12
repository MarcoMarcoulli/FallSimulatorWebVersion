import React, { useState } from 'react';
import { useInput } from '../context/InputContext';
import { useCanvasContext } from '../context/CanvasContext';
import { Circle } from '../logic/curves/Circle';
import { drawCurve, clearLastCurve } from '../logic/utils/CurveVisualizer';
import { SimulationManager } from '../logic/simulation/SimulationManager';
import { getSimulations, replaceLastSimulation } from '../logic/simulation/Simulations';

const RadiusSlider: React.FC = () => {
  const { startPoint, endPoint } = useInput();
  const { initialRadius, convexity, ctx } = useCanvasContext();

  // ✅ INIZIALIZZA QUI GLI HOOK, PRIMA DI QUALSIASI return
  const [radius, setRadius] = useState(initialRadius ?? 0);

  // ✅ DOPO gli hook puoi fare return condizionale
  if (initialRadius === null || convexity === null || !ctx) return null;

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

    clearLastCurve(ctx);
    getSimulations().forEach((sim) => {
      const pts = sim.getPoints();
      const curve = sim.getCurve();
      drawCurve(pts, ctx, curve.getRed(), curve.getGreen(), curve.getBlue());
    });
  };

  return (
    <div className="w-full mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Raggio: {radius.toFixed(2)}
      </label>
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
