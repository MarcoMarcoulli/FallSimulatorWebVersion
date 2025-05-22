import React, { useState } from 'react';
import { Point } from '../../types/Point';
import { InputContext } from './InputContext';

interface InputProviderProps {
  children: React.ReactNode;
}

export const InputProvider: React.FC<InputProviderProps> = ({ children }) => {
  const [startPoint, setStartPointState] = useState<Point | null>(null);
  const [endPoint, setEndPointState] = useState<Point | null>(null);
  const [intermediatePoints, setIntermediatePoints] = useState<Point[][]>([]);
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
    setIntermediatePoints((prev) => {
      if (prev.length === 0) {
        return [[pt]];
      } else {
        const last = prev[prev.length - 1];
        const updatedLast = [...last, pt].sort((a, b) => a.x - b.x);
        return [...prev.slice(0, -1), updatedLast];
      }
    });
  };

  const newIntermediatePointList = () => {
    setIntermediatePoints((prevLists) => [...prevLists, []]);
  };

  const clearIntermediatePoints = () => setIntermediatePoints([]);

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
        newIntermediatePointList,
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
