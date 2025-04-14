import React, { useState } from 'react';
import { SimulationManager } from '../../logic/simulation/SimulationManager';
import { SimulationContext } from './SimulationContext';

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulations, setSimulations] = useState<SimulationManager[]>([]);

  const addSimulation = (sim: SimulationManager) => {
    setSimulations((prev) => [...prev, sim]);
  };

  const replaceLastSimulation = (sim: SimulationManager) => {
    setSimulations((prev) => (prev.length === 0 ? [sim] : [...prev.slice(0, -1), sim]));
  };

  const updateLastSimulation = (updater: (sim: SimulationManager) => SimulationManager) => {
    setSimulations((prev) => {
      if (prev.length === 0) return prev;
      const updatedSim = updater(prev[prev.length - 1]);
      return [...prev.slice(0, -1), updatedSim];
    });
  };

  const clearSimulations = () => {
    setSimulations([]);
  };

  const lastSimulation = (): SimulationManager | undefined => {
    return simulations.at(-1);
  };

  return (
    <SimulationContext.Provider
      value={{
        simulations,
        setSimulations,
        addSimulation,
        replaceLastSimulation,
        updateLastSimulation,
        clearSimulations,
        lastSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
