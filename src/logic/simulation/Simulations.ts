import { SimulationManager } from './SimulationManager';

let simulations: SimulationManager[] = [];

export const addSimulation = (sim: SimulationManager) => {
  simulations.push(sim);
};

export const getSimulations = (): SimulationManager[] => {
  return simulations;
};

export const lastSimulation = (): SimulationManager | undefined => {
  return simulations[simulations.length - 1];
};

export const clearSimulations = () => {
  simulations = [];
};

// Sostituisce l'ultima simulazione
export const replaceLastSimulation = (sim: SimulationManager) => {
  if (simulations.length === 0) {
    simulations.push(sim);
  } else {
    simulations[simulations.length - 1] = sim;
  }
};
