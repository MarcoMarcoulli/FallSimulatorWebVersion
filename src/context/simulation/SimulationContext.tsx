import { createContext } from 'react';
import { SimulationManager } from '../../logic/simulation/SimulationManager';

export interface SimulationContextType {
  simulations: SimulationManager[];
  setSimulations: React.Dispatch<React.SetStateAction<SimulationManager[]>>;
  addSimulation: (sim: SimulationManager) => void;
  replaceLastSimulation: (sim: SimulationManager) => void;
  updateLastSimulation: (updater: (sim: SimulationManager) => SimulationManager) => void;
  clearSimulations: () => void;
  clearMessages: () => void;
  lastSimulation: () => SimulationManager | undefined;
  arrivedMasses: number;
  arrivalMessages: string[];
  neverArriveMessages: string[];
}

export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);
