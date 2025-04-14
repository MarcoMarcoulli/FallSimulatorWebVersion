// src/components/EndInputButton.tsx
import React from 'react';
import { useCanvasContext } from '../context/canvas/useCanvasContext';
import { useInputContext } from '../context/input/useInputContext';
import { useStateContext } from '../context/state/useStateContext';
import { UIStates } from '../types/UIStates';
import { CubicSpline } from '../logic/curves/CubicSpline';
import { drawCurve } from '../logic/utils/CurveVisualizer';
import { SimulationManager } from '../logic/simulation/SimulationManager';
import { addSimulation } from '../logic/simulation/Simulations';

const StopIntermediatePointsInsertion: React.FC = () => {
  const { ctx } = useCanvasContext();
  const { startPoint, endPoint, intermediatePoints, clearIntermediatePoints, g } =
    useInputContext();
  const { setUIState } = useStateContext();

  const handleClick = () => {
    if (!ctx || !startPoint || !endPoint || g == null) {
      console.warn('Dati mancanti per la spline');
      return;
    }

    // 1. Crea la curva
    const spline = new CubicSpline(startPoint, endPoint, intermediatePoints);
    spline.setRandomColors();

    // 2. Aggiunge simulazione
    const splineSimulation = new SimulationManager(spline);
    splineSimulation.setSlopes(spline.calculateSlopes());
    splineSimulation.calculateTimeParametrization(g);
    addSimulation(splineSimulation);

    // 3. Disegna curva
    const points = splineSimulation.getPoints();
    drawCurve(points, ctx, spline.getRed(), spline.getGreen(), spline.getBlue());

    // 4. Pulisce i punti intermedi
    clearIntermediatePoints();

    // 5. Cambia stato
    setUIState(UIStates.CHOOSING_MASS);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Fine Immissione
    </button>
  );
};

export default StopIntermediatePointsInsertion;
