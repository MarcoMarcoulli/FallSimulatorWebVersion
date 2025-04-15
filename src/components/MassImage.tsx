// src/components/MassImage.tsx
import React from 'react';
import { Mass } from '../logic/simulation/Mass';

interface MassImageProps {
  mass: Mass;
}

const MassImage: React.FC<MassImageProps> = ({ mass }) => {
  return (
    <img
      src={mass.getImageUrl()}
      alt="mass"
      style={{
        position: 'absolute',
        left: `${mass.getXCentered()}px`,
        top: `${mass.getYCentered()}px`,
        width: `${mass.getMassDiameter()}px`,
        height: `${mass.getMassDiameter()}px`,
        pointerEvents: 'none',
      }}
    />
  );
};

export default MassImage;
