import React from 'react';

import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { useInputContext } from '../../context/input/useInputContext';
import { useStateContext } from '../../context/state/useStateContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';

import { UIStates } from '../../types/UIStates';

import { Parabola } from '../../logic/curves/Parabola';
import { drawCurve } from '../../logic/utils/CurveVisualizer';

import { SimulationManager } from '../../logic/simulation/SimulationManager';

interface ParabolaButtonProps {
  onClick?: () => void;
}

const ParabolaButton: React.FC<ParabolaButtonProps> = ({ onClick }) => {
  const { ctx } = useCanvasContext();
  const { startPoint, endPoint, intermediatePoints, g } = useInputContext();
  const { setUIState } = useStateContext();
  const { addSimulation } = useSimulationContext();

  const handleParabolaClick = () => {
    if (!startPoint || !endPoint || !ctx || g === null) {
      console.warn('Dati mancanti per creare la parabola.');
      return;
    }

    const parabola = new Parabola(startPoint, endPoint);
    parabola.setRandomColors();

    const parabolaSimulation = new SimulationManager(parabola);
    parabolaSimulation.setSlopes(parabola.calculateSlopes());
    parabolaSimulation.calculateTimeParametrization(g);
    addSimulation(parabolaSimulation);

    drawCurve(
      parabolaSimulation.getPoints(),
      ctx,
      startPoint,
      endPoint,
      intermediatePoints,
      parabola.getRed(),
      parabola.getGreen(),
      parabola.getBlue()
    );

    setUIState(UIStates.CHOOSING_MASS);

    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleParabolaClick}
      className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
    >
      Parabola
    </button>
  );
};

export default ParabolaButton;
