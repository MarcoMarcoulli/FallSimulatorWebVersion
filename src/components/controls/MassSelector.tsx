// src/components/MassSelector.tsx
import React from 'react';
import MassButton from './MassButton';
import { useStateContext } from '../../context/state/useStateContext';
import { useInputContext } from '../../context/input/useInputContext';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { UIStates } from '../../types/UIStates';
import { Mass } from '../../logic/simulation/Mass';

import { MassIconType, MASS_ICONS } from '../../types/MassIconType';

interface MassSelectorProps {
  hiddenMasses: Set<MassIconType>;
  onMassSelect: (type: MassIconType) => void;
}

const MassSelector: React.FC<MassSelectorProps> = ({ hiddenMasses, onMassSelect }) => {
  const { setUIState } = useStateContext();
  const { startPoint } = useInputContext();
  const { simulations, updateLastSimulation } = useSimulationContext();
  const { animationRef } = useCanvasContext();

  const handleMassSelection = (icon: { type: MassIconType; label: string; imageSrc: string }) => {
    if (!startPoint) {
      console.warn('Start point non definito.');
      return;
    }

    if (!animationRef!.current) {
      console.error('Layer di animazione non inizializzato.');
      return;
    }

    const img = new Image();
    img.src = icon.imageSrc;
    img.width = Mass.diameter;
    img.height = Mass.diameter;
    img.style.position = 'absolute';

    img.onload = () => {
      const mass = new Mass(startPoint, icon.type, icon.imageSrc);

      animationRef!.current!.appendChild(mass.element);

      const lastSim = simulations.at(-1);
      if (lastSim) {
        updateLastSimulation((prev) => {
          prev.Mass = mass;
          return prev;
        });
      }

      onMassSelect(icon.type);
      setUIState(UIStates.READY_TO_SIMULATE);
    };
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {MASS_ICONS.filter((icon) => !hiddenMasses.has(icon.type)).map((icon) => (
        <MassButton
          key={icon.type}
          imageSrc={icon.imageSrc}
          label={icon.label}
          onClick={() => handleMassSelection(icon)}
        />
      ))}
    </div>
  );
};

export default MassSelector;
