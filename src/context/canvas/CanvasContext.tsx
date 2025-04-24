// src/context/canvas/CanvasContext.ts
import { createContext, RefObject } from 'react';

export interface CanvasRefs {
  ctxRef: RefObject<CanvasRenderingContext2D | null>;
  animationRef: RefObject<HTMLDivElement | null> | null;
}

export const CanvasContext = createContext<CanvasRefs | null>(null);
