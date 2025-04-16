// src/utils/inputValidators.ts
import { Point } from '../../types/Point';

export type ShowModalFn = (message: string) => void;

export const validateEndPoint = (
  start: Point,
  end: Point,
  showModal: ShowModalFn
): Point | null => {
  if (end.y <= start.y) {
    showModal('Il punto di arrivo deve essere più in basso di quello di partenza');
    return null;
  }

  if (end.x === start.x) {
    return { x: end.x + 1, y: end.y };
  }

  return end;
};

export const validateIntermediatePoint = (
  start: Point,
  end: Point,
  pt: Point,
  existing: Point[],
  showModal: ShowModalFn
): Point | null => {
  const newPt = { ...pt };

  for (const p of existing) {
    if (p.x === newPt.x) {
      newPt.x += 1;
    }
  }

  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);

  if (newPt.x <= minX || newPt.x >= maxX) {
    showModal(
      'I punti intermedi devono essere compresi tra il punto di partenza e quello di arrivo'
    );
    return null;
  }

  return newPt;
};
