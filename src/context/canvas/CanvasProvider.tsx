// src/context/canvas/CanvasProvider.tsx
import React, { useState } from 'react';
import { CanvasContext } from './CanvasContext';

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  return <CanvasContext.Provider value={{ ctx, setCtx }}>{children}</CanvasContext.Provider>;
};
