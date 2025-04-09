// src/utils/inputValidators.ts
import { Point } from '../types/Point';

/**
 * Verifica il punto di arrivo rispetto al punto di partenza.
 * Se il punto di arrivo ha una y minore o uguale a quella del punto di partenza,
 * viene lanciato un errore.
 * Se le x coincidono, il punto di arrivo viene aggiustato spostandolo di una unità a destra.
 * @param start Il punto di partenza.
 * @param end Il punto di arrivo da validare.
 * @returns Il punto di arrivo validato (eventualmente modificato).
 * @throws Error se il punto di arrivo non è valido.
 */
export const validateEndPoint = (start: Point, end: Point): Point => {
  if (end.y <= start.y) {
    throw new Error('Il punto di arrivo deve essere più in basso di quello di partenza');
  }
  if (end.x === start.x) {
    // Sposta il punto di arrivo di 1 unità a destra
    return { x: end.x + 1, y: end.y };
  }
  return end;
};

/**
 * Valida e corregge (se necessario) un punto intermedio.
 * Se esiste già un punto intermedio con la stessa coordinata x, il nuovo punto viene spostato di 1 unità.
 * Viene verificato che il punto intermedio sia compreso tra start e end in senso orizzontale.
 * @param start Il punto di partenza.
 * @param end Il punto di arrivo.
 * @param pt Il punto intermedio da validare.
 * @param existing Gli eventuali punti intermedi già inseriti.
 * @returns Il punto intermedio validato (eventualmente modificato).
 * @throws Error se il punto intermedio non è compreso tra il punto di partenza e quello di arrivo.
 */
export const validateIntermediatePoint = (
  start: Point,
  end: Point,
  pt: Point,
  existing: Point[]
): Point => {
  const newPt = { ...pt };

  // Controlla se esiste già un punto con la stessa x e, in tal caso, lo sposta di 1 unità.
  for (const p of existing) {
    if (p.x === newPt.x) {
      newPt.x += 1;
    }
  }

  // Verifica che il punto intermedio sia compreso tra start ed end in senso orizzontale.
  if (
    (start.x < end.x && (newPt.x <= start.x || newPt.x >= end.x)) ||
    (start.x > end.x && (newPt.x >= start.x || newPt.x <= end.x))
  ) {
    throw new Error(
      'I punti intermedi devono essere compresi tra il punto di partenza e quello di arrivo'
    );
  }
  return newPt;
};
