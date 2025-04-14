import React, { useState } from 'react';
import { Point } from '../../types/Point';
import { validateEndPoint, validateIntermediatePoint } from '../../logic/utils/InputValidator';
import { InputContext } from './InputContext';

export const InputProvider = ({ children }: { children: React.ReactNode }) => {
  const [startPoint, setStartPointState] = useState<Point | null>(null);
  const [endPoint, setEndPointState] = useState<Point | null>(null);
  const [intermediatePoints, setIntermediatePointsState] = useState<Point[]>([]);
  const [g, setG] = useState<number>(0);
  const [radius, setRadius] = useState<number | null>(null);
  const [convexity, setConvexity] = useState<1 | -1 | null>(null);

  const setStartPoint = (pt: Point) => {
    setStartPointState(pt);
    console.debug('startPoint impostato:', pt);
  };

  const setEndPoint = (pt: Point) => {
    if (!startPoint) return;

    const validated = validateEndPoint(startPoint, pt);
    if (!validated) return;

    setEndPointState(validated);
  };

  const addIntermediatePoint = (pt: Point) => {
    if (!startPoint || !endPoint) return;

    const validated = validateIntermediatePoint(startPoint, endPoint, pt, intermediatePoints);
    if (!validated) return;

    setIntermediatePointsState([...intermediatePoints, validated]);
  };

  const clearIntermediatePoints = () => setIntermediatePointsState([]);

  const clearInput = () => {
    setStartPointState(null);
    setEndPointState(null);
    clearIntermediatePoints();
    setRadius(null);
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
        convexity,
        setConvexity,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
