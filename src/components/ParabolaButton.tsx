// src/components/ParabolaButton.tsx
import React from 'react';
import { useInput } from '../context/InputContext';
import { useStateContext } from '../context/StateContext';
import { UIStates } from '../types/UIStates';
import { Parabola } from '../logic/curves/Parabola';
import { drawCurve } from '../logic/utils/CurveVisualizer';
import { SimulationManager } from '../logic/simulation/SimulationManager';
import { addSimulation } from '../logic/simulation/Simulations';

interface ParabolaButtonProps {
  ctx: CanvasRenderingContext2D | null;
}

const ParabolaButton: React.FC<ParabolaButtonProps> = ({ ctx }) => {
  const { startPoint, endPoint, g } = useInput();
  const { setUIState } = useStateContext();

  const handleParabolaClick = () => {
    if (!startPoint || !endPoint || !ctx || g === null) {
      console.warn('Dati mancanti per creare la parabola.');
      return;
    }

    // 1. Crea curva Parabola
    const parabola = new Parabola(startPoint, endPoint);
    parabola.setRandomColors();

    // 2. Crea e registra SimulationManager
    const parabolaSimulation = new SimulationManager(parabola);
    parabolaSimulation.setSlopes(parabola.calculateSlopes());
    parabolaSimulation.calculateTimeParametrization(g);
    addSimulation(parabolaSimulation);

    // 3. Disegna la curva sul canvas
    const points = parabolaSimulation.getPoints();
    drawCurve(points, ctx, parabola.getRed(), parabola.getGreen(), parabola.getBlue());

    // 4. Passa allo stato successivo
    setUIState(UIStates.CHOOSING_MASS);
  };

  return (
    <button
      onClick={handleParabolaClick}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Parabola
    </button>
  );
};

export default ParabolaButton;
