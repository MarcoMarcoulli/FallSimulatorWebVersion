// src/components/CycloidButton.tsx
import React from 'react';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { useInputContext } from '../../context/input/useInputContext';
import { useStateContext } from '../../context/state/useStateContext';

import { UIStates } from '../../types/UIStates';
import { Cycloid } from '../../logic/curves/Cycloid';

import { drawCurve } from '../../logic/utils/CurveVisualizer';

import { SimulationManager } from '../../logic/simulation/SimulationManager';
import { addSimulation } from '../../logic/simulation/Simulations';

const CycloidButton: React.FC = () => {
  const { ctx } = useCanvasContext();
  const { startPoint, endPoint, intermediatePoints, g } = useInputContext();
  const { setUIState } = useStateContext();

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
      // Puoi anche mostrare un messaggio visivo se vuoi bloccare l’utente per qualche secondo
      return;
    }

    cycloid.setRandomColors();

    const simulation = new SimulationManager(cycloid);
    simulation.setSlopes(cycloid.calculateSlopes());
    simulation.calculateTimeParametrization(g);
    addSimulation(simulation);

    const points = simulation.getPoints();

    drawCurve(
      points,
      ctx,
      startPoint,
      endPoint,
      intermediatePoints,
      cycloid.getRed(),
      cycloid.getGreen(),
      cycloid.getBlue()
    );

    setUIState(UIStates.CHOOSING_MASS);
  };

  return (
    <button
      onClick={handleCycloidClick}
      className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Cicloide
    </button>
  );
};

export default CycloidButton;
