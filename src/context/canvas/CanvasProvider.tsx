// src/context/canvas/CanvasProvider.tsx
import React, { useRef } from 'react';
import { CanvasContext } from './CanvasContext';

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  return (
    <CanvasContext.Provider value={{ ctxRef, animationRef }}>{children}</CanvasContext.Provider>
  );
};
