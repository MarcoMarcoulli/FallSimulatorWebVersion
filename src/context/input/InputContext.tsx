import { createContext } from 'react';
import { Point } from '../../types/Point';
import { Dispatch, SetStateAction } from 'react';

export interface InputContextType {
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

  radius: number | null;
  setRadius: Dispatch<SetStateAction<number | null>>;

  initialRadius: number | null;
  setInitialRadius: Dispatch<SetStateAction<number | null>>;

  convexity: 1 | -1 | null;
  setConvexity: Dispatch<SetStateAction<1 | -1 | null>>;
}

export const InputContext = createContext<InputContextType | undefined>(undefined);
