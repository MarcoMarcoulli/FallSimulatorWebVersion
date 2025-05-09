// src/context/simulation/SimulationProvider.tsx
import React, { useState, useEffect } from 'react';
import { SimulationManager } from '../../logic/simulation/SimulationManager';
import { SimulationContext } from './SimulationContext';
import { useStateContext } from '../state/useStateContext';
import { UIStates } from '../../types/UIStates';
import { useInputContext } from '../input/useInputContext';

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulations, setSimulations] = useState<SimulationManager[]>([]);
  const [arrivedMasses, setArrivedMasses] = useState(0);
  const [arrivalMessages, setArrivalMessages] = useState<string[]>([]);
  const [neverArriveMessages, setNeverArriveMessages] = useState<string[]>([]);
  const { setUIState } = useStateContext();
  const { g } = useInputContext();

  // ——————— SIDE‐EFFECT per aggiornare UI solo dopo il render ———————
  useEffect(() => {
    // Non eseguo nulla se non ci sono simulazioni
    if (simulations.length === 0) return;

    if (arrivedMasses === simulations.length) {
      setUIState(UIStates.SHOWING_RESULTS);
    }
  }, [arrivedMasses, simulations.length, setUIState]);

  const onMassArrival = (sim: SimulationManager) => {
    return (arrived: boolean) => {
      setArrivedMasses((c) => c + 1);

      const massName = sim.Mass!.iconTypeValue;
      const curveName = sim.Curve.curveName();
      if (arrived) {
        const timeStr = sim.getArrivalTime().toFixed(5);
        setArrivalMessages((msgs) =>
          [...msgs, `${massName} sulla ${curveName} è arrivato in ${timeStr} secondi.`].sort(
            (a, b) =>
              parseFloat(a.match(/in ([\d.]+)/)![1]) - parseFloat(b.match(/in ([\d.]+)/)![1])
          )
        );
      } else {
        setNeverArriveMessages((msgs) => [
          ...msgs,
          `${massName} sulla ${curveName} non arriverà mai a destinazione.`,
        ]);
      }
    };
  };

  // ——————— addSimulation NON chiama più setUIState ———————
  const addSimulation = (sim: SimulationManager) => {
    sim.Slopes = sim.Curve.calculateSlopes();
    sim.calculateTimeParametrization(g);
    sim.OnArrival = onMassArrival(sim);

    setSimulations((prev) => [...prev, sim]);
  };

  // src/context/simulation/SimulationProvider.tsx

  const replaceLastSimulation = (newSim: SimulationManager) => {
    newSim.OnArrival = onMassArrival(newSim);
    setSimulations((prev) => {
      if (prev.length === 0) return [newSim];
      return [...prev.slice(0, -1), newSim];
    });
  };

  const updateLastSimulation = (updater: (sim: SimulationManager) => SimulationManager) =>
    setSimulations((prev) => {
      if (prev.length === 0) return prev;
      const updated = updater(prev[prev.length - 1]);
      return [...prev.slice(0, -1), updated];
    });

  const clearSimulations = () => {
    setSimulations([]);
    setArrivalMessages([]);
    setNeverArriveMessages([]);
    setArrivedMasses(0);
    // se vuoi tornare allo stato iniziale:
    setUIState(UIStates.CHOOSING_GRAVITY);
  };

  const clearMessages = () => {
    setArrivalMessages([]);
    setNeverArriveMessages([]);
    setArrivedMasses(0);
  };

  const lastSimulation = () => simulations.at(-1);

  return (
    <SimulationContext.Provider
      value={{
        simulations,
        setSimulations,
        addSimulation,
        replaceLastSimulation,
        updateLastSimulation,
        clearSimulations,
        clearMessages,
        lastSimulation,
        arrivedMasses,
        arrivalMessages,
        neverArriveMessages,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
