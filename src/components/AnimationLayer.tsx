// src/components/AnimationLayer.tsx
import React from 'react';
import Canvas from './Canvas';
import { useSimulationContext } from '../context/simulation/useSimulationContext';

const AnimationLayer: React.FC = () => {
  const { simulations } = useSimulationContext();

  return (
    <div className="w-full h-full relative" id="animation-layer">
      <Canvas />

      {/* Masse animate sopra il canvas */}
      {simulations.map((sim, index) => {
        const mass = sim.getMass();
        if (!mass) return null;

        return (
          <img
            key={index}
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
      })}
    </div>
  );
};

export default AnimationLayer;
