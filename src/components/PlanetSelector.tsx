// src/components/PlanetSelector.tsx
import React from 'react';

import { useStateContext } from '../context/state/useStateContext';
import { useInputContext } from '../context/input/useInputContext';

import { UIStates } from '../types/UIStates';

import PlanetButton from './PlanetButton';
import { PlanetIcon, gravityMapping } from '../types/PlanetIconType';

const pixelHeightMm = 1;

import moonImg from '../assets/planets/moon.png';
import marsImg from '../assets/planets/mars.png';
import earthImg from '../assets/planets/earth.png';
import jupiterImg from '../assets/planets/jupiter.png';
import sunImg from '../assets/planets/sun.png';

const PlanetSelector: React.FC = () => {
  const { setUIState } = useStateContext();
  const { setG } = useInputContext();

  const handleGravitySelection = (planet: PlanetIcon) => {
    const gMm = gravityMapping[planet] || 0;
    const g = gMm / (pixelHeightMm * 100);
    console.log('Gravity set to:', g);
    setG(g);
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
