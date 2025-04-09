// src/components/MassIcon.tsx
import React from 'react';
import { Mass } from '../logic/simulation/Mass';

interface MassIconProps {
  mass: Mass;
  imageUrl: string;
}

const MassIcon: React.FC<MassIconProps> = ({ mass, imageUrl }) => {
  const x = mass.getXCentered();
  const y = mass.getYCentered();

  return (
    <img
      src={imageUrl}
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
