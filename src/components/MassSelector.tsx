// src/components/MassSelector.tsx
import React from 'react';
import MassButton from './MassButton';
import { MassIconType } from '../types/MassIconType';
import { useStateContext } from '../context/state/useStateContext';
import { useInputContext } from '../context/input/useInputContext';
import { useSimulationContext } from '../context/simulation/useSimulationContext';
import { UIStates } from '../types/UIStates';
import { Mass } from '../logic/simulation/Mass';

import galileoImg from '../assets/masses/galileo.png';
import newtonImg from '../assets/masses/newton.png';
import leibnitzImg from '../assets/masses/leibnitz.png';
import bernoulliImg from '../assets/masses/bernoulli.png';
import jakobImg from '../assets/masses/jakob.png';

interface MassSelectorProps {
  hiddenMasses: Set<string>;
  onMassSelect: (type: MassIconType) => void;
}

const MassSelector: React.FC<MassSelectorProps> = ({ hiddenMasses, onMassSelect }) => {
  const { setUIState } = useStateContext();
  const { startPoint } = useInputContext();
  const { simulations, updateLastSimulation } = useSimulationContext();

  const handleMassSelection = (iconType: MassIconType, imageSrc: string) => {
    if (!startPoint) {
      console.warn('Start point non definito.');
      return;
    }

    const mass = new Mass(startPoint, iconType, imageSrc);

    const lastSim = simulations.at(-1);
    if (lastSim) {
      updateLastSimulation((prevSim) => {
        prevSim.setMass(mass);
        return prevSim;
      });
    }

    onMassSelect(iconType);
    setUIState(UIStates.READY_TO_SIMULATE);
  };

  // Elenco delle masse disponibili
  const masses = [
    { type: MassIconType.GALILEO, label: 'GALILEO', img: galileoImg },
    { type: MassIconType.NEWTON, label: 'NEWTON', img: newtonImg },
    { type: MassIconType.LEIBNITZ, label: 'LEIBNITZ', img: leibnitzImg },
    { type: MassIconType.BERNOULLI, label: 'BERNOULLI', img: bernoulliImg },
    { type: MassIconType.JAKOB, label: 'JAKOB', img: jakobImg },
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {masses
        .filter((mass) => !hiddenMasses.has(mass.type))
        .map((mass) => (
          <MassButton
            key={mass.type}
            imageSrc={mass.img}
            label={mass.label}
            onClick={() => handleMassSelection(mass.type, mass.img)}
          />
        ))}
    </div>
  );
};

export default MassSelector;
