// src/context/simulation/SimulationProvider.tsx
import React, { useState, useEffect } from 'react';
import { SimulationManager } from '../../logic/simulation/SimulationManager';
import { SimulationContext } from './SimulationContext';
import { useStateContext } from '../state/useStateContext';
import { UIStates } from '../../types/UIStates';

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulations, setSimulations] = useState<SimulationManager[]>([]);
  const [arrivedMasses, setArrivedMasses] = useState(0);
  const [arrivalMessages, setArrivalMessages] = useState<string[]>([]);
  const [neverArriveMessages, setNeverArriveMessages] = useState<string[]>([]);
  const { setUIState } = useStateContext();

  // ——————— SIDE‐EFFECT per aggiornare UI solo dopo il render ———————
  useEffect(() => {
    // Non eseguo nulla se non ci sono simulazioni
    if (simulations.length === 0) return;

    if (arrivedMasses === simulations.length) {
      setUIState(UIStates.SHOWING_RESULTS);
    }
  }, [arrivedMasses, simulations.length, setUIState]);

  // ——————— addSimulation NON chiama più setUIState ———————
  const addSimulation = (sim: SimulationManager) => {
    setSimulations((prev) => {
      if (prev.includes(sim)) return prev; // protezione da duplicati
      const next = [...prev, sim];

      sim.OnArrival = (arrived: boolean) => {
        // Aggiorno SOLO il contatore e i messaggi: UI verrà gestita da useEffect sopra
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

      return next;
    });
  };

  // ——————— gli altri metodi restano invariati, SENZA setUIState ———————
  const replaceLastSimulation = (sim: SimulationManager) =>
    setSimulations((prev) => (prev.length === 0 ? [sim] : [...prev.slice(0, -1), sim]));

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
