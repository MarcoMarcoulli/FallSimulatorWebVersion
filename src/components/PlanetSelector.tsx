// src/components/PlanetSelector.tsx
import React from 'react';
import PlanetButton from './PlanetButton';
import { useStateContext } from '../context/StateContext';
import { useInput } from '../context/InputContext';
import { UIStates } from '../types/UIStates';

// Enumerazione dei pianeti
export enum PlanetIcon {
  MOON = 'MOON',
  MARS = 'MARS',
  EARTH = 'EARTH',
  JUPITER = 'JUPITER',
  SUN = 'SUN',
}

// Mapping dei valori di gravità in millimetri (gMm) per ogni pianeta
const gravityMapping: Record<PlanetIcon, number> = {
  [PlanetIcon.MOON]: 1620,
  [PlanetIcon.MARS]: 3730,
  [PlanetIcon.EARTH]: 9810,
  [PlanetIcon.JUPITER]: 24790,
  [PlanetIcon.SUN]: 274000,
};

// Valore placeholder per la dimensione del pixel in millimetri;
// sostituisci con il valore reale se disponibile
const pixelHeightMm = 1;

// Importa le immagini dalla cartella src/assets
import moonImg from '../assets/planets/moon.png';
import marsImg from '../assets/planets/mars.png';
import earthImg from '../assets/planets/earth.png';
import jupiterImg from '../assets/planets/jupiter.png';
import sunImg from '../assets/planets/sun.png';

const PlanetSelector: React.FC = () => {
  const { setUIState } = useStateContext();
  const { setG } = useInput();

  // Callback che replica la logica handleGravitySelection
  const handleGravitySelection = (planet: PlanetIcon) => {
    const gMm = gravityMapping[planet] || 0;
    // Calcola g: g = gMm / (pixelHeightMm * 100)
    const g = gMm / (pixelHeightMm * 100);
    console.log('Gravity set to:', g);

    // Imposta il valore di g nel context
    setG(g);

    // Cambia lo stato dell'interfaccia a WAITING_FOR_START_POINT
    setUIState(UIStates.WAITING_FOR_START_POINT);
  };

  return (
    <div className="flex gap-4">
      <PlanetButton
        imageSrc={moonImg}
        label="LUNA"
        gravityText="g = 1,62"
        onClick={() => handleGravitySelection(PlanetIcon.MOON)}
      />
      <PlanetButton
        imageSrc={marsImg}
        label="MARTE"
        gravityText="g = 3,73"
        onClick={() => handleGravitySelection(PlanetIcon.MARS)}
      />
      <PlanetButton
        imageSrc={earthImg}
        label="TERRA"
        gravityText="g = 9,81"
        onClick={() => handleGravitySelection(PlanetIcon.EARTH)}
      />
      <PlanetButton
        imageSrc={jupiterImg}
        label="GIOVE"
        gravityText="g = 24,79"
        onClick={() => handleGravitySelection(PlanetIcon.JUPITER)}
      />
      <PlanetButton
        imageSrc={sunImg}
        label="SOLE"
        gravityText="g = 274"
        onClick={() => handleGravitySelection(PlanetIcon.SUN)}
      />
    </div>
  );
};

export default PlanetSelector;
