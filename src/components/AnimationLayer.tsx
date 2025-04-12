// src/components/AnimationLayer.tsx
import React, { useEffect } from 'react';
import Canvas from './Canvas';
import { getSimulations } from '../logic/simulation/Simulations';

const AnimationLayer: React.FC = () => {
  useEffect(() => {
    const layer = document.getElementById('animation-layer');
    if (!layer) return;

    // Aggiunge tutte le immagini delle masse
    getSimulations().forEach((sim) => {
      const mass = sim.getMass();
      if (mass) {
        const img = mass.getImageElement();
        if (!layer.contains(img)) {
          layer.appendChild(img);
        }
      }
    });
  });

  return (
    <div className="w-full h-full relative" id="animation-layer">
      {/* Canvas in background */}
      <Canvas />
    </div>
  );
};

export default AnimationLayer;
