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

const MassSelector: React.FC = () => {
  const { setUIState } = useStateContext();
  const { startPoint } = useInputContext();
  const { simulations, updateLastSimulation } = useSimulationContext();

  const handleMassSelection = (iconType: MassIconType, imageSrc: string) => {
    if (!startPoint) {
      console.warn('Start point non definito.');
      return;
    }

    const mass = new Mass(startPoint, iconType, imageSrc);

    // Clona l'ultima simulazione, aggiorna la massa e sostituiscila
    const lastSim = simulations.at(-1);
    if (lastSim) {
      updateLastSimulation((prevSim) => {
        prevSim.setMass(mass);
        return prevSim;
      });
    }

    setUIState(UIStates.READY_TO_SIMULATE);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <MassButton
        imageSrc={galileoImg}
        label="GALILEO"
        onClick={() => handleMassSelection(MassIconType.GALILEO, galileoImg)}
      />
      <MassButton
        imageSrc={newtonImg}
        label="NEWTON"
        onClick={() => handleMassSelection(MassIconType.NEWTON, newtonImg)}
      />
      <MassButton
        imageSrc={leibnitzImg}
        label="LEIBNITZ"
        onClick={() => handleMassSelection(MassIconType.LEIBNITZ, leibnitzImg)}
      />
      <MassButton
        imageSrc={bernoulliImg}
        label="BERNOULLI"
        onClick={() => handleMassSelection(MassIconType.BERNOULLI, bernoulliImg)}
      />
      <MassButton
        imageSrc={jakobImg}
        label="JAKOB"
        onClick={() => handleMassSelection(MassIconType.JAKOB, jakobImg)}
      />
    </div>
  );
};

export default MassSelector;
