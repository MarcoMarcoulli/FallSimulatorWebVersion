import React from 'react';
import { useInputContext } from '../../context/input/useInputContext';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { useStateContext } from '../../context/state/useStateContext';

import { Circle } from '../../logic/curves/Circle';

import { drawCurve } from '../../logic/utils/CurveVisualizer';

import { SimulationManager } from '../../logic/simulation/SimulationManager';
import { addSimulation } from '../../logic/simulation/Simulations';

import { UIStates } from '../../types/UIStates';

interface ConvexityButtonProps {
  convexity: 1 | -1;
}

const ConvexityButton: React.FC<ConvexityButtonProps> = ({ convexity }) => {
  const { startPoint, endPoint, intermediatePoints, g } = useInputContext();
  const { ctx } = useCanvasContext();
  const { setUIState } = useStateContext();

  // Stato per memorizzare il raggio iniziale da passare a RadiusSlider
  const { setRadius, setConvexity } = useInputContext();

  const handleClick = () => {
    if (!startPoint || !endPoint || !ctx) return;

    const circle = new Circle(startPoint, endPoint, convexity);
    circle.setRandomColors();

    const circleSimulation = new SimulationManager(circle);
    circleSimulation.setSlopes(circle.calculateSlopes());
    circleSimulation.calculateTimeParametrization(g);
    addSimulation(circleSimulation);

    drawCurve(
      circleSimulation.getPoints(),
      ctx,
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
