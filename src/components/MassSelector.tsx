import React from 'react';
import MassButton from './MassButton';
import { MassIconType } from '../types/MassIconType';
import { useStateContext } from '../context/StateContext';
import { useInput } from '../context/InputContext';
import { UIStates } from '../types/UIStates';
import { lastSimulation } from '../logic/simulation/Simulations';
import { Mass } from '../logic/simulation/Mass';

import galileoImg from '../assets/masses/galileo.png';
import newtonImg from '../assets/masses/newton.png';
import leibnitzImg from '../assets/masses/leibnitz.png';
import bernoulliImg from '../assets/masses/bernoulli.png';
import jakobImg from '../assets/masses/jakob.png';

const MassSelector: React.FC = () => {
  const { setUIState } = useStateContext();
  const { startPoint } = useInput();

  const handleMassSelection = (iconType: MassIconType, imageSrc: string) => {
    if (!startPoint) {
      console.warn('Start point non definito.');
      return;
    }

    // 1. Crea oggetto Mass
    const mass = new Mass(startPoint, iconType, imageSrc);

    // 2. Assegna alla simulazione
    lastSimulation()?.setMass(mass);

    // 3. Aggiungi l'immagine nel livello di animazione
    const animationLayer = document.getElementById('animation-layer');
    if (animationLayer) {
      animationLayer.appendChild(mass.getImageElement());
    }

    // 4. Passa allo stato READY_TO_SIMULATE e rimuove i pulsanti (gestito dal pannello)
    setUIState(UIStates.READY_TO_SIMULATE);
  };

  return (
    <div className="flex gap-4">
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
