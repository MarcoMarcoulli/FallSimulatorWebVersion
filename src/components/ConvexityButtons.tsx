import React from 'react';
import { useInput } from '../context/InputContext';
import { useStateContext } from '../context/StateContext';
import { Circle } from '../logic/curves/Circle';
import { drawCurve } from '../logic/utils/CurveVisualizer';
import { SimulationManager } from '../logic/simulation/SimulationManager';
import { addSimulation } from '../logic/simulation/Simulations';
import { UIStates } from '../types/UIStates';

interface ConvexityButtonProps {
  convexity: 1 | -1;
  ctx: CanvasRenderingContext2D | null;
  setSliderRadius: (min: number, max: number, initial: number) => void;
}

const ConvexityButton: React.FC<ConvexityButtonProps> = ({ convexity, ctx, setSliderRadius }) => {
  const { startPoint, endPoint } = useInput();
  const { setUIState } = useStateContext();

  const handleClick = () => {
    if (!startPoint || !endPoint || !ctx) return;

    const circle = new Circle(startPoint, endPoint, convexity);
    circle.setRandomColors();

    const simulation = new SimulationManager(circle);
    addSimulation(simulation);

    const points = simulation.getPoints();
    drawCurve(points, ctx, circle.getRed(), circle.getGreen(), circle.getBlue());

    // Calcolo raggio iniziale
    let initialRadius = circle.getR();
    if (convexity === 1) {
      const deltaX = endPoint.x - startPoint.x;
      initialRadius = (deltaX / Math.abs(deltaX)) * initialRadius;
    }

    setSliderRadius(initialRadius, initialRadius * 3, initialRadius);
    setUIState(UIStates.CHOOSING_RADIUS);
  };

  const label = convexity === 1 ? 'Convessità ↑' : 'Convessità ↓';
  const color =
    convexity === 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700';

  return (
    <button onClick={handleClick} className={`${color} text-white px-3 py-1 rounded`}>
      {label}
    </button>
  );
};

export default ConvexityButton;
