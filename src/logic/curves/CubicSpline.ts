// src/logic/curves/CubicSpline.ts
import { Curve } from './Curve';
import { Point } from '../../types/Point';
import Spline from 'natural-spline-interpolator';

export class CubicSpline extends Curve {
  private splineFunction: ((x: number) => number) | null = null;
  private interpolationPoints: Point[];

  constructor(startPoint: Point, endPoint: Point, intermediatePoints: Point[]) {
    super(startPoint, endPoint);

    const n = intermediatePoints.length + 2;
    this.interpolationPoints = new Array<Point>(n);
    this.interpolationPoints[0] = startPoint;

    for (let i = 1; i < n - 1; i++) {
      this.interpolationPoints[i] = intermediatePoints[i - 1];
    }

    this.interpolationPoints[n - 1] = endPoint;

    // Ordina per x crescente
    this.interpolationPoints.sort((a, b) => a.x - b.x);

    const x = this.interpolationPoints.map((p) => p.x);
    const y = this.interpolationPoints.map((p) => p.y);

    if (this.interpolationPoints.length > 2) {
      const spline = new Spline(x, y);
      this.splineFunction = (xval: number) => spline.at(xval);
    } else {
      this.splineFunction = null;
    }
  }

  public evaluateY(x: number): number {
    if (!this.splineFunction) {
      const m = this.intervalY / this.intervalX;
      return m * (x - this.startPoint.x) + this.startPoint.y;
    } else {
      return this.splineFunction(x);
    }
  }

  public calculatePoints(): Point[] {
    const points: Point[] = new Array(Curve.NUMPOINTS);
    let t: number, xCubic: number, x: number, y: number;

    for (let i = 0; i < Curve.NUMPOINTS - 1; i++) {
      t = i / (Curve.NUMPOINTS - 1);
      xCubic = this.intervalX * Math.pow(t, 3);
      x = this.startPoint.x + xCubic;
      y = this.evaluateY(x);
      points[i] = { x, y };
    }

    points[Curve.NUMPOINTS - 1] = this.endPoint;
    return points;
  }

  public calculateSlopes(): number[] {
    const slopes: number[] = new Array(Curve.NUMPOINTS);

    if (!this.splineFunction) {
      const m = this.intervalY / this.intervalX;
      const angle = Math.atan(m);
      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        slopes[i] = angle;
      }
      return slopes;
    }

    // Derivata numerica approssimata
    const h = 0.0001;
    for (let i = 0; i < Curve.NUMPOINTS - 1; i++) {
      const t = i / (Curve.NUMPOINTS - 1);
      const xCubic = this.intervalX * Math.pow(t, 3);
      const x = this.startPoint.x + xCubic;

      const y1 = this.evaluateY(x - h);
      const y2 = this.evaluateY(x + h);
      const derivative = (y2 - y1) / (2 * h);

      slopes[i] = Math.atan(derivative);
    }

    // Ultima pendenza uguale alla penultima
    slopes[Curve.NUMPOINTS - 1] = slopes[Curve.NUMPOINTS - 2];
    return slopes;
  }

  public curveName(): string {
    return 'spline';
  }
}
