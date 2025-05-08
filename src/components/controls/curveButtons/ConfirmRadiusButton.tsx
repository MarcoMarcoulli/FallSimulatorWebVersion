import React from 'react';
import { useInputContext } from '../../../context/input/useInputContext';
import { useStateContext } from '../../../context/state/useStateContext';
import { useSimulationContext } from '../../../context/simulation/useSimulationContext';
import { UIStates } from '../../../types/UIStates';

const ConfirmRadiusButton: React.FC = () => {
  const { g } = useInputContext();
  const { setUIState } = useStateContext();
  const { simulations, updateLastSimulation } = useSimulationContext();

  const handleClick = () => {
    const lastSim = simulations.at(-1);

    if (!lastSim || g === null) {
      console.warn('Dati insufficienti per confermare il raggio.');
      return;
    }

    updateLastSimulation((prevSim) => {
      prevSim.Slopes = prevSim.Curve.calculateSlopes();
      prevSim.calculateTimeParametrization(g);
      return prevSim;
    });

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
