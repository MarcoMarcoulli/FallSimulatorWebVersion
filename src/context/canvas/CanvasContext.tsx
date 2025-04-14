// src/context/canvas/CanvasContext.ts
import { createContext } from 'react';

export interface CanvasContextType {
  ctx: CanvasRenderingContext2D | null;
  setCtx: (ctx: CanvasRenderingContext2D | null) => void;
}

export const CanvasContext = createContext<CanvasContextType>({
  ctx: null,
  setCtx: () => {},
});
