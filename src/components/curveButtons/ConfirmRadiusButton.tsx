// src/components/ConfirmRadiusButton.tsx
import React from 'react';
import { useInputContext } from '../../context/input/useInputContext';
import { useStateContext } from '../../context/state/useStateContext';
import { UIStates } from '../../types/UIStates';
import { lastSimulation } from '../../logic/simulation/Simulations';

const ConfirmRadiusButton: React.FC = () => {
  const { g } = useInputContext();
  const { setUIState } = useStateContext();

  const handleClick = () => {
    const simulation = lastSimulation();

    if (!simulation || g === null) {
      console.warn('Dati insufficienti per confermare il raggio.');
      return;
    }

    simulation.setSlopes(simulation.getCurve().calculateSlopes());
    simulation.calculateTimeParametrization(g);

    // Passa allo stato di scelta della massa
    setUIState(UIStates.CHOOSING_MASS);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Conferma Raggio
    </button>
  );
};

export default ConfirmRadiusButton;
