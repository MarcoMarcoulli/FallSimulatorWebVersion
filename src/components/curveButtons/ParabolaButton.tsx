// src/components/ParabolaButton.tsx
import React from 'react';

import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { useInputContext } from '../../context/input/useInputContext';
import { useStateContext } from '../../context/state/useStateContext';

import { UIStates } from '../../types/UIStates';

import { Parabola } from '../../logic/curves/Parabola';

import { drawCurve } from '../../logic/utils/CurveVisualizer';

import { SimulationManager } from '../../logic/simulation/SimulationManager';
import { addSimulation } from '../../logic/simulation/Simulations';

const ParabolaButton: React.FC = () => {
  const { ctx } = useCanvasContext();
  const { startPoint, endPoint, g } = useInputContext();
  const { setUIState } = useStateContext();

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
      parabola.getRed(),
      parabola.getGreen(),
      parabola.getBlue()
    );

    setUIState(UIStates.CHOOSING_MASS);
  };

  return (
    <button
      onClick={handleParabolaClick}
      className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Parabola
    </button>
  );
};

export default ParabolaButton;
