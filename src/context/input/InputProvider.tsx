import React, { useState } from 'react';
import { Point } from '../../types/Point';
import { InputContext } from './InputContext';

interface InputProviderProps {
  children: React.ReactNode;
}

export const InputProvider: React.FC<InputProviderProps> = ({ children }) => {
  const [startPoint, setStartPointState] = useState<Point | null>(null);
  const [endPoint, setEndPointState] = useState<Point | null>(null);
  const [intermediatePoints, setIntermediatePointsState] = useState<Point[]>([]);
  const [g, setG] = useState<number>(0);

  const [radius, setRadius] = useState<number | null>(null);
  const [initialRadius, setInitialRadius] = useState<number | null>(null);
  const [convexity, setConvexity] = useState<1 | -1 | null>(null);

  const setStartPoint = (pt: Point) => {
    setStartPointState(pt);
    console.debug('startPoint impostato:', pt);
  };

  const setEndPoint = (pt: Point) => {
    setEndPointState(pt);
  };

  const addIntermediatePoint = (pt: Point) => {
    setIntermediatePointsState([...intermediatePoints, pt]);
  };

  const clearIntermediatePoints = () => setIntermediatePointsState([]);

  const clearInput = () => {
    setStartPointState(null);
    setEndPointState(null);
    clearIntermediatePoints();
    setRadius(null);
    setInitialRadius(null);
    setConvexity(null);
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
        radius,
        setRadius,
        initialRadius,
        setInitialRadius,
        convexity,
        setConvexity,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
