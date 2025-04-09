import React, { useState } from 'react';
import { useInput } from '../context/InputContext';
import { Circle } from '../logic/curves/Circle';
import { drawCurve, clearLastCurve } from '../logic/utils/CurveVisualizer';
import { SimulationManager } from '../logic/simulation/SimulationManager';
import { getSimulations, replaceLastSimulation } from '../logic/simulation/Simulations';

interface RadiusSliderProps {
  initialRadius: number;
  min?: number;
  max?: number;
  convexity: 1 | -1;
  ctx: CanvasRenderingContext2D | null;
}

const RadiusSlider: React.FC<RadiusSliderProps> = ({
  initialRadius,
  min = initialRadius,
  max = initialRadius * 3,
  convexity,
  ctx,
}) => {
  const [radius, setRadius] = useState(initialRadius);
  const { startPoint, endPoint } = useInput();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseFloat(e.target.value);
    setRadius(newRadius);

    if (!startPoint || !endPoint || !ctx) return;

    // 1. Ricrea la nuova curva Circle
    const circle = new Circle(startPoint, endPoint, convexity, newRadius);

    // 2. Mantieni i colori dalla curva precedente (se esiste)
    const previous = getSimulations().at(-1)?.getCurve();
    if (previous) {
      circle.setRed(previous.getRed());
      circle.setGreen(previous.getGreen());
      circle.setBlue(previous.getBlue());
    }

    // 3. Crea nuovo SimulationManager con la nuova curva
    const circleSimulation = new SimulationManager(circle);
    replaceLastSimulation(circleSimulation);

    // 4. Ripulisci e ridisegna tutte le curve
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
        min={min}
        max={max}
        step="0.1"
        value={radius}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default RadiusSlider;
