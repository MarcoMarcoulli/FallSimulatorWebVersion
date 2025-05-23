import React from 'react';
import { useCanvasContext } from '../../../context/canvas/useCanvasContext';
import { useInputContext } from '../../../context/input/useInputContext';
import { useStateContext } from '../../../context/state/useStateContext';
import { useSimulationContext } from '../../../context/simulation/useSimulationContext';

import { UIStates } from '../../../types/UIStates';
import { CubicSpline } from '../../../logic/curves/CubicSpline';
import { drawCurve } from '../../../logic/utils/CurveVisualizer';
import { SimulationManager } from '../../../logic/simulation/SimulationManager';

const StopIntermediatePointsInsertion: React.FC = () => {
  const { ctxRef } = useCanvasContext();
  const { startPoint, endPoint, intermediatePoints, g } = useInputContext();
  const { setUIState } = useStateContext();
  const { addSimulation } = useSimulationContext();

  const handleFinish = () => {
    if (!ctxRef || !startPoint || !endPoint || g == null) {
      console.warn('Dati mancanti per completare la spline.');
      return;
    }

    if (!ctxRef.current) return;

    const spline = new CubicSpline(startPoint, endPoint, intermediatePoints.at(-1)!);
    spline.setRandomColors();

    const simulation = new SimulationManager(spline);
    simulation.Slopes = spline.calculateSlopes();
    simulation.calculateTimeParametrization(g);
    addSimulation(simulation);

    drawCurve(
      simulation.Points,
      ctxRef.current,
      startPoint,
      endPoint,
      intermediatePoints,
      spline.getRed(),
      spline.getGreen(),
      spline.getBlue()
    );

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
