// src/components/AnimationLayer.tsx
import React, { useState } from 'react';
import Canvas from './Canvas';
import Modal from './ErrorModal';
import { useSimulationContext } from '../context/simulation/useSimulationContext';
import MassImage from './MassImage';

const AnimationLayer: React.FC = () => {
  const { simulations } = useSimulationContext();

  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const showModal = (msg: string) => {
    setModalMessage(msg);
  };

  return (
    <div className="w-full h-full relative" id="animation-layer">
      {/* Passa showModal a Canvas */}
      <Canvas showModal={showModal} />

      {simulations.map((sim, index) => {
        const mass = sim.getMass();
        if (!mass) return null;
        return <MassImage key={index} mass={mass} />;
      })}

      {/* Mostra il modale se necessario */}
      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}
    </div>
  );
};

export default AnimationLayer;
