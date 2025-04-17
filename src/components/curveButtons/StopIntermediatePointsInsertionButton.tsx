import React from 'react';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { useInputContext } from '../../context/input/useInputContext';
import { useStateContext } from '../../context/state/useStateContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';

import { UIStates } from '../../types/UIStates';
import { CubicSpline } from '../../logic/curves/CubicSpline';
import { drawCurve } from '../../logic/utils/CurveVisualizer';
import { SimulationManager } from '../../logic/simulation/SimulationManager';

const StopIntermediatePointsInsertion: React.FC = () => {
  const { ctx } = useCanvasContext();
  const { startPoint, endPoint, intermediatePoints, g, clearIntermediatePoints } =
    useInputContext();
  const { setUIState } = useStateContext();
  const { addSimulation } = useSimulationContext();

  const handleFinish = () => {
    if (!ctx || !startPoint || !endPoint || g == null) {
      console.warn('Dati mancanti per completare la spline.');
      return;
    }

    // Crea la curva spline
    const spline = new CubicSpline(startPoint, endPoint, intermediatePoints);
    spline.setRandomColors();

    // Crea simulazione
    const simulation = new SimulationManager(spline);
    simulation.setSlopes(spline.calculateSlopes());
    simulation.calculateTimeParametrization(g);
    addSimulation(simulation);

    // Disegna sul canvas
    drawCurve(
      simulation.getPoints(),
      ctx,
      startPoint,
      endPoint,
      intermediatePoints,
      spline.getRed(),
      spline.getGreen(),
      spline.getBlue()
    );

    clearIntermediatePoints();

    setUIState(UIStates.CHOOSING_MASS);
  };

  return (
    <button
      onClick={handleFinish}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Fine Immissione
    </button>
  );
};

export default StopIntermediatePointsInsertion;
