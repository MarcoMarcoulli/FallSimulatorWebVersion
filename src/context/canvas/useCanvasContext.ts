// src/context/canvas/useCanvasContext.ts
import { useContext } from 'react';
import { CanvasContext } from './CanvasContext';

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvasContext deve essere usato all’interno di un CanvasProvider');
  }
  return context;
};
