// src/types/natural-spline-interpolator.d.ts
declare module 'natural-spline-interpolator' {
  /**
   * Crea la funzione spline naturale.
   *
   * @param points Array di coppie [x, y] (non serve che siano già ordinate).
   * @returns Funzione f(x) → y che interpola i punti con spline naturale
   */
  export default function interpolator(points: [number, number][]): (x: number) => number;
}
