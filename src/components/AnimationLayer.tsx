// src/components/AnimationLayer.tsx
import React, { useState } from 'react';
import Canvas from './Canvas';
import Modal from './ErrorModal';
import { useCanvasContext } from '../context/canvas/useCanvasContext';

const AnimationLayer: React.FC = () => {
  const { animationRef } = useCanvasContext();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const showModalFromCanvas = (msg: string) => setModalMessage(msg);

  return (
    <div className="w-full h-full relative" id="animation-layer">
      <Canvas showModal={showModalFromCanvas} />

      {/* layer per le masse */}
      <div ref={animationRef} className="absolute inset-0 pointer-events-none z-20" />

      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}
    </div>
  );
};

export default AnimationLayer;
