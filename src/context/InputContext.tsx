// src/context/InputContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Point } from '../types/Point';
import { validateEndPoint, validateIntermediatePoint } from '../logic/utils/InputValidator';

interface InputContextType {
  startPoint: Point | null;
  endPoint: Point | null;
  intermediatePoints: Point[];
  g: number;
  setStartPoint: (pt: Point) => void;
  setEndPoint: (pt: Point) => void;
  addIntermediatePoint: (pt: Point) => void;
  clearIntermediatePoints: () => void;
  clearInput: () => void;
  setG: (value: number) => void;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [startPoint, setStartPointState] = useState<Point | null>(null);
  const [endPoint, setEndPointState] = useState<Point | null>(null);
  const [intermediatePoints, setIntermediatePointsState] = useState<Point[]>([]);
  const [g, setG] = useState<number>(0);

  // Imposta il punto di partenza.
  const setStartPoint = (pt: Point) => {
    setStartPointState(pt);
    console.debug('startPoint impostato:', pt);
  };

  // Imposta il punto di arrivo utilizzando la funzione di validazione.
  const setEndPoint = (pt: Point) => {
    if (!startPoint) {
      throw new Error('Devi prima impostare il punto di partenza.');
    }
    const validatedEnd = validateEndPoint(startPoint, pt);
    setEndPointState(validatedEnd);
    console.debug('endPoint impostato:', validatedEnd);
  };

  // Aggiunge un punto intermedio dopo averlo validato.
  const addIntermediatePoint = (pt: Point) => {
    if (!startPoint || !endPoint) {
      throw new Error('Imposta prima il punto di partenza e quello di arrivo.');
    }
    const validatedPt = validateIntermediatePoint(startPoint, endPoint, pt, intermediatePoints);
    setIntermediatePointsState([...intermediatePoints, validatedPt]);
    console.debug('Punto intermedio aggiunto:', validatedPt);
  };

  const clearIntermediatePoints = () => {
    setIntermediatePointsState([]);
  };

  const clearInput = () => {
    setStartPointState(null);
    setEndPointState(null);
    clearIntermediatePoints();
  };

  return (
    <InputContext.Provider
      value={{
        startPoint,
        endPoint,
        intermediatePoints,
        g,
        setStartPoint,
        setEndPoint,
        addIntermediatePoint,
        clearIntermediatePoints,
        clearInput,
        setG,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export const useInput = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInput deve essere usato all'interno di un InputProvider.");
  }
  return context;
};
