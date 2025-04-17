// src/logic/curves/CubicSpline.ts

import { Curve } from './Curve';
import { Point } from '../../types/Point';
import createSpline from 'natural-spline-interpolator';

export class CubicSpline extends Curve {
  private splineFunction: ((x: number) => number) | null = null;
  private readonly interpolationPoints: Point[];

  constructor(startPoint: Point, endPoint: Point, intermediatePoints: Point[]) {
    super(startPoint, endPoint);

    // Ordina i punti per x
    this.interpolationPoints = [startPoint, ...intermediatePoints, endPoint].sort(
      (a, b) => a.x - b.x
    );

    const pairs = this.interpolationPoints.map((p) => [p.x, p.y]) as [number, number][];

    if (pairs.length >= 3) {
      try {
        this.splineFunction = createSpline(pairs);
      } catch (err) {
        console.error('Errore nella creazione della spline:', err);
      }
    }
  }

  /** Valuta la y corrispondente a *x* sulla curva */
  public evaluateY(x: number): number {
    if (!this.splineFunction) {
      // fallback lineare se la spline non è disponibile
      const m = this.intervalY / this.intervalX;
      return m * (x - this.startPoint.x) + this.startPoint.y;
    }
    return this.splineFunction(x);
  }

  /** Genera i punti disegnabili sul canvas */
  public calculatePoints(): Point[] {
    const pts: Point[] = new Array(Curve.NUMPOINTS);
    for (let i = 0; i < Curve.NUMPOINTS - 1; i++) {
      const t = i / (Curve.NUMPOINTS - 1);
      const x = this.startPoint.x + this.intervalX * t ** 3;
      const y = this.evaluateY(x);
      pts[i] = { x, y };
    }
    pts[Curve.NUMPOINTS - 1] = this.endPoint;
    return pts;
  }

  /** Calcola le pendenze della curva (serve alla simulazione) */
  public calculateSlopes(): number[] {
    const slopes = new Array<number>(Curve.NUMPOINTS);

    if (!this.splineFunction) {
      const m = this.intervalY / this.intervalX;
      const angle = Math.atan(m);
      slopes.fill(angle);
      return slopes;
    }

    const h = 1e-4;
    for (let i = 0; i < Curve.NUMPOINTS - 1; i++) {
      const t = i / (Curve.NUMPOINTS - 1);
      const x = this.startPoint.x + this.intervalX * t ** 3;
      const y1 = this.evaluateY(x - h);
      const y2 = this.evaluateY(x + h);
      slopes[i] = Math.atan((y2 - y1) / (2 * h));
    }
    slopes[Curve.NUMPOINTS - 1] = slopes[Curve.NUMPOINTS - 2];
    return slopes;
  }

  public curveName(): string {
    return 'spline';
  }
}
