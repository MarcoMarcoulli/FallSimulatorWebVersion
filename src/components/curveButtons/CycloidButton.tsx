import React from 'react';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { useInputContext } from '../../context/input/useInputContext';
import { useStateContext } from '../../context/state/useStateContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';

import { UIStates } from '../../types/UIStates';
import { Cycloid } from '../../logic/curves/Cycloid';

import { drawCurve } from '../../logic/utils/CurveVisualizer';
import { SimulationManager } from '../../logic/simulation/SimulationManager';

interface ParabolaButtonProps {
  onClick?: () => void;
}

const CycloidButton: React.FC<ParabolaButtonProps> = ({ onClick }) => {
  const { ctx } = useCanvasContext();
  const { startPoint, endPoint, intermediatePoints, g } = useInputContext();
  const { setUIState } = useStateContext();
  const { addSimulation } = useSimulationContext();

  const handleCycloidClick = () => {
    if (!startPoint || !endPoint || !ctx || g === null) {
      console.warn('Dati mancanti per creare la cicloide.');
      return;
    }

    let cycloid;
    try {
      cycloid = new Cycloid(startPoint, endPoint);
    } catch (error) {
      console.error('Errore nella creazione della cicloide:', error);
      return;
    }

    cycloid.setRandomColors();

    const simulation = new SimulationManager(cycloid);
    simulation.setSlopes(cycloid.calculateSlopes());
    simulation.calculateTimeParametrization(g);
    addSimulation(simulation);

    drawCurve(
      simulation.getPoints(),
      ctx,
      startPoint,
      endPoint,
      intermediatePoints,
      cycloid.getRed(),
      cycloid.getGreen(),
      cycloid.getBlue()
    );

    setUIState(UIStates.CHOOSING_MASS);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleCycloidClick}
      className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
    >
      Cicloide
    </button>
  );
};

export default CycloidButton;
