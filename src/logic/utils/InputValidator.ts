// src/utils/inputValidators.ts
import { Point } from '../../types/Point';

export const validateEndPoint = (start: Point, end: Point): Point | null => {
  if (end.y <= start.y) {
    alert('Il punto di arrivo deve essere più in basso di quello di partenza');
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
  existing: Point[]
): Point | null => {
  const newPt = { ...pt };

  for (const p of existing) {
    if (p.x === newPt.x) {
      newPt.x += 1;
    }
  }

  const isValid =
    (start.x < end.x && newPt.x > start.x && newPt.x < end.x) ||
    (start.x > end.x && newPt.x < start.x && newPt.x > end.x);

  if (!isValid) {
    alert('I punti intermedi devono essere compresi tra il punto di partenza e quello di arrivo');
    return null;
  }

  return newPt;
};
