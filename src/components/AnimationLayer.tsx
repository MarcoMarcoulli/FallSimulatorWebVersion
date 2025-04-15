// src/components/AnimationLayer.tsx
import React from 'react';
import Canvas from './Canvas';
import { useSimulationContext } from '../context/simulation/useSimulationContext';
import MassImage from './MassImage';

const AnimationLayer: React.FC = () => {
  const { simulations } = useSimulationContext();

  return (
    <div className="w-full h-full relative" id="animation-layer">
      <Canvas />

      {simulations.map((sim, index) => {
        const mass = sim.getMass();
        if (!mass) return null;

        return <MassImage key={index} mass={mass} />;
      })}
    </div>
  );
};

export default AnimationLayer;
