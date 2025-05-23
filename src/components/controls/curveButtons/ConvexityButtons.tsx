import React from 'react';
import { useInputContext } from '../../../context/input/useInputContext';
import { useCanvasContext } from '../../../context/canvas/useCanvasContext';
import { useStateContext } from '../../../context/state/useStateContext';
import { useSimulationContext } from '../../../context/simulation/useSimulationContext';

import { Circle } from '../../../logic/curves/Circle';
import { drawCurve } from '../../../logic/utils/CurveVisualizer';
import { SimulationManager } from '../../../logic/simulation/SimulationManager';
import { UIStates } from '../../../types/UIStates';

interface ConvexityButtonProps {
  convexity: 1 | -1;
}

const ConvexityButton: React.FC<ConvexityButtonProps> = ({ convexity }) => {
  const { startPoint, endPoint, intermediatePoints } = useInputContext();
  const { setRadius, setConvexity, setInitialRadius } = useInputContext();
  const { ctxRef } = useCanvasContext();
  const { setUIState } = useStateContext();
  const { addSimulation } = useSimulationContext();

  const handleClick = () => {
    if (!startPoint || !endPoint || !ctxRef) return;
    if (!ctxRef.current) return;

    const circle = new Circle(startPoint, endPoint, convexity);
    circle.setRandomColors();

    const sim = new SimulationManager(circle);
    addSimulation(sim);

    drawCurve(
      sim.Points,
      ctxRef.current,
      startPoint,
      endPoint,
      intermediatePoints,
      circle.getRed(),
      circle.getGreen(),
      circle.getBlue()
    );

    let computedRadius = circle.getR();
    if (convexity === 1) {
      const deltaX = endPoint.x - startPoint.x;
      computedRadius = (deltaX / Math.abs(deltaX)) * computedRadius;
    }

    setRadius(computedRadius);
    setInitialRadius(Math.abs(computedRadius));
    setConvexity(convexity);

    setUIState(UIStates.CHOOSING_RADIUS);
  };

  const label = convexity === 1 ? 'Convessità ↑' : 'Convessità ↓';
  const buttonColor =
    convexity === 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700';

  return (
    <div>
      <button onClick={handleClick} className={`${buttonColor} text-white px-3 py-1 rounded`}>
        {label}
      </button>
    </div>
  );
};

export default ConvexityButton;
