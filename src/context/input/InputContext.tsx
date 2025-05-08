import { createContext } from 'react';
import { Point } from '../../types/Point';
import { Dispatch, SetStateAction } from 'react';

export interface InputContextType {
  startPoint: Point | null;
  setStartPoint: (pt: Point) => void;

  endPoint: Point | null;
  setEndPoint: (pt: Point) => void;

  intermediatePoints: Point[][];
  addIntermediatePoint: (pt: Point) => void;
  newIntermediatePointList: () => void;
  clearIntermediatePoints: () => void;

  g: number;
  setG: (value: number) => void;

  radius: number | null;
  setRadius: Dispatch<SetStateAction<number | null>>;

  initialRadius: number | null;
  setInitialRadius: Dispatch<SetStateAction<number | null>>;

  convexity: 1 | -1 | null;
  setConvexity: Dispatch<SetStateAction<1 | -1 | null>>;

  clearInput: () => void;
}

export const InputContext = createContext<InputContextType | undefined>(undefined);
