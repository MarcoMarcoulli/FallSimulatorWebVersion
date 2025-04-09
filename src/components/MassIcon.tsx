import React from 'react';
import { Mass } from '../logic/simulation/Mass';
import { SimulationManager } from '../logic/simulation/SimulationManager';
import { useStartAnimation } from '../logic/simulation/useMassAnimation';

interface MassIconProps {
  simulation: SimulationManager;
}

const MassIcon: React.FC<MassIconProps> = ({ simulation }) => {
  const mass = simulation.getMass();
  useStartAnimation(simulation); // Avvia l’animazione al mount

  const x = mass!.getXCentered();
  const y = mass!.getYCentered();

  return (
    <img
      alt="mass icon"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${Mass.MASS_DIAMETER}px`,
        height: `${Mass.MASS_DIAMETER}px`,
        pointerEvents: 'none',
      }}
    />
  );
};

export default MassIcon;
